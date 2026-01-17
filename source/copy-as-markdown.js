import TurndownService from 'turndown';
import {gfm} from 'turndown-plugin-gfm';
import {MathMLToLaTeX} from 'mathml-to-latex';

// Chrome does not support the browser namespace yet.
if (typeof browser === 'undefined') {
	globalThis.browser = chrome;
}

// Instantiate Turndown instance
const turndownService = new TurndownService({
	hr: '---',
	headingStyle: 'atx',
	bulletListMarker: '-',
	codeBlockStyle: 'fenced'
});
turndownService.keep(['kbd', 'sup', 'sub']); // HTML content to retain in Markdown
turndownService.remove(['script']);
turndownService.use(gfm);

// Workaround to fix #7 until https://github.com/domchristie/turndown/issues/291 gets fixed
turndownService.addRule('listItem', {
	filter: 'li',
	replacement: (content, node, options) => {
		content = content
			.replace(/^\n+/, '') // Remove leading newlines
			.replace(/\n+$/, '\n') // Replace trailing newlines with just a single one
			.replace(/\n/gm, '\n    '); // Indent

		let prefix = options.bulletListMarker + ' ';
		const parent = node.parentNode;
		if (parent.nodeName === 'OL') {
			const start = parent.getAttribute('start');
			const index = Array.prototype.indexOf.call(parent.children, node);
			prefix = (start ? Number(start) + index : index + 1) + '. ';
		}

		return (prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : ''));
	}
});

turndownService.addRule('mathml', {
	filter: 'math',
	replacement: (content, node, _) => {
		const latex = MathMLToLaTeX.convert(node.outerHTML);
		if (!latex) {
			return '';
		}

		const delim = node.getAttribute('display') === 'block' ? '$$' : '$';
		return delim + latex + delim;
	}
});

function getSelectionAsHTML() {
	const selection = document.getSelection();
	let containerTagName = '';

	if (selection.rangeCount === 0) {
		return '';
	}

	const selectionRange = selection.getRangeAt(0); // Only consider the first range
	const container = selectionRange.commonAncestorContainer;

	// All of text in container element is selected, then use parents tag
	if (selectionRange.toString().trim() === container.textContent.trim()) {
		// Handle plain text selections where parent is sometimes 'Node' or 'DocumentFragment'
		// Ideally, this should not happen, but text selection in browsers is unpredictable
		if (container instanceof Element) {
			containerTagName = container.tagName.toLowerCase();
		} else {
			containerTagName = 'p';
		}
	}

	const fragment = selectionRange.cloneContents();
	const wrapper = document.createElement('div');
	wrapper.append(fragment);

	// Converts relative links to absolute links (#6)
	wrapper.querySelectorAll('a').forEach(link => link.setAttribute('href', link.href));

	// For tables, remove all immediate child nodes that are not required
	const tables = wrapper.querySelectorAll('table');
	for (const table of tables) {
		const floaters = Array.from(table.children).filter(node => !['THEAD', 'TBODY', 'TR', 'TFOOT'].includes(node.tagName));
		for (const floater of floaters) {
			floater.remove();
		}
	}

	if (containerTagName === '') {
		return wrapper.innerHTML;
	}

	// For preformatted tags, content needs to be wrapped inside `<code>`
	// or it would not be considered as fenced code block
	if (containerTagName === 'pre') {
		// Classes of parent or container node can be used by GFM plugin to detect language
		const classes = (container.parentNode || container).classList.toString();

		return `
			<div class="${classes}">
				<pre><code>${wrapper.innerHTML}</code></pre>
			</div>
		`;
	}

	return '<' + containerTagName + '>' + wrapper.innerHTML + '</' + containerTagName + '>';
}

browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.actionType === '') {
		return;
	}

	let htmlContent = message.htmlContent;
	if (message.actionType === 'selection') {
		htmlContent = getSelectionAsHTML();
	}

	try {
		const markdownContent = turndownService.turndown(htmlContent);
		await navigator.clipboard.writeText(markdownContent);
		// 剪贴板写入成功，尝试给用户反馈（通过临时修改页面标题）
		document.title = '✓ 已复制到剪贴板';
		setTimeout(() => {
			document.title = '复制为 Markdown';
		}, 2000);
	} catch (error) {
		console.error('剪贴板写入失败:', error);
		// 显示错误状态
		document.title = '✗ 复制失败';
		setTimeout(() => {
			document.title = '复制为 Markdown';
		}, 2000);
	}

	// 响应 background script
	sendResponse({ success: true });
	return true; // 保持消息通道打开以支持异步响应
});
