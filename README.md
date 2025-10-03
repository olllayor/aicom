# aicom - AI-Powered Git Commit

One command to commit with AI-generated message. No prompts, no copy-paste, just commit.

## 🚀 Quick Start

### Installation

```bash
npm install -g aicom
# or
pnpm add -g aicom
```

### Setup

Get a free API key from [OpenRouter](https://openrouter.ai/keys) and set it:

```bash
export OPENROUTER_API_KEY=your_key_here
# Add to ~/.zshrc or ~/.bashrc to make permanent
```

### Usage

```bash
git add .
aicom
```

That's it! AI generates the commit message and commits automatically.

## 📝 Example

```bash
$ git add src/auth.ts
$ aicom
git commit -m "feat: add JWT authentication to user service" (Press Enter to commit)
# [User presses Enter]
[main abc1234] feat: add JWT authentication to user service
 1 file changed, 45 insertions(+), 3 deletions(-)
```

Simple: See the message, press Enter, done!


## 🎯 How It Works

1. **Checks Git Status** - Verifies you're in a git repo with staged changes
2. **Fetches Free Model** - Automatically finds an available free model from OpenRouter
3. **Analyzes Changes** - Gets the git diff of your staged changes
4. **Generates Message** - Uses AI to create a conventional commit message
5. **Outputs Command** - Displays the ready-to-run git commit command

## 🔧 Features

- ✅ **One command commit** - Just run `aicom`, press Enter, done
- ✅ Shows the commit message before executing
- ✅ AI-generated messages using free OpenRouter models
- ✅ Conventional commit format (feat:, fix:, docs:, etc.)
- ✅ Analyzes git diffs for context
- ✅ Zero configuration needed (just API key)
- ✅ Press Enter to confirm
- ✅ Zero runtime dependencies
- ✅ Small package size (~6.7 kB)

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

- Add `export OPENROUTER_API_KEY=your_key` to `~/.zshrc` or `~/.bashrc` for permanent setup
- The tool automatically uses free models from OpenRouter
- Follows conventional commit best practices
- Works silently - only shows git's commit output
- If you need to edit before committing, use `git commit --amend`

## 🤝 Contributing

This is a simple starter project. Feel free to:

- Implement streaming responses
- Create better UI components
- Add custom templates
- Improve error handling
- Add commit message history

## 📄 License

MIT