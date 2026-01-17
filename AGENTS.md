# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-17T21:50+08:00
**Project:** copy-as-markdown - Browser Extension (Chrome + Firefox)

## OVERVIEW

Browser extension to copy hyperlinks, images, and selected text as Markdown. Converts HTML to Markdown using TurndownService with GFM support and MathML-to-LaTeX conversion.

## STRUCTURE

```
copy-as-markdown/
├── source/                    # Core extension source
│   ├── copy-as-markdown.js   # Content script (HTML→Markdown conversion)
│   ├── background.js          # Service worker (context menus + shortcuts)
│   └── manifest.json          # Extension manifest (v2/v3 hybrid)
├── .github/workflows/         # CI/CD (test + deployment)
├── media/                     # Screenshots + promo images
└── distribution/              # Build output (generated)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| **Content conversion** | `source/copy-as-markdown.js` | TurndownService config, custom rules |
| **Context menus** | `source/background.js` | Right-click + keyboard shortcuts |
| **Extension config** | `source/manifest.json` | Permissions, browser compatibility |
| **Build & release** | `.github/workflows/` | Automated dual-store deployment |
| **Code quality** | `package.json` | XO linting rules |

## CONVENTIONS (THIS PROJECT)

**Code Style**
- Linter: **XO** (not standard ESLint), configured in `package.json:38-52`
- Indentation: **Tabs** (`.editorconfig`), but actual code uses 2 spaces - inconsistency
- Line endings: **LF** (Unix style)

**Browser Compatibility**
- Global polyfill: `if (typeof browser === 'undefined') globalThis.browser = chrome;`
- Supports both `browser` and `chrome` namespaces
- Manifest v2 + v3 hybrid syntax (`service_worker` + `scripts`)

**Build & Release**
- Output directory: `distribution/` (not `dist/` or `build/`)
- Terser configured with `mangle: false, compress: false, beautify: true` (keeps code readable)
- Automatic versioning via `daily-version` (date-based, triggers on `20.*`-`24.*` tags)
- Weekly scheduled release (Monday 11:10 UTC)

## ANTI-PATTERNS (THIS PROJECT)

**DO NOT** assume standard webpack production optimization:
- Code is NOT minified or obfuscated (intentionally for auditability)
- Source maps are exposed in `web_accessible_resources`

**DO NOT** expect unit tests:
- `npm test` = `run-s lint:* build` (lint + build verification only)
- No test framework configured

**DO NOT** use spaces for indentation in config files:
- YAML files require 2-space indent (`.editorconfig` exception)

**DO NOT** ignore browser compatibility:
- Chrome lacks `browser` namespace → requires polyfill (line 1-4 in both JS files)
- Chrome cannot extract alt/anchor text (uses link URL as title)
- Firefox has no such limitation

**DO NOT** rely on clipboard API without user interaction:
- Requires secure context (HTTPS)
- Requires user activation (click/keypress)
- Fails silently on insecure pages or no interaction

**DO NOT** try to copy from iframes:
- Security restriction prevents iframe content access

## KNOWN LIMITATIONS

| Issue | Location | Impact |
|-------|----------|--------|
| turndown issue #7 | `copy-as-markdown.js:21` | Custom listItem workaround until upstream fix |
| Single range selection | `copy-as-markdown.js:63` | Multi-range selections not supported |
| Chrome alt text extraction | `readme.md:55-57` | Uses link URL instead of alt text |
| Script tags removed | `copy-as-markdown.js:18` | `<script>` tags stripped during conversion |
| Table floaters removed | `copy-as-markdown.js:84-91` | Non-standard table elements stripped |

## KEYWORDS CHECK

✅ **No TODO/FIXME/DEPRECATED comments** found in source code
✅ **No DO NOT/NEVER/ALWAYS patterns** flagged
✅ All known issues properly documented in README or code comments

## UNIQUE STYLES

- **Dual-store deployment**: Single workflow publishes to Chrome Web Store AND Firefox Add-ons
- **Lockfile security scan**: `lockfile-lint` validates HTTPS-only dependencies
- **Template-generated CI**: Deployment workflow generated via `ghatemplates`
- **Minimal dependency surface**: Only 3 runtime deps (turndown, turndown-plugin-gfm, mathml-to-latex)

## COMMANDS

```bash
# Development
npm run watch          # Development build with watch mode
npm run lint-fix       # Auto-fix linting issues

# Quality Assurance
npm run lint           # Run all linters
npm test               # Lint + production build

# Release
npm run release        # Full release pipeline (version → build → publish)
npm run release:cws    # Chrome Web Store only
npm run release:amo    # Firefox Add-ons only
```

## NOTES

- **No traditional test files** - quality assurance via lint + build verification
- **Hybrid manifest** supports both Chrome MV3 and Firefox (backward compatible)
- **Source maps included** in distribution for debugging
- **Extension ID** stored in GitHub Secrets (`EXTENSION_ID`, `CLIENT_ID`, etc.)
