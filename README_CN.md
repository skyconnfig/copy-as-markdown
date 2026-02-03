# Copy as Markdown - 浏览器扩展

一款帮助您快速将网页内容转换为 Markdown 格式并复制到剪贴板的浏览器扩展。

## 下载安装

- [Chrome 网上应用店](https://chrome.google.com/webstore/detail/copy-as-markdown/fkeaekngjflipcockcnpobkpbbfbhmdn)
- [Firefox 附加组件](https://addons.mozilla.org/firefox/addon/copy-as-markdown/)
- [Microsoft Edge 扩展](https://microsoftedge.microsoft.com/addons/detail/copy-as-markdown/cbbdkefgbfifiljnnklfhnhcnlmpglpd)

## 功能特性

### 网页内容复制

- **复制选中文本** - 将网页选中的文本转换为 Markdown 格式
- **复制链接** - 右键点击链接，可将其复制为 Markdown 链接格式
- **复制图片** - 右键点击图片，可将其复制为 Markdown 图片格式（可选择是否包含链接）

### 标签页导出

- **当前标签页** - 将当前标签页作为链接导出
- **链接列表** - 将窗口中所有或选中的标签页导出为链接列表
- **任务列表** - 导出为 GitHub 风格的 Task List 格式
- **标签页分组** - 支持按标签页分组导出（Chrome、Edge 等）

## 键盘快捷键

默认情况下，扩展不分配任何键盘快捷键。您可以自行设置：

### Chrome / Edge

1. 打开 `chrome://extensions/shortcuts`（在地址栏粘贴并回车）
2. 找到 "Copy as Markdown" 扩展
3. 为需要的操作设置快捷键

### Firefox

1. 打开菜单 → 附加组件和主题
2. 点击扩展旁边的齿轮图标 → 管理扩展快捷键
3. 为需要的操作设置快捷键

## 常见问题

### Q: 复制图片时没有包含替代文本？

A: 这是 Chrome 浏览器的 API 限制导致的，暂时无法获取图片的 alt 属性。

### Q: 快捷键不生效？

A: 请确保焦点在浏览器窗口内，部分快捷键可能与其他扩展或系统快捷键冲突。

### Q: 如何复制带有链接的图片？

A: 右键点击图片，在上下文菜单中会看到"复制图片为 Markdown（含链接）"选项。

## 自定义格式

在扩展设置中，您可以创建自定义的 Markdown 格式模板，支持变量替换：

- `{title}` - 标题
- `{url}` - URL 地址
- `{number}` - 序号

## 权限说明

扩展需要以下权限才能正常工作：

- **访问网站数据** - 用于读取页面内容和链接信息
- **剪贴板写入** - 将转换后的 Markdown 内容复制到剪贴板
- **标签页访问** - 导出标签页列表功能

## 反馈与支持

如有问题或建议，请访问：
- [GitHub Issues](https://github.com/skyconnfig/copy-as-markdown/issues)
- [Chrome 商店评论](https://chrome.google.com/webstore/detail/copy-as-markdown/fkeaekngjflipcockcnpobkpbbfbhmdn/reviews)

## 开源许可

本项目基于 MIT 许可证开源，详见 [MIT-LICENSE.txt](MIT-LICENSE.txt)。
