import { InMemorySessionService, Runner, isFinalResponse, stringifyContent } from '@google/adk';
import cron from 'node-cron';
import { createCoverageAgent } from './agent.js';
import { getEnvConfig } from './config.js';

/**
 * Runs a single autonomous coverage increase job.
 */
async function runCoverageJob(): Promise<void> {
  const config = getEnvConfig();

  console.log('\n' + '='.repeat(70));
  console.log(`🤖 Starting Autonomous Coverage Run for ${config.githubOwner}/${config.githubRepo}`);
  console.log(`⏰ Timestamp: ${new Date().toISOString()}`);
  console.log(`🧠 Model: ${config.GEMINI_MODEL}`);
  console.log(`📂 Target Branch: ${config.TARGET_BRANCH}`);
  console.log('='.repeat(70) + '\n');

  const appName = 'coverage_agent_app';
  const agent = createCoverageAgent(config.GEMINI_MODEL);
  const sessionService = new InMemorySessionService();

  const userId = 'system-cron';
  const sessionId = `coverage-session-${Date.now()}`;

  await sessionService.createSession({
    appName,
    userId,
    sessionId,
  });

  const runner = new Runner({
    appName,
    agent,
    sessionService,
  });

  const taskPrompt =
    `Please execute a code coverage improvement cycle for the repository ${config.githubOwner}/${config.githubRepo}.\n` +
    `1. Clone or sync the repository and check out a new branch.\n` +
    `2. Explore the codebase and run tests to establish baseline status.\n` +
    `3. Find uncovered or partially tested components, write comprehensive tests, and verify they pass.\n` +
    `4. Commit the changes and open a Pull Request targeting branch "${config.TARGET_BRANCH}".`;

  console.log('⏳ Running coverage agent pipeline...\n');

  try {
    const events = runner.runAsync({
      userId,
      sessionId,
      newMessage: {
        parts: [{ text: taskPrompt }],
      },
    });

    for await (const event of events) {
      if (isFinalResponse(event)) {
        const responseText = stringifyContent(event);
        console.log(`\n🏁 Agent Run Summary:\n${responseText}\n`);
      }
    }

    console.log('✨ Coverage run finished successfully.');
  } catch (error: any) {
    console.error('❌ Error occurred during coverage run:', error);
  }
}

async function main() {
  // Validate configuration on startup
  const config = getEnvConfig();
  console.log('✅ Configuration loaded and validated successfully.');
  console.log(`🔗 Target Repository: https://github.com/${config.githubOwner}/${config.githubRepo}`);

  const isScheduleMode = process.argv.includes('--schedule');

  if (isScheduleMode) {
    console.log(`\n🕒 Scheduled Daily Job Mode Activated!`);
    console.log(`📅 Cron Schedule: "${config.CRON_SCHEDULE}"`);
    console.log('Agent will trigger automatically according to schedule. Press Ctrl+C to stop.\n');

    // Validate cron expression
    if (!cron.validate(config.CRON_SCHEDULE)) {
      throw new Error(`Invalid CRON_SCHEDULE expression: "${config.CRON_SCHEDULE}"`);
    }

    cron.schedule(config.CRON_SCHEDULE, async () => {
      console.log(`\n🔔 Cron triggered at ${new Date().toISOString()}`);
      await runCoverageJob();
    });
  } else {
    // Immediate on-demand execution
    console.log('🚀 Running in immediate on-demand mode...');
    await runCoverageJob();
  }
}

main().catch((err) => {
  console.error('\n💥 Fatal startup error:', err.message);
  process.exit(1);
});
