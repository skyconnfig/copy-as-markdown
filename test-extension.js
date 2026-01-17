const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
    console.log('🧪 开始测试 Copy as Markdown 扩展程序...\n');

    // 检查扩展程序目录是否存在
    const extensionPath = path.resolve(__dirname, 'distribution');
    if (!fs.existsSync(extensionPath)) {
        console.error('❌ 错误: 扩展程序目录不存在。请先运行 npm run build');
        process.exit(1);
    }

    console.log('📦 扩展程序路径:', extensionPath);

    // 启动浏览器
    const browser = await chromium.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });

    // 加载扩展程序
    const context = await browser.newContext({
        viewport: { width: 1280, height: 800 },
        permissions: ['clipboard-read', 'clipboard-write']
    });

    // 添加扩展程序
    const extensionId = await context.addExtensions([
        {
            path: extensionPath,
            name: '复制为 Markdown'
        }
    ]);

    console.log('✅ 扩展程序已加载, ID:', extensionId);

    const page = await context.newPage();

    // 打开测试页面
    const testPageUrl = 'file://' + path.resolve(__dirname, 'test-page.html');
    console.log('📄 打开测试页面:', testPageUrl);
    await page.goto(testPageUrl);
    await page.waitForLoadState('domcontentloaded');

    console.log('\n' + '='.repeat(60));
    console.log('🧪 Copy as Markdown 扩展程序功能测试');
    console.log('='.repeat(60) + '\n');

    // 测试结果记录
    const testResults = [];

    // 测试1：基础选中文本
    console.log('【测试1】基础选中文本');
    try {
        await page.selectText('#test1 p');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const text1 = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的文本:', text1);
        console.log('   结果: ✅ 通过\n');
        testResults.push({ test: '基础选中文本', status: '✅ 通过', detail: text1 });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '基础选中文本', status: '❌ 失败', detail: error.message });
    }

    // 测试2：粗体文本
    console.log('【测试2】粗体文本');
    try {
        await page.selectText('#test2 p:nth-of-type(1)');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const text2 = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的文本:', text2);
        const hasBold = text2.includes('**');
        console.log('   是否包含粗体标记:', hasBold ? '✅' : '❌');
        console.log('   结果:', hasBold ? '✅ 通过' : '❌ 失败', '\n');
        testResults.push({ test: '粗体文本', status: hasBold ? '✅ 通过' : '❌ 失败', detail: text2 });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '粗体文本', status: '❌ 失败', detail: error.message });
    }

    // 测试3：斜体文本
    console.log('【测试3】斜体文本');
    try {
        await page.selectText('#test2 p:nth-of-type(2)');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const text3 = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的文本:', text3);
        const hasItalic = text3.includes('_') || text3.includes('*');
        console.log('   是否包含斜体标记:', hasItalic ? '✅' : '❌');
        console.log('   结果:', hasItalic ? '✅ 通过' : '❌ 失败', '\n');
        testResults.push({ test: '斜体文本', status: hasItalic ? '✅ 通过' : '❌ 失败', detail: text3 });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '斜体文本', status: '❌ 失败', detail: error.message });
    }

    // 测试4：删除线
    console.log('【测试4】删除线文本');
    try {
        await page.selectText('#test2 p:nth-of-type(3)');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const text4 = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的文本:', text4);
        const hasStrike = text4.includes('~~');
        console.log('   是否包含删除线标记:', hasStrike ? '✅' : '❌');
        console.log('   结果:', hasStrike ? '✅ 通过' : '❌ 失败', '\n');
        testResults.push({ test: '删除线文本', status: hasStrike ? '✅ 通过' : '❌ 失败', detail: text4 });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '删除线文本', status: '❌ 失败', detail: error.message });
    }

    // 测试5：行内代码
    console.log('【测试5】行内代码');
    try {
        await page.selectText('#test2 p:nth-of-type(4)');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const text5 = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的文本:', text5);
        const hasCode = text5.includes('`');
        console.log('   是否包含代码标记:', hasCode ? '✅' : '❌');
        console.log('   结果:', hasCode ? '✅ 通过' : '❌ 失败', '\n');
        testResults.push({ test: '行内代码', status: hasCode ? '✅ 通过' : '❌ 失败', detail: text5 });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '行内代码', status: '❌ 失败', detail: error.message });
    }

    // 测试6：链接
    console.log('【测试6】链接复制');
    try {
        await page.click('#google-link', { button: 'right' });
        await page.waitForTimeout(500);

        // 查找右键菜单
        const menuItem = page.locator('text=将链接复制为 Markdown').first();
        if (await menuItem.isVisible({ timeout: 2000 })) {
            await menuItem.click();
            await page.waitForTimeout(500);
            const linkText = await page.evaluate(() => navigator.clipboard.readText());
            console.log('   复制的链接:', linkText);
            const hasLink = linkText.includes('[') && linkText.includes(']');
            console.log('   是否为Markdown链接格式:', hasLink ? '✅' : '❌');
            console.log('   结果:', hasLink ? '✅ 通过' : '❌ 失败', '\n');
            testResults.push({ test: '链接复制', status: hasLink ? '✅ 通过' : '❌ 失败', detail: linkText });
        } else {
            console.log('   右键菜单未显示或找不到菜单项');
            console.log('   结果: ⚠️ 菜单测试跳过\n');
            testResults.push({ test: '链接复制', status: '⚠️ 跳过', detail: '右键菜单未显示' });
        }
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '链接复制', status: '❌ 失败', detail: error.message });
    }

    // 测试7：图片
    console.log('【测试7】图片复制');
    try {
        await page.click('#test-image', { button: 'right' });
        await page.waitForTimeout(500);

        // 查找右键菜单
        const menuItem = page.locator('text=将图片复制为 Markdown').first();
        if (await menuItem.isVisible({ timeout: 2000 })) {
            await menuItem.click();
            await page.waitForTimeout(500);
            const imgText = await page.evaluate(() => navigator.clipboard.readText());
            console.log('   复制的图片:', imgText);
            const hasImg = imgText.includes('![') && imgText.includes('](');
            console.log('   是否为Markdown图片格式:', hasImg ? '✅' : '❌');
            console.log('   结果:', hasImg ? '✅ 通过' : '❌ 失败', '\n');
            testResults.push({ test: '图片复制', status: hasImg ? '✅ 通过' : '❌ 失败', detail: imgText });
        } else {
            console.log('   右键菜单未显示或找不到菜单项');
            console.log('   结果: ⚠️ 菜单测试跳过\n');
            testResults.push({ test: '图片复制', status: '⚠️ 跳过', detail: '右键菜单未显示' });
        }
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '图片复制', status: '❌ 失败', detail: error.message });
    }

    // 测试8：表格
    console.log('【测试8】表格转换');
    try {
        await page.selectText('#test-table');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const tableText = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的表格 (前150字符):', tableText.substring(0, 150));
        const hasTable = tableText.includes('|') && tableText.includes('---');
        console.log('   是否为Markdown表格格式:', hasTable ? '✅' : '❌');
        console.log('   结果:', hasTable ? '✅ 通过' : '❌ 失败', '\n');
        testResults.push({ test: '表格转换', status: hasTable ? '✅ 通过' : '❌ 失败', detail: tableText.substring(0, 200) });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '表格转换', status: '❌ 失败', detail: error.message });
    }

    // 测试9：代码块
    console.log('【测试9】代码块');
    try {
        await page.selectText('#test7 code');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const codeText = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的代码块:', codeText);
        const hasFencedCode = codeText.includes('```');
        console.log('   是否为围栏代码块格式:', hasFencedCode ? '✅' : '❌');
        console.log('   结果:', hasFencedCode ? '✅ 通过' : '❌ 失败', '\n');
        testResults.push({ test: '代码块', status: hasFencedCode ? '✅ 通过' : '❌ 失败', detail: codeText });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '代码块', status: '❌ 失败', detail: error.message });
    }

    // 测试10：列表
    console.log('【测试10】无序列表');
    try {
        await page.selectText('#test5 ul');
        await page.keyboard.press('Alt+X');
        await page.waitForTimeout(500);
        const listText = await page.evaluate(() => navigator.clipboard.readText());
        console.log('   复制的列表:', listText);
        const hasList = listText.includes('- ');
        console.log('   是否为Markdown列表格式:', hasList ? '✅' : '❌');
        console.log('   结果:', hasList ? '✅ 通过' : '❌ 失败', '\n');
        testResults.push({ test: '无序列表', status: hasList ? '✅ 通过' : '❌ 失败', detail: listText });
    } catch (error) {
        console.log('   结果: ❌ 失败 -', error.message, '\n');
        testResults.push({ test: '无序列表', status: '❌ 失败', detail: error.message });
    }

    // 输出测试总结
    console.log('='.repeat(60));
    console.log('📊 测试结果汇总');
    console.log('='.repeat(60));
    console.log(`总测试数: ${testResults.length}`);
    const passed = testResults.filter(t => t.status.includes('✅')).length;
    const failed = testResults.filter(t => t.status.includes('❌')).length;
    const skipped = testResults.filter(t => t.status.includes('⚠️')).length;
    console.log(`✅ 通过: ${passed}`);
    console.log(`❌ 失败: ${failed}`);
    console.log(`⚠️ 跳过: ${skipped}`);
    console.log('='.repeat(60) + '\n');

    // 保存测试结果
    const reportPath = path.resolve(__dirname, 'test-report.md');
    let report = '# Copy as Markdown 测试报告\n\n';
    report += `**测试时间**: ${new Date().toLocaleString('zh-CN')}\n\n`;
    report += '## 测试结果汇总\n\n';
    report += `- 总测试数: ${testResults.length}\n`;
    report += `- ✅ 通过: ${passed}\n`;
    report += `- ❌ 失败: ${failed}\n`;
    report += `- ⚠️ 跳过: ${skipped}\n\n`;
    report += '## 详细结果\n\n';

    testResults.forEach((result, index) => {
        report += `### ${index + 1}. ${result.test}\n\n`;
        report += `- **状态**: ${result.status}\n`;
        report += `- **结果**: \`\`\`\n${result.detail}\n\`\`\`\n\n`;
    });

    fs.writeFileSync(reportPath, report, 'utf8');
    console.log('📄 测试报告已保存到:', reportPath);

    console.log('\n💡 测试完成！浏览器窗口将保持打开以便查看。');
    console.log('按 Ctrl+C 退出...\n');

    // 防止脚本退出
    await new Promise(() => {});
})();
