# how to made  http_server_node_js


```
const http = require('http');
const fs = require('fs');
const path = require('path')
const { parse } = require('querystring');
const PORT = 3000;
const HOST = "192.168.0.124";

const createPath = (page) => path.resolve(__dirname, 'page', `${page}.html`)

const server = http.createServer((require, response) => {
    console.log('Server request');
    console.log(require.url, require.method)

    let basePath = '';
    switch (require.url) {
        case '/':
            basePath = createPath('index');
            response.statusCode = 200;
            break;
        case '/main':
            basePath = createPath('main');
            response.statusCode = 200;
            break;
        case '/redirect':
            response.statusCode = 301;
            response.setHeader('Location', 'main')
            response.end();
            break;
        default:
            basePath = createPath('errors');
            response.statusCode = 404;
            break;
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log(err);
            response.statusCode = 500;
            response.end();
        }
        else {
            response.write(data);
            response.end();
        }
    })

})


server.listen(PORT, HOST, (error) => {
    error ? console.log(error) : console.log(`server listening port ${PORT}`)
})

```
