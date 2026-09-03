import { FunctionTool } from '@google/adk';
import { exec, execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { z } from 'zod';
import { getEnvConfig } from '../config.js';

const execAsync = promisify(exec);
const execFileAsync = promisify(execFile);

// Current active branch created for the coverage task
let activeBranchName = '';

/**
 * Helper to run git commands inside the cloned repository.
 */
async function runGit(args: string[], cwd: string): Promise<{ stdout: string; stderr: string }> {
  return await execFileAsync('git', args, { cwd });
}

/**
 * Tool 1: Clone or synchronize the GitHub repository and create a new feature branch.
 */
export const cloneOrSyncRepoTool = new FunctionTool({
  name: 'clone_or_sync_repo',
  description:
    'Clones the target GitHub repository into the local workspace (or pulls latest changes if already cloned) ' +
    'and creates a dedicated git branch for new test coverage.',
  parameters: z.object({
    customBranchName: z
      .string()
      .optional()
      .describe('Optional custom branch name. Defaults to "coverage/increase-<timestamp>".'),
  }),
  execute: async ({ customBranchName }) => {
    const config = getEnvConfig();
    const { githubOwner, githubRepo, GITHUB_TOKEN, TARGET_BRANCH, absoluteWorkspaceDir, repoCloneDir } = config;

    // Ensure workspace directory exists
    if (!fs.existsSync(absoluteWorkspaceDir)) {
      fs.mkdirSync(absoluteWorkspaceDir, { recursive: true });
    }

    const authUrl = `https://${GITHUB_TOKEN}@github.com/${githubOwner}/${githubRepo}.git`;
    activeBranchName = customBranchName || `coverage/increase-${Date.now()}`;

    try {
      if (!fs.existsSync(repoCloneDir)) {
        console.log(`📥 Cloning repository ${githubOwner}/${githubRepo} into ${repoCloneDir}...`);
        await runGit(['clone', '--branch', TARGET_BRANCH, authUrl, repoCloneDir], absoluteWorkspaceDir);
      } else {
        console.log(`🔄 Updating existing local clone at ${repoCloneDir}...`);
        await runGit(['fetch', 'origin'], repoCloneDir);
        await runGit(['checkout', TARGET_BRANCH], repoCloneDir);
        await runGit(['pull', 'origin', TARGET_BRANCH], repoCloneDir);
      }

      // Create and checkout new branch
      console.log(`🌿 Checking out new branch: ${activeBranchName}...`);
      await runGit(['checkout', '-b', activeBranchName], repoCloneDir);

      return {
        status: 'success',
        message: `Repository ready at ${repoCloneDir} on branch ${activeBranchName}`,
        repoDir: repoCloneDir,
        branch: activeBranchName,
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: `Failed to clone/sync repo: ${error.message || error}`,
        stderr: error.stderr,
      };
    }
  },
});

/**
 * Tool 2: List files in the repository.
 */
export const listFilesTool = new FunctionTool({
  name: 'list_files',
  description: 'Lists files and directories inside the cloned repository to explore codebase structure.',
  parameters: z.object({
    subDirectory: z
      .string()
      .optional()
      .default('')
      .describe('Relative sub-directory inside repository (e.g. "src", "test"). Defaults to repo root.'),
    maxFiles: z
      .number()
      .optional()
      .default(100)
      .describe('Maximum number of files to return (defaults to 100).'),
  }),
  execute: async ({ subDirectory, maxFiles }) => {
    const { repoCloneDir } = getEnvConfig();
    const targetDir = path.resolve(repoCloneDir, subDirectory || '');

    if (!fs.existsSync(targetDir)) {
      return { status: 'error', message: `Directory does not exist: ${subDirectory}` };
    }

    const ignoreList = new Set(['.git', 'node_modules', 'dist', 'coverage', '.next', 'build', '.cache']);
    const results: string[] = [];

    function walk(dir: string, depth = 0) {
      if (depth > 6 || results.length >= maxFiles) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (ignoreList.has(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        const relPath = path.relative(repoCloneDir, fullPath).replace(/\\/g, '/');
        if (entry.isDirectory()) {
          results.push(`${relPath}/`);
          walk(fullPath, depth + 1);
        } else {
          results.push(relPath);
        }
        if (results.length >= maxFiles) break;
      }
    }

    walk(targetDir);
    return {
      status: 'success',
      count: results.length,
      files: results,
    };
  },
});

/**
 * Tool 3: Read a file from the repository.
 */
export const readFileTool = new FunctionTool({
  name: 'read_file',
  description: 'Reads the content of a file in the repository.',
  parameters: z.object({
    filePath: z.string().describe('Path to the file relative to repository root (e.g., "src/index.ts").'),
    startLine: z.number().optional().describe('1-indexed starting line to read (optional).'),
    endLine: z.number().optional().describe('1-indexed ending line to read (optional).'),
  }),
  execute: async ({ filePath, startLine, endLine }) => {
    const { repoCloneDir } = getEnvConfig();
    const fullPath = path.resolve(repoCloneDir, filePath);

    if (!fs.existsSync(fullPath)) {
      return { status: 'error', message: `File not found: ${filePath}` };
    }

    const raw = fs.readFileSync(fullPath, 'utf-8');
    const lines = raw.split(/\r?\n/);
    const start = Math.max(1, startLine || 1);
    const end = Math.min(lines.length, endLine || lines.length);
    const slice = lines.slice(start - 1, end).join('\n');

    return {
      status: 'success',
      filePath,
      totalLines: lines.length,
      startLine: start,
      endLine: end,
      content: slice,
    };
  },
});

/**
 * Tool 4: Write or edit a file in the repository.
 */
export const writeFileTool = new FunctionTool({
  name: 'write_file',
  description: 'Creates or modifies a file (such as a new test file) in the repository.',
  parameters: z.object({
    filePath: z.string().describe('Path to the file relative to repository root (e.g., "tests/utils.test.ts").'),
    content: z.string().describe('Full content to write into the file.'),
  }),
  execute: async ({ filePath, content }) => {
    const { repoCloneDir } = getEnvConfig();
    const fullPath = path.resolve(repoCloneDir, filePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`📝 Wrote file: ${filePath} (${content.length} characters)`);

    return {
      status: 'success',
      message: `Successfully wrote ${filePath}`,
      filePath,
    };
  },
});

/**
 * Tool 5: Run tests and coverage inside the repository.
 */
export const runTestCommandTool = new FunctionTool({
  name: 'run_test_command',
  description:
    'Runs the test suite or coverage command inside the cloned repository and returns output and coverage results.',
  parameters: z.object({
    customCommand: z
      .string()
      .optional()
      .describe('Optional custom command to run. If omitted, uses TEST_COMMAND from env or auto-detects from package.json.'),
  }),
  execute: async ({ customCommand }) => {
    const config = getEnvConfig();
    const { repoCloneDir, TEST_COMMAND } = config;

    let commandToRun = customCommand || TEST_COMMAND;

    // If no command specified, check package.json for test script
    if (!commandToRun) {
      const pkgPath = path.join(repoCloneDir, 'package.json');
      if (fs.existsSync(pkgPath)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
          if (pkg.scripts && pkg.scripts.test) {
            commandToRun = 'npm test';
          }
        } catch {
          // ignore
        }
      }
    }

    if (!commandToRun) {
      commandToRun = 'npm test';
    }

    console.log(`⚡ Executing test command: "${commandToRun}" in ${repoCloneDir}...`);

    try {
      const { stdout, stderr } = await execAsync(commandToRun, {
        cwd: repoCloneDir,
        timeout: 180000, // 3 minute timeout
        maxBuffer: 5 * 1024 * 1024,
      });

      return {
        status: 'success',
        exitCode: 0,
        command: commandToRun,
        stdout: stdout.slice(-4000), // return recent output
        stderr: stderr.slice(-2000),
      };
    } catch (error: any) {
      return {
        status: 'failed',
        exitCode: error.code || 1,
        command: commandToRun,
        stdout: (error.stdout || '').slice(-4000),
        stderr: (error.stderr || error.message || '').slice(-2000),
      };
    }
  },
});

/**
 * Tool 6: Commit changes, push to GitHub, and create a Pull Request.
 */
export const createPullRequestTool = new FunctionTool({
  name: 'create_pull_request',
  description:
    'Stages all modified/new test files, commits them, pushes the branch to GitHub, and opens a Pull Request.',
  parameters: z.object({
    title: z.string().describe('Title of the Pull Request (e.g., "test: increase unit test coverage for user service").'),
    summary: z
      .string()
      .describe('Markdown summary describing what tests were added and what coverage improvements were achieved.'),
    branchName: z
      .string()
      .optional()
      .describe('Branch name to push (defaults to the currently active coverage branch).'),
  }),
  execute: async ({ title, summary, branchName }) => {
    const config = getEnvConfig();
    const { githubOwner, githubRepo, GITHUB_TOKEN, TARGET_BRANCH, repoCloneDir } = config;
    const branchToPush = branchName || activeBranchName;

    if (!branchToPush) {
      return { status: 'error', message: 'No active branch found. Did you run clone_or_sync_repo first?' };
    }

    try {
      console.log(`📤 Staging and committing changes on branch ${branchToPush}...`);
      await runGit(['add', '.'], repoCloneDir);

      // Check git status to make sure there are changes to commit
      const statusRes = await runGit(['status', '--porcelain'], repoCloneDir);
      if (!statusRes.stdout.trim()) {
        return {
          status: 'skipped',
          message: 'No file changes detected in working tree to commit.',
        };
      }

      await runGit(['commit', '-m', title], repoCloneDir);

      const authPushUrl = `https://${GITHUB_TOKEN}@github.com/${githubOwner}/${githubRepo}.git`;
      console.log(`🚀 Pushing branch ${branchToPush} to GitHub...`);
      await runGit(['push', '-u', authPushUrl, branchToPush], repoCloneDir);

      // Create GitHub Pull Request via GitHub REST API
      console.log(`📨 Opening Pull Request targeting ${TARGET_BRANCH}...`);
      const prPayload = {
        title,
        head: branchToPush,
        base: TARGET_BRANCH,
        body: `${summary}\n\n---\n*Automated PR generated by Google ADK Coverage Agent.*`,
      };

      const response = await fetch(`https://api.github.com/repos/${githubOwner}/${githubRepo}/pulls`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Google-ADK-Coverage-Agent',
        },
        body: JSON.stringify(prPayload),
      });

      const data = (await response.json()) as any;

      if (!response.ok) {
        return {
          status: 'error',
          message: `GitHub API error: ${data.message || response.statusText}`,
          errors: data.errors,
        };
      }

      console.log(`🎉 Pull Request created successfully: ${data.html_url}`);
      return {
        status: 'success',
        prNumber: data.number,
        prUrl: data.html_url,
        title: data.title,
        head: branchToPush,
        base: TARGET_BRANCH,
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: `Failed to create pull request: ${error.message || error}`,
        stderr: error.stderr,
      };
    }
  },
});

export const repoTools = [
  cloneOrSyncRepoTool,
  listFilesTool,
  readFileTool,
  writeFileTool,
  runTestCommandTool,
  createPullRequestTool,
];
