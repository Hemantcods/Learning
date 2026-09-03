import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load .env file into process.env
dotenv.config();

/**
 * Parses GitHub owner and repo from various formats:
 * - https://github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - git@github.com:owner/repo.git
 * - owner/repo
 */
export function parseGitHubRepo(repoInput: string): { owner: string; repo: string } {
  const cleaned = repoInput.trim().replace(/\.git$/, '');
  const match =
    cleaned.match(/github\.com[/:]([^/]+)\/([^/]+)/) ||
    cleaned.match(/^([^/]+)\/([^/]+)$/);

  if (!match) {
    throw new Error(
      `Invalid GITHUB_REPO_URL: "${repoInput}". Expected format: "https://github.com/owner/repo" or "owner/repo".`
    );
  }

  return { owner: match[1], repo: match[2] };
}

/**
 * Zod schema for environment variables validation.
 */
export const envSchema = z.object({
  GEMINI_API_KEY: z
    .string()
    .min(1, 'GEMINI_API_KEY is required. Obtain one at https://aistudio.google.com/app/apikey'),
  GEMINI_MODEL: z.string().default('gemini-2.5-pro'),
  GITHUB_TOKEN: z
    .string()
    .min(1, 'GITHUB_TOKEN is required. Create a PAT with repo permissions at https://github.com/settings/tokens'),
  GITHUB_REPO_URL: z
    .string()
    .min(1, 'GITHUB_REPO_URL is required (e.g., https://github.com/owner/repo)'),
  TARGET_BRANCH: z.string().default('main'),
  WORKSPACE_DIR: z.string().default('./workspace'),
  TEST_COMMAND: z.string().optional().default(''),
  CRON_SCHEDULE: z.string().default('0 2 * * *'), // 2:00 AM daily
});

export type EnvConfig = z.infer<typeof envSchema> & {
  githubOwner: string;
  githubRepo: string;
  absoluteWorkspaceDir: string;
  repoCloneDir: string;
};

/**
 * Validates and retrieves the application environment configuration.
 */
export function getEnvConfig(): EnvConfig {
  const parseResult = envSchema.safeParse(process.env);

  if (!parseResult.success) {
    console.error('\n❌ Environment Configuration Errors:');
    for (const issue of parseResult.error.issues) {
      console.error(`  - [${issue.path.join('.') || 'root'}]: ${issue.message}`);
    }
    console.error('\nPlease verify your .env file against .env.example.\n');
    throw new Error('Environment configuration validation failed.');
  }

  const data = parseResult.data;
  const { owner, repo } = parseGitHubRepo(data.GITHUB_REPO_URL);
  const absoluteWorkspaceDir = path.resolve(process.cwd(), data.WORKSPACE_DIR);
  const repoCloneDir = path.join(absoluteWorkspaceDir, repo);

  return {
    ...data,
    githubOwner: owner,
    githubRepo: repo,
    absoluteWorkspaceDir,
    repoCloneDir,
  };
}
