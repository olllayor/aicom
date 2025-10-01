#!/bin/bash

# Example usage of aicom

echo "🎯 Example 1: Basic Usage"
echo "========================="
echo "$ git add ."
echo "$ aicom"
echo "Output: git commit -m \"feat: add new feature\""
echo ""

echo "🎯 Example 2: Direct Execution"
echo "==============================="
echo "$ \$(aicom)"
echo "Output: [main abc1234] feat: add new feature"
echo "         3 files changed, 127 insertions(+)"
echo ""

echo "🎯 Example 3: Copy to Clipboard (macOS)"
echo "========================================"
echo "$ aicom | pbcopy"
echo "Then paste with Cmd+V"
echo ""

echo "🎯 Example 4: Save to Variable"
echo "==============================="
echo "$ COMMIT_CMD=\$(aicom)"
echo "$ echo \$COMMIT_CMD"
echo "$ \$COMMIT_CMD"
echo ""

echo "💡 Pro Tip: Add to your shell config"
echo "====================================="
echo "Add this to ~/.zshrc or ~/.bashrc:"
echo ""
echo "export OPENROUTER_API_KEY=your_key_here"
echo "alias aicommit='\$(aicom)'"
echo ""
echo "Then just run: aicommit"
