# Copy as Markdown for Chrome & Firefox / 复制为 Markdown

[English](#english) | [中文](#中文)

---

## English

Do you often type Markdown code manually for a link or image, or even all tabs in a window, and feel tired? **Copy as Markdown** can help you!

### Download

* Google Chrome: [Chrome Web Store - Copy as Markdown](https://chrome.google.com/webstore/detail/copy-as-markdown/fkeaekngjflipcockcnpobkpbbfbhmdn)
* Firefox: [Copy as Markdown :: Add-ons for Firefox](https://addons.mozilla.org/firefox/addon/copy-as-markdown/)
* Microsoft Edge: [Copy as Markdown - Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/copy-as-markdown/cbbdkefgbfifiljnnklfhnhcnlmpglpd)

### Features

**Copy as Markdown** is a browser extension that helps you copy the following things as Markdown to your system clipboard:

**On the web page:**

- ✅ Selection Text as Markdown
- ✅ A Link on the Page
- ✅ An Image on the Page, with or without wrapping link

**Exporting tabs in the current window, either all or highlighted tabs:**

- ✅ Current Tab as Link
- ✅ List of Links
- ✅ Task List (for GitHub-Flavored Markdown)
- ✅ With Tab Grouping (in Chrome, Edge etc.)

### Keyboard Shortcuts

You can add keyboard shortcuts for copying tab(s) as Markdown. By default, Copy as Markdown does not assign any keyboard shortcuts.

**Firefox**

Please refer to this Firefox Help: <https://support.mozilla.org/en-US/kb/manage-extension-shortcuts-firefox>

**Chrome**

The Keyboard Shortcuts of extensions can be found at `chrome://extensions/shortcuts` URL.

### Known Issues

- [Chrome] When copying an image, the image code does not include the alternative text of that image. This is due to API restrictions.

---

## 中文

你是否经常手动输入链接或图片的 Markdown 代码，甚至需要复制窗口中所有标签页的链接？**Copy as Markdown** 可以帮助你！

### 下载安装

- [Chrome 网上应用店](https://chrome.google.com/webstore/detail/copy-as-markdown/fkeaekngjflipcockcnpobkpbbfbhmdn)
- [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/copy-as-markdown/)
- [Microsoft Edge 扩展](https://microsoftedge.microsoft.com/addons/detail/copy-as-markdown/cbbdkefgbfifiljnnklfhnhcnlmpglpd)

### 功能特性

**网页内容复制：**

- ✅ 复制选中文本为 Markdown
- ✅ 复制页面链接
- ✅ 复制图片（可选择是否包含链接）

**标签页导出：**

- ✅ 当前标签页作为链接
- ✅ 链接列表
- ✅ GitHub 任务列表格式
- ✅ 按标签页分组导出（Chrome、Edge）

### 键盘快捷键

默认情况下不分配快捷键，您可以自行设置：

**Chrome / Edge**: 打开 `chrome://extensions/shortcuts` 设置

**Firefox**: 附加组件管理中设置快捷键

### 常见问题

- [Chrome] 复制图片时无法获取替代文本（API 限制）

---

## Development / 开发

### Folder Structure / 项目结构

```
src/               # Shared Source Code / 共享源代码
  handlers/        # Message/command handlers / 消息和命令处理器
  services/        # Business logic / 业务逻辑
  ui/              # Popup/options pages / 弹出页面和选项页面
chrome/            # Chrome files / Chrome 文件
firefox-mv2/       # Firefox MV2 files / Firefox MV2 文件
firefox-mv3/       # Firefox MV3 files / Firefox MV3 文件
test/              # Tests / 测试
```

### Install / 安装

```bash
npm install -g web-ext
npm install
```

### Debug / 调试

```bash
npm run debug-chrome   # Chrome
npm run debug-firefox-mv3  # Firefox MV3
```

### Tests / 测试

```bash
npm test              # Unit tests / 单元测试
npm run test:e2e      # E2E tests / 端到端测试
```

---

## License / 许可证

MIT License - See [MIT-LICENSE.txt](MIT-LICENSE.txt)
