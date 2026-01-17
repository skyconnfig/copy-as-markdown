# <img src="source/copy-as-markdown.png" width="45" align="left"> 复制为 Markdown

> 浏览器扩展程序，可以将超链接、图片和选中的文本复制为 Markdown 格式到剪贴板

## 安装

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/chrome/chrome.svg" width="48" alt="Chrome" valign="middle">][link-chrome] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/nlaionblcaejecbkcillglodmmfhjhfi.svg?label=%20">][link-chrome] 以及其他 Chromium 浏览器

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/90fdf03c/src/firefox/firefox.svg" width="48" alt="Firefox" valign="middle">][link-firefox] [<img valign="middle" src="https://img.shields.io/amo/v/cpy-as-md.svg?label=%20">][link-firefox] 包括 Firefox Android

## 功能特性

该扩展程序允许您将页面上的选中文本复制为 Markdown，支持以下功能：

- 可以将链接、图片和选中的文本复制为 Markdown 格式
- 对于链接图片，可以单独选择复制链接或图片
- 支持格式化文本，如 _斜体_、**粗体**、~~删除线~~ 和 `行内代码`
- 支持无序列表和有序列表，以及 [任务列表](https://github.github.com/gfm/#task-list-items-extension-) 功能
- 支持表格，符合 [GFM](https://github.github.com/gfm/#tables-extension-) 规范
- 支持围栏代码块，并使用 [信息字符串](https://github.github.com/gfm/#example-112) 进行语言检测
- 支持 MathML 到 LaTeX 的转换，使用 [mathml-to-latex](https://github.com/asnunes/mathml-to-latex)（行内使用 `$`，块级使用 `$$` 进行分隔渲染）

<table>
	<tr>
		<th width="50%">
            <p><img src="./media/screenshot-640x400.png">
		<th width="50%">
			<p><img src="./media/screenshot-1280x800.png">
</table>

## 权限说明

该扩展程序需要您授予以下权限才能正常工作：

1. `contextMenus`：用于在右键点击时显示选项
1. `activeTab`：用于访问页面内容

## 已知问题

### 安全注意事项

在以下情况下，复制到剪贴板可能无法工作：

- 您处于不安全页面（URL 以 `http://` 而非 `https://` 开头）
- 您尚未与页面进行任何交互

这些限制是软件设计决策的结果，旨在保护用户免受恶意攻击的影响。MDN 文章章节 ["安全注意事项"][link-security-considerations] 列出了这些限制及其存在原因。

您可以在 MDN 上找到更多关于 [用户激活](link-transient-activation) 和 [安全上下文][link-secure-contexts] 的信息。

### 复制嵌入内容

网页有时会使用 [`iframe`](http://mdn.io/iframe) 嵌入其他页面的内容。由于访问和修改剪贴板的安全注意事项（见上文），如果您尝试从这些框架内复制文本，扩展程序将无法正常工作。

### Chromium 浏览器的特殊情况

在复制链接和图片时，Chrome 无法提取图片的 alt 文本或锚点的文本内容用于 Markdown，而是直接使用链接本身作为链接标题。Firefox 没有此限制。

## 致谢

- 感谢 [@nicolo-ribaudo](https://github.com/nicolo-ribaudo) 的 [这条推文](https://twitter.com/NicoloRibaudo/status/1143521181196345346) 提供了这个创意
- 感谢 [@yakov116](https://github.com/yakov116) 使得发布成为可能

## 相关项目

- [browser-extension-template](https://github.com/notlmn/browser-extension-template) - 带有 webpack、选项处理和自动发布功能的极简模板

## 许可证

[MIT](license)

[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/cpy-as-md
[link-chrome]: https://chromewebstore.google.com/detail/copy-as-markdown/nlaionblcaejecbkcillglodmmfhjhfi
[link-security-considerations]: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API#security_considerations
[link-transient-activation]: https://developer.mozilla.org/en-US/docs/Web/Security/User_activation
[link-secure-contexts]: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts
