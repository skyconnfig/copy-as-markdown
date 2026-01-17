# SOURCE DIRECTORY

**Scope:** Core extension files (content script + service worker + manifest)

## OVERVIEW

Three files implementing browser extension functionality:
- `copy-as-markdown.js`: Content script - HTML to Markdown conversion
- `background.js`: Service worker - Context menus and keyboard shortcuts
- `manifest.json`: Extension configuration (permissions, browser compatibility)

## WHERE TO LOOK

| File | Lines | Purpose |
|------|-------|---------|
| `copy-as-markdown.js` | ~130 | TurndownService setup, custom rules (listItem, mathml), clipboard API |
| `background.js` | ~61 | Context menu creation, event listeners (menus + commands), message passing |
| `manifest.json` | ~54 | MV3 + MV2 hybrid, permissions (contextMenus, activeTab), web_accessible_resources |

## KEY IMPLEMENTATIONS

### Content Script (`copy-as-markdown.js`)

```javascript
// TurndownService setup (line 11-19)
const turndownService = new TurndownService({
  hr: '---',
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});
turndownService.keep(['kbd', 'sup', 'sub']);
turndownService.use(gfm);

// Custom rule: listItem (line 22-40) - Workaround for turndown issue #7
// Custom rule: mathml (line 42-53) - MathML to LaTeX conversion

// Message listener (line 113-129)
browser.runtime.onMessage.addListener(async message => {
  // Handles: selection, image, link actions
  // Converts HTML → Markdown → clipboard
});
```

### Service Worker (`background.js`)

```javascript
// Context menu creation (line 8-14) - 3 menus: image, link, selection

// Menu click handler (line 17-41)
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  // Constructs HTML based on menuItemId suffix
  // Sends message to content script for conversion
});

// Keyboard shortcut (line 44-60) - Alt+X triggers selection conversion
browser.commands.onCommand.addListener(async command => {
  if (command === 'copy-selection-as-md') { /* ... */ }
});
```

### Manifest (`manifest.json`)

- **Permissions**: `contextMenus`, `activeTab`
- **Background**: Hybrid `service_worker` + `scripts` (MV2 + MV3 compatibility)
- **Content Scripts**: Matches `*://*/*`, runs at `document_start`
- **Web Accessible**: Includes source maps (unusual)

## CONVENTIONS

**Browser Polyfill** (both JS files):
```javascript
if (typeof browser === 'undefined') {
  globalThis.browser = chrome;
}
```

**Error Handling**: Console error logging only (no user notification)

**DOM Selection**: Uses `document.getSelection()` with `cloneContents()` for fragment extraction

## ANTI-PATTERNS

**DO NOT** expect synchronous clipboard API:
- `navigator.clipboard.writeText()` requires user activation
- Errors silently caught (line 126-128)

**DO NOT** access iframe content:
- Security restriction (documented in README)

**DO NOT** rely on Chrome providing anchor text:
- Chrome limitation: cannot extract link text/alt text
- Firefox supports this

**DO NOT** use multi-range selections:
- Only first range from `document.getSelection().getRangeAt(0)` processed

## KEY COMMENTS & WORKAROUNDS

| File | Line | Comment | Meaning |
|------|------|---------|---------|
| `copy-as-markdown.js` | 5 | Chrome does not support the browser namespace yet. | Polyfill required |
| `copy-as-markdown.js` | 21 | Workaround to fix #7 until turndown issue #291 gets fixed | List item handling workaround |
| `copy-as-markdown.js` | 69 | Ideally, this should not happen, but text selection in browsers is unpredictable | Edge case handling |
| `background.js` | 1 | Chrome does not support the browser namespace yet. | Same polyfill needed |

## NOTES

- **No input validation** on HTML content before conversion
- **No user feedback** on copy success/failure
- **MathML conversion** uses external `mathml-to-latex` package
- **Relative links** converted to absolute via `link.href` assignment
- **No TODO/FIXME comments** in source code - well-maintained
