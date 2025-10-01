# 🤖 AIcom - AI-Powered Git Commit Generator

Generate meaningful commit messages using AI and OpenRouter's free models.

## 🚀 Quick Start

### Installation

```bash
npm install -g aicom
# or
pnpm add -g aicom
```

### Setup

1. Get a free API key from [OpenRouter](https://openrouter.ai/keys)

2. Set your API key:

```bash
export OPENROUTER_API_KEY=your_key_here
```

### Usage

1. Stage your changes:

```bash
git add <your-files>
```

2. Run aicom and press Enter to commit:

```bash
aicom
```

The AI will generate a commit message. You can:
- Press **Enter** to commit with the generated message
- Edit the message before pressing Enter
- Press **Ctrl+C** to cancel

## 📝 Example

```bash
$ git add .
$ aicom
✨ Generating commit message... ⠋

📝 Commit message: feat: add user authentication with JWT tokens
# Press Enter to commit, or edit the message first

[main 8f7a9c2] feat: add user authentication with JWT tokens
 3 files changed, 127 insertions(+), 12 deletions(-)
✅ Committed successfully!
```

## 📁 Project Structure

```
src/
├── index.ts                    # Main CLI entry point
├── types/
│   └── index.ts               # TypeScript type definitions
├── lib/
│   ├── git.ts                 # Git operations (staged files, diffs)
│   ├── aiService.ts           # OpenRouter API integration
│   ├── promptEngine.ts        # System prompts & templates
│   ├── config.ts              # Configuration management
│   └── openrouter.ts          # Free model fetcher
└── components/
    ├── commitPreview.ts       # (Future) Commit message preview
    └── staggedFilesDisplay.ts # (Future) Staged files display
```

## 🎯 How It Works

1. **Checks Git Status** - Verifies you're in a git repo with staged changes
2. **Fetches Free Model** - Automatically finds an available free model from OpenRouter
3. **Analyzes Changes** - Gets the git diff of your staged changes
4. **Generates Message** - Uses AI to create a conventional commit message
5. **Outputs Command** - Displays the ready-to-run git commit command

## 🔧 Features

- ✅ **Interactive commit** - Review and edit AI-generated messages before committing
- ✅ Automatic free model selection from OpenRouter
- ✅ Conventional commit format
- ✅ Analyzes git diffs
- ✅ Simple, clean output
- ✅ Loading indicators
- ✅ Press Enter to commit instantly
- 🚧 Custom prompt templates (coming soon)

## 🛠️ Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/aicom.git
cd aicom

# Install dependencies
npm install

# Build
npm run build

# Test locally
npm run dev
```

### Build for Production

```bash
npm run build
```

### Publishing

```bash
# Login to npm
npm login

# Publish
npm publish
# or with pnpm
pnpm publish
```

## 📦 Configuration

API keys can be set via:

1. Environment variable: `OPENROUTER_API_KEY`
2. Config file: `~/.aicom/config.json` (future enhancement)

## 💡 Tips

- Add `export OPENROUTER_API_KEY=your_key` to your `~/.zshrc` or `~/.bashrc` to make it permanent
- Edit the generated message before pressing Enter if needed
- Press Ctrl+C to cancel the commit
- The tool uses free models from OpenRouter automatically
- Follows conventional commit format (feat:, fix:, docs:, etc.)

## 🤝 Contributing

This is a simple starter project. Feel free to:

- Implement streaming responses
- Create better UI components
- Add custom templates
- Improve error handling
- Add commit message history

## 📄 License

MIT


## test
