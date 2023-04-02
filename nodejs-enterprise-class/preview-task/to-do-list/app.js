const http = require('http');
const url = require('url');
const { v4: uuidv4 } = require('uuid');

const port = 3005;
const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET, OPTIONS, DELETE',
    'Content-Type': 'application/json'
};

const todos = [
    { title: '今天要刷牙', id: uuidv4() }
];

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const reqMethod = req.method;

    if (reqMethod === 'GET' && reqUrl.pathname === '/todos') {
        res.writeHead(200, headers);
        res.end(JSON.stringify({ status: 'success', data: todos }));
    } else if (reqMethod === 'POST' && reqUrl.pathname === '/todos') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newTodo = JSON.parse(body);
            newTodo.id = uuidv4();
            todos.push(newTodo);
            res.writeHead(200, headers);
            res.end(JSON.stringify({ status: 'success', data: newTodo }));
        });
    } else if (reqMethod === 'PATCH' && reqUrl.pathname.startsWith('/todos/')) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedTodo = JSON.parse(body);
            // 從 URL 中獲取 ID 識別符號
            const id = reqUrl.pathname.split('/')[2]
            const index = todos.findIndex(todo => todo.id === id);
            if (index !== -1) {
                todos[index] = { ...todos[index], ...updatedTodo };
                res.writeHead(200, headers);
                res.end(JSON.stringify({ status: 'success', data: todos[index] }));
            } else {
                res.writeHead(404, headers);
                res.end(JSON.stringify({ status: 'false', message: '無此網站路由或id' }));
            }
        });
    } else if (reqMethod === 'DELETE' && reqUrl.pathname.startsWith('/todos/')) {
        // 從 URL 中獲取 ID 識別符號
        const id = reqUrl.pathname.split('/')[2]
        // 根據 ID 刪除對應的待辦事項
        const index = todos.findIndex(todo => todo.id === id)
        if (index !== -1) {
            todos.splice(index, 1)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 'success', data: todos }))
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ status: 'false', message: '無此網站路由或id' }))
        }
    } else if (reqMethod === 'OPTIONS') {
        res.writeHead(200, headers);
        res.end();
    } else {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ status: 'false', message: '無此網站路由或id' }));
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});