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

2. Generate and get commit command:

```bash
aicom
```

3. Copy and run the output, or pipe it directly:

```bash
$(aicom)
```

## 📝 Example

```bash
$ git add .
$ aicom
✨ Generating commit message... ⠋
git commit -m "feat: add user authentication with JWT tokens"

# Run the generated command directly
$ $(aicom)
[main 8f7a9c2] feat: add user authentication with JWT tokens
 3 files changed, 127 insertions(+), 12 deletions(-)
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

- ✅ Automatic free model selection from OpenRouter
- ✅ Conventional commit format
- ✅ Analyzes git diffs
- ✅ Simple, clean output
- ✅ Loading indicators
- ✅ Direct command execution support
- 🚧 Interactive mode (coming soon)
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
- Use `$(aicom)` to execute the commit command directly
- The tool uses free models from OpenRouter automatically

## 🤝 Contributing

This is a simple starter project. Feel free to:

- Add interactive mode
- Implement streaming responses
- Create better UI components
- Add custom templates
- Improve error handling

## 📄 License

MIT
