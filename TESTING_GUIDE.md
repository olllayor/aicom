# aicom Branch Testing Guide

Quick guide to test both implementations before choosing one for production.

## Setup

Get API keys first:
- **Gemini**: https://aistudio.google.com/apikey (free, instant)
- **OpenRouter**: https://openrouter.ai/keys (free, instant)

## Test 1: Gemini Branch (Recommended)

```bash
# Switch to gemini branch
git checkout gemini

# Build
npm run build

# Test with Gemini API
export GOOGLE_AI_API_KEY=your_gemini_key_here
git add .
npm run dev

# Should see: Fast AI-generated commit message, press Enter to commit

# Test OpenRouter fallback
unset GOOGLE_AI_API_KEY
export OPENROUTER_API_KEY=your_openrouter_key_here
git add .
npm run dev

# Should still work with OpenRouter
```

## Test 2: Proxy Branch (Zero-Config)

```bash
# Switch to proxy branch
git checkout proxy

# Deploy the Cloudflare Worker first
cd proxy
npm install
npx wrangler login
npx wrangler secret put GOOGLE_AI_API_KEY
# Paste your Gemini API key when prompted
npm run deploy
# Copy the deployed URL (e.g., https://aicom-proxy.xxx.workers.dev)

# Update the client with your proxy URL
cd ..
# Edit src/lib/config.ts line 8:
# const DEFAULT_PROXY_URL = 'https://aicom-proxy.xxx.workers.dev';

# Build and test
npm run build
git add .
npm run dev

# Should work with NO API key needed!
```

## Test 3: Current Master (OpenRouter Only)

```bash
# Switch back to master
git checkout master

# Build
npm run build

# Test
export OPENROUTER_API_KEY=your_openrouter_key_here
git add .
npm run dev
```

## Expected Results

### Gemini Branch
- ✅ Very fast responses (~1-2 seconds)
- ✅ Works with Gemini API key
- ✅ Falls back to OpenRouter if Gemini key not set
- ✅ Auto-saves keys to ~/.aicom/config.json

### Proxy Branch
- ✅ Zero setup for users (no API key needed)
- ✅ Fast responses
- ✅ All requests go through your Cloudflare Worker
- ✅ You can monitor usage in Cloudflare dashboard

### Master Branch
- ✅ Works with OpenRouter
- ✅ Familiar behavior
- ✅ Auto-saves key to ~/.aicom/config.json

## Comparison

| Test | Setup Time | Speed | User Friction | Your Cost |
|------|-----------|-------|---------------|-----------|
| Gemini | 1 min | ⚡⚡⚡ | Low | $0 |
| Proxy | 5 min (you), 0 min (users) | ⚡⚡⚡ | None | $0-10/mo |
| Master | 1 min | ⚡ | Low | $0 |

## Decision Time

After testing, choose based on:

1. **Go with Gemini** if:
   - You want speed + generous free tier
   - Users can handle 1 minute of setup
   - You want zero operational overhead

2. **Go with Proxy** if:
   - You want absolute zero friction
   - You're okay monitoring usage
   - Your user base is small-medium

3. **Stay with Master** if:
   - Current setup works fine
   - No need to change

## Recommended: Gemini Branch

**Why:**
- Best user experience (fast, generous limits)
- No operational overhead
- Scales infinitely
- Free for everyone

**Merge to master:**
```bash
git checkout master
git merge gemini
npm run build
npm version minor  # Bump to 0.4.0
npm publish
```

## Cleanup

After merging your chosen branch:

```bash
# Delete local branches you don't need
git branch -d gemini  # or proxy
```

Happy testing! 🚀
