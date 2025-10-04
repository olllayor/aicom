# Changelog

All notable changes to this project will be documented in this file.

## [0.3.8] - 2025-01-XX

### Changed

- ⚡ **Blazingly fast streaming responses** - AI response now displays in real-time!
- Messages appear as they're generated instead of waiting for complete response
- Significantly improved perceived performance and user experience
- Streaming implementation provides instant feedback

### Technical

- Switched from `generateCommitMessage` to `generateCommitMessageStream`
- Real-time character-by-character display using stdout
- Better responsiveness for users

## [0.3.3] - 2025-10-01

### Changed

- 🔧 **Minor improvements and bug fixes**
- Updated documentation and project metadata

## [0.3.1] - 2025-10-01

### Added

- 🎯 **Enter confirmation feature** - Review before commit!
- Shows the AI-generated commit message
- Waits for user to press Enter to confirm
- Allows users to review the message before committing
- Clean workflow: see message → press Enter → commit

### Changed

- Updated from direct auto-commit to confirmation workflow
- Better user control while maintaining simplicity
- Clearer output showing the commit command before execution

### Why

- Balance between automation and user control
- Users can review AI-generated messages
- Prevents accidental commits with unwanted messages
- Still simple: just press Enter to commit

## [0.3.0] - 2025-10-01

### Changed

- 🎯 **Simplified to direct commit** - No more prompts or confirmations
- Removed interactive prompt
- Removed loading animations
- Just executes `git commit` directly with AI-generated message
- Clean output showing only git's commit confirmation
- Updated workflow: `git add .` → `aicom` → Done!

### Removed

- Interactive message editing prompt
- Loading spinners
- Extra output messages
- readline dependency

### Why

- Maximum simplicity - one command, one action
- Faster workflow
- Less UI noise
- Trust the AI or amend later if needed

## [0.2.0] - 2025-10-01

### Added

- 🎉 **Interactive commit feature** - No more copy-pasting!
- AI-generated message appears pre-filled in a prompt
- Press Enter to commit immediately
- Edit the message before committing if needed
- Press Ctrl+C to cancel
- Better user experience with editable commit messages
- Automatic git commit execution after confirmation

### Changed

- Updated from "output command" to "interactive commit" workflow
- Improved README with interactive usage examples
- Updated feature list to highlight interactive mode

### Technical

- Added readline support for interactive prompts
- Added execSync to execute git commits directly
- Better error handling for commit failures

## [0.1.0] - 2025-10-01

### Added

- Initial release of aicom
- AI-powered commit message generation using OpenRouter
- Automatic free model selection
- Conventional commit format support
- Loading spinner animations
- Git repository validation
- Staged changes detection
- Simple CLI interface
- Configuration management for API keys
- Clean output format

### Features

- Uses OpenRouter's free AI models
- Analyzes git diffs to generate contextual commits
- Follows conventional commit best practices
- Zero runtime dependencies
- Small package size (6.5 kB)
