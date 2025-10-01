#!/bin/bash

# Quick Start Script for aicom

echo "🚀 AIcom Quick Start"
echo "===================="
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Check if package is built
if [ ! -d "dist" ]; then
    echo "📦 Building package..."
    npm run build
    echo "✅ Build complete!"
    echo ""
fi

# Check for API key
if [ -z "$OPENROUTER_API_KEY" ]; then
    echo "⚠️  OPENROUTER_API_KEY not set"
    echo ""
    echo "To use aicom, you need an API key from OpenRouter:"
    echo "1. Get free key: https://openrouter.ai/keys"
    echo "2. Set it: export OPENROUTER_API_KEY=your_key"
    echo ""
    echo "Add to your ~/.zshrc or ~/.bashrc to make permanent:"
    echo "   echo 'export OPENROUTER_API_KEY=your_key' >> ~/.zshrc"
    echo ""
    exit 1
fi

# Check if in git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository"
    exit 1
fi

# Check for staged changes
if ! git diff --cached --quiet; then
    echo "✅ Found staged changes"
    echo ""
    echo "🤖 Running aicom..."
    echo ""
    node dist/index.js
else
    echo "📝 No staged changes found"
    echo ""
    echo "Stage your changes first:"
    echo "   git add <files>"
fi
