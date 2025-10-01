# Publishing Guide

## Before Publishing

1. **Update package.json**
   - Set your author name
   - Update repository URL to your actual GitHub repo
   - Update homepage and bugs URL

2. **Create GitHub Repository**
   ```bash
   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/yourusername/aicom.git
   git add .
   git commit -m "feat: initial release of aicom CLI"
   git push -u origin main
   ```

3. **Test Locally**
   ```bash
   npm run build
   npm link  # Test the CLI globally on your machine
   aicom     # Test if it works
   npm unlink # Unlink after testing
   ```

## Publishing to NPM

### First Time Setup

```bash
# Create npm account at https://www.npmjs.com/signup
# Then login
npm login
```

### Publish

```bash
# Make sure everything is built
npm run build

# Check what will be published
npm pack --dry-run

# Publish
npm publish
```

### After Publishing

Test the published package:

```bash
npm install -g aicom
aicom --help
```

## Publishing with PNPM

```bash
# Login (same as npm)
pnpm login

# Publish
pnpm publish
```

## Version Updates

When making updates:

```bash
# Patch version (0.1.0 -> 0.1.1)
npm version patch

# Minor version (0.1.0 -> 0.2.0)
npm version minor

# Major version (0.1.0 -> 1.0.0)
npm version major

# Then publish
npm publish
```

## Checklist Before Publishing

- [ ] Updated package.json with correct author and repo info
- [ ] Created GitHub repository
- [ ] Tested locally with `npm link`
- [ ] README.md is up to date
- [ ] LICENSE file exists
- [ ] All tests pass (if you have tests)
- [ ] Version number is correct
- [ ] .npmignore or files field in package.json is set correctly

## Important Notes

- Package name `aicom` might be taken. Check with: `npm view aicom`
- If taken, choose another name like `@yourusername/aicom` or `ai-commit-gen`
- Make sure to update the name in package.json before publishing
