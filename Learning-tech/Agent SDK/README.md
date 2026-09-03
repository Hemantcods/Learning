# Google ADK Code Coverage Agent & Daily Job

An autonomous AI software engineer built on **Google Agent Development Kit (ADK)** in TypeScript designed to automatically increase test coverage across your GitHub codebase on a daily schedule.

---

## 🌟 How It Works

1. **Clone / Sync**: Clones your GitHub repository into a local sandboxed `./workspace/` using your GitHub PAT and creates a new branch (e.g. `coverage/increase-<timestamp>`).
2. **Explore & Benchmark**: Discovers project files and runs the existing test suite to establish baseline results.
3. **Analyze & Author Tests**: Identifies uncovered components, functions, or edge cases and authors comprehensive tests following the repository's existing testing frameworks (Jest, Vitest, Pytest, Mocha, etc.).
4. **Verify**: Runs the test suite to ensure all new tests compile, execute cleanly, pass, and do not cause regressions.
5. **Open Pull Request**: Commits the new tests, pushes the branch to GitHub, and opens a GitHub Pull Request with a clear markdown summary of coverage improvements.

---

## 📁 Project Structure

```text
├── .env.example          # Environment configuration template
├── package.json          # Dependencies, TypeScript configuration, and scripts
├── tsconfig.json         # Strict NodeNext TypeScript settings
├── src/
│   ├── config.ts         # Zod validation for GitHub & Gemini env variables
│   ├── agent.ts          # Google ADK LlmAgent definition (rootAgent)
│   ├── index.ts          # Workflow runner supporting on-demand & cron mode
│   └── tools/
│       └── repo_tools.ts # Git clone, file reading/writing, test running, & PR creation
└── workspace/            # Sandboxed local directory for cloned repositories
```

---

## 🛠️ Setup & Configuration

### 1. Configure `.env`

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set the required environment variables:

```env
# Google Gemini API Key (from Google AI Studio)
GEMINI_API_KEY="your_gemini_api_key"
GEMINI_MODEL="gemini-2.5-pro"

# GitHub Personal Access Token (with repo scope)
GITHUB_TOKEN="ghp_your_github_personal_access_token"

# Target GitHub repository URL or "owner/repo"
GITHUB_REPO_URL="https://github.com/owner/repo"

# Base branch to target (default: main)
TARGET_BRANCH="main"

# Optional: Daily cron schedule (default: 2:00 AM daily)
CRON_SCHEDULE="0 2 * * *"
```

---

## 🚀 Running the Agent

### On-Demand Run
Runs a single autonomous coverage improvement cycle immediately:
```bash
npm run dev
# or for compiled build:
npm run build && npm start
```

### Scheduled Daily Cron Job
Keeps the agent running in the background, executing automatically at the configured `CRON_SCHEDULE` (default: 2:00 AM every day):
```bash
npm run cron
```

### Visual Web Dashboard
To inspect the agent, view traces, or test interactively in the ADK Developer UI:
```bash
npm run web
```
Then navigate to `http://localhost:8000` in your browser.
