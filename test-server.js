const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT_DIR = __dirname;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
    let filePath = path.join(ROOT_DIR, req.url === '/' ? 'test-page.html' : req.url);

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 - 文件未找到</h1>');
            return;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   🧪 Copy as Markdown 测试服务器                         ║
║                                                          ║
║   测试页面: http://localhost:${PORT}/test-page.html          ║
║                                                          ║
║   使用方法:                                               ║
║   1. 在浏览器中打开上面的地址                            ║
║   2. 选中文字后按 Alt+X 或右键选择菜单项                 ║
║   3. 检查是否成功复制到剪贴板                           ║
║                                                          ║
║   按 Ctrl+C 停止服务器                                   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
    `);
});

process.on('SIGINT', () => {
    console.log('\n👋 服务器已停止');
    process.exit(0);
});
