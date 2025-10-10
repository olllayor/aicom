# aicom Branch Comparison Guide

This document compares the three different implementation approaches for aicom.

## 🌳 Branch Overview

### 1. **master** - OpenRouter Only (Current Production)
Users bring their own OpenRouter API key.

### 2. **gemini** - Gemini with OpenRouter Fallback (Recommended for Users)
Users bring their own Google AI Studio (Gemini) key, with OpenRouter as backup option.

### 3. **proxy** - Zero-Config with Proxy Service (Recommended for Maintainer)
Maintainer deploys a Cloudflare Worker proxy with embedded API key. Users need zero setup.

---

## 📊 Detailed Comparison

| Aspect | master (OpenRouter) | gemini (Gemini + Fallback) | proxy (Zero-Config) |
|--------|-------------------|---------------------------|-------------------|
| **User Setup** | Export OpenRouter key | Export Gemini key (preferred) or OpenRouter key | None (zero-config) |
| **Setup Time** | 1 minute | 1 minute | 0 seconds |
| **API Key** | User's OpenRouter key | User's Gemini or OpenRouter key | Maintainer's key (hidden) |
| **Free Tier** | Shared pool (limited) | 1,500 req/day per user | 1,500 req/day total (shared) |
| **Speed** | Varies by model | ⚡ Very fast (Gemini Flash) | ⚡ Very fast (Gemini Flash) |
| **Rate Limits** | Per user (shared pool) | Per user (15/min) | Shared (15/min total) |
| **Scalability** | ✅ Excellent | ✅ Excellent | ⚠️ Limited by maintainer's quota |
| **User Friction** | Low | Low | None |
| **Maintainer Cost** | $0 | $0 | $0 (free tier) to ~$10/month (heavy use) |
| **Abuse Risk** | None (users' keys) | None (users' keys) | ⚠️ Possible (needs rate limiting) |
| **Operational Load** | None | None | ⚠️ Monitoring required |
| **Best For** | Established tool | Power users, speed-focused | New users, demos |

---

## 🎯 Decision Matrix

### Choose **`master`** (OpenRouter) if:
- ✅ You want to keep it simple and proven
- ✅ Current implementation is working fine
- ✅ Users are already familiar with OpenRouter
- ✅ You want zero operational overhead

### Choose **`gemini`** (Gemini + Fallback) if:
- ✅ You want the best user experience with speed
- ✅ You want to offer users choice (Gemini or OpenRouter)
- ✅ Gemini's free tier is more attractive (1,500/day vs shared pool)
- ✅ You want users to have their own rate limits
- ✅ **Recommended for most users**

### Choose **`proxy`** (Zero-Config) if:
- ✅ You want the absolute lowest friction for new users
- ✅ You're okay monitoring and managing a proxy service
- ✅ Your user base is small-to-medium (< 1,500 req/day total)
- ✅ You want full control over the AI experience
- ✅ You're comfortable with Cloudflare Workers
- ✅ **Recommended for demos, hackathons, or getting started**

---

## 💡 Recommended Strategy

### Phase 1: Start with `gemini` (Recommended)
1. Merge `gemini` branch to master
2. Update README with Gemini setup instructions
3. Keep OpenRouter as fallback option
4. Publish to npm

**Why?**
- Best balance of user experience and scalability
- No operational overhead for maintainer
- Users get their own generous rate limits
- Faster than OpenRouter's free tier

### Phase 2: Offer `proxy` for Enterprise (Optional)
1. Deploy proxy service
2. Offer as an optional paid/enterprise tier
3. Provide custom proxy URL for teams
4. Add authentication for paying customers

**Why?**
- Great for teams that want zero setup
- You can monetize (if desired)
- Provides managed service option

---

## 🧪 Testing Guide

### Test `gemini` branch:

```bash
git checkout gemini
npm run build

# Test with Gemini
export GOOGLE_AI_API_KEY=your_gemini_key
git add .
npm run dev

# Test with OpenRouter fallback
unset GOOGLE_AI_API_KEY
export OPENROUTER_API_KEY=your_openrouter_key
git add .
npm run dev
```

### Test `proxy` branch:

```bash
git checkout proxy

# Deploy proxy first
cd proxy
npm install
npx wrangler login
npx wrangler secret put GOOGLE_AI_API_KEY
npm run deploy
# Note the deployed URL

# Update src/lib/config.ts with your proxy URL
cd ..
npm run build

# Test (no API key needed!)
git add .
npm run dev
```

---

## 📈 Migration Paths

### From `master` → `gemini`:
1. Merge gemini branch
2. Update README
3. Announce to users: "Now supports Gemini! Faster and more generous limits"
4. Keep OpenRouter as fallback (backward compatible)

### From `master` → `proxy`:
1. Deploy Cloudflare Worker
2. Update config with proxy URL
3. Announce: "Now zero-config! No API key needed"
4. Monitor usage closely

### From `gemini` → `proxy`:
1. Deploy proxy
2. Offer as alternative: "Use Gemini key OR use zero-config mode"
3. Add option to switch between modes

---

## 🔒 Security Considerations

### `master` & `gemini`:
- ✅ Users control their own keys
- ✅ Keys stored locally in ~/.aicom/config.json
- ✅ No server-side key storage

### `proxy`:
- ⚠️ Your key is exposed to Cloudflare (encrypted)
- ✅ Key never exposed to users
- ⚠️ Need rate limiting to prevent abuse
- ✅ HTTPS only, CORS protection

---

## 💰 Cost Analysis

### All Branches - Free Tier Limits

**OpenRouter (master):**
- Free tier: Shared pool of free models
- Unpredictable availability
- No per-user limits

**Gemini (gemini branch):**
- 1,500 requests/day per user
- 15 requests/minute per user
- Each user gets their own quota

**Gemini via Proxy (proxy branch):**
- 1,500 requests/day total (all users share)
- 15 requests/minute total
- Cloudflare Workers: 100k requests/day (separate limit)

### Scaling Costs

**If 1,000 users, each making 5 commits/day:**

**gemini branch:**
- Cost: $0 (users pay for own API if they exceed free tier)
- Your cost: $0

**proxy branch:**
- Daily requests: 5,000
- Gemini cost: ~$1.75/day = ~$50/month
- Cloudflare cost: $0 (within free tier)
- Your cost: ~$50/month

---

## 🚀 Recommendation

### For Most Projects: Use `gemini` branch

**Reasoning:**
1. ✅ Best user experience (fast, generous limits)
2. ✅ Zero operational overhead for maintainer
3. ✅ Scales infinitely (users manage own keys)
4. ✅ Backward compatible (OpenRouter fallback)
5. ✅ Free for everyone

**Publish command:**
```bash
git checkout gemini
npm run build
npm version minor  # 0.4.0 - new feature
npm publish
```

---

## 📝 Next Steps

1. **Test both branches** locally with real git commits
2. **Decide** based on your user base and goals
3. **Update** README.md with chosen approach
4. **Publish** to npm
5. **Announce** the update to users

---

## 🤝 Contributing

Each branch is fully functional and can be merged to master. If you want to maintain multiple approaches:

- Keep `gemini` as default/recommended
- Keep `proxy` for enterprise/teams
- Archive `master` or keep as legacy

---

## 📞 Support

For questions about which branch to use:
- Create an issue on GitHub
- Discuss in the README
- Tag with `architecture` or `deployment`

---

**Summary:** Start with `gemini` for best balance. Add `proxy` later if needed for enterprise customers or specific use cases.
