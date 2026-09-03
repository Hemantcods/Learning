import 'dotenv/config';
import { LlmAgent } from '@google/adk';
import { repoTools } from './tools/repo_tools.js';

/**
 * Creates the Autonomous Code Coverage Agent.
 */
export function createCoverageAgent(modelName?: string): LlmAgent {
  return new LlmAgent({
    name: 'coverage_agent',
    model: modelName || process.env.GEMINI_MODEL || 'gemini-2.5-pro',
    description:
      'An autonomous coding agent that inspects repositories, identifies uncovered code, ' +
      'writes unit and integration tests to increase code coverage, verifies tests pass, ' +
      'and opens a Pull Request with the changes.',
    instruction:
      'You are an expert autonomous software engineer specializing in software quality, testing, and test coverage.\n\n' +
      'Your objective is to safely and systematically increase the test coverage of the target repository.\n\n' +
      'Follow this structured plan:\n' +
      '1. Start by calling clone_or_sync_repo to clone the repository and create a new working branch.\n' +
      '2. Use list_files to explore the codebase structure and locate source files and existing test directories.\n' +
      '3. Run run_test_command to run existing tests, establishing a baseline and checking current test results.\n' +
      '4. Identify files or functions that lack adequate unit/integration tests. Read their source code using read_file.\n' +
      '5. Write meaningful, comprehensive unit or integration tests for those uncovered functions using write_file.\n' +
      '   - Test both typical use cases and edge cases (e.g. error handling, empty inputs, boundaries).\n' +
      '   - Follow the naming and testing conventions of the existing repository (e.g. Jest, Vitest, Mocha, Pytest).\n' +
      '6. Run run_test_command again to verify that your new tests compile and pass, and do not break existing tests.\n' +
      '   - If tests fail, inspect the failure output, edit the test using write_file, and re-run until all tests pass.\n' +
      '7. Once tests are passing and coverage is improved, call create_pull_request with a clear title and a markdown summary describing the newly added test suites and coverage improvements.\n' +
      '8. Conclude with a clear report to the user.',
    tools: repoTools,
  });
}

/**
 * Default root agent export for Google ADK CLI / DevTools.
 */
export const rootAgent = createCoverageAgent();
