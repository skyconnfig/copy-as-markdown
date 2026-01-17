/**
 * Copy as Markdown 核心功能验证脚本
 *
 * 这个脚本直接使用 Turndown 库测试 HTML 到 Markdown 的转换功能，
 * 验证扩展程序的核心转换逻辑是否正确。
 */

const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');

// 创建 TurndownService（与扩展程序配置相同）
const turndownService = new TurndownService({
    hr: '---',
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced'
});

// 添加 GFM 插件
turndownService.keep(['kbd', 'sup', 'sub']);
turndownService.remove(['script']);
turndownService.use(gfm);

// 自定义规则（与扩展程序相同）
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

console.log('🧪 Copy as Markdown 核心功能验证');
console.log('='.repeat(60) + '\n');

const testCases = [
    {
        name: '基础文本',
        html: '<p>这是一段测试文本</p>',
        expected: '这是一段测试文本\n'
    },
    {
        name: '粗体文本',
        html: '<p>这是<strong>粗体</strong>文本</p>',
        expected: '这是**粗体**文本\n'
    },
    {
        name: '斜体文本',
        html: '<p>这是<em>斜体</em>文本</p>',
        expected: '这是_斜体_文本\n'  // Turndown 默认使用下划线
    },
    {
        name: '删除线',
        html: '<p><del>删除线</del>文本</p>',
        expected: '~删除线~文本\n'  // Turndown 默认使用单 ~
    },
    {
        name: '行内代码',
        html: '<p>这是 <code>代码</code> 文本</p>',
        expected: '这是 `代码` 文本\n'
    },
    {
        name: '链接',
        html: '<a href="https://example.com">链接文本</a>',
        expected: '[链接文本](https://example.com)'
    },
    {
        name: '图片',
        html: '<img src="image.jpg" alt="图片描述" />',
        expected: '![图片描述](image.jpg)'
    },
    {
        name: '无序列表',
        html: '<ul><li>第一项</li><li>第二项</li></ul>',
        expected: '- 第一项\n- 第二项\n'
    },
    {
        name: '有序列表',
        html: '<ol><li>第一项</li><li>第二项</li></ol>',
        expected: '1. 第一项\n2. 第二项\n'
    },
    {
        name: '代码块',
        html: '<pre><code>console.log("Hello");</code></pre>',
        expected: '```\nconsole.log("Hello");\n```'
    },
    {
        name: '表格',
        html: '<table><tr><th>标题1</th><th>标题2</th></tr><tr><td>内容1</td><td>内容2</td></tr></table>',
        expected: '| 标题1 | 标题2 |\n| --- | --- |\n| 内容1 | 内容2 |\n'
    },
    {
        name: '混合内容',
        html: '<p>这是<strong>粗体</strong>和<em>斜体</em>文本，包含<a href="https://example.com">链接</a></p>',
        expected: '这是**粗体**和_斜体_文本，包含[链接](https://example.com)\n'
    }
];

let passed = 0;
let failed = 0;

console.log('开始测试...\n');

testCases.forEach((testCase, index) => {
    try {
        const result = turndownService.turndown(testCase.html);
        const isCorrect = result.trim() === testCase.expected.trim();

        console.log(`【${index + 1}】${testCase.name}`);
        console.log(`   输入: ${testCase.html}`);
        console.log(`   期望: ${testCase.expected.replace(/\n/g, '\\n')}`);
        console.log(`   结果: ${result.replace(/\n/g, '\\n')}`);
        console.log(`   状态: ${isCorrect ? '✅ 通过' : '❌ 失败'}`);
        console.log('');

        if (isCorrect) {
            passed++;
        } else {
            failed++;
        }
    } catch (error) {
        console.log(`【${index + 1}】${testCase.name}`);
        console.log(`   状态: ❌ 失败 - ${error.message}`);
        console.log('');
        failed++;
    }
});

console.log('='.repeat(60));
console.log('📊 测试结果汇总');
console.log('='.repeat(60));
console.log(`总测试数: ${testCases.length}`);
console.log(`✅ 通过: ${passed}`);
console.log(`❌ 失败: ${failed}`);
console.log(`通过率: ${((passed / testCases.length) * 100).toFixed(1)}%`);
console.log('='.repeat(60) + '\n');

if (failed === 0) {
    console.log('🎉 所有核心转换测试通过！');
    console.log('扩展程序的核心功能工作正常。\n');
} else {
    console.log('⚠️ 部分测试失败，请检查上述输出了解详情。\n');
}

console.log('💡 下一步建议：');
console.log('1. 在浏览器中手动测试扩展程序（使用 test-page.html）');
console.log('2. 验证右键菜单功能（链接复制、图片复制）');
console.log('3. 测试快捷键 Alt+X 的响应性');
console.log('');

process.exit(failed > 0 ? 1 : 0);
