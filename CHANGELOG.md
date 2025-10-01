# Changelog

All notable changes to this project will be documented in this file.

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
