const http = require('http');
const fs = require('fs');
const qs = require('qs');

let users = [];

let server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('view/index.html', function(err, str) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(str);
            return res.end();
        });
    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            users.push(qs.parse(data));
            console.log(users);
            console.log('Register success!');
            
            fs.readFile('view/index.html','utf8', (err,datahtml)=>{
                if(err){
                    console.log(err);
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, () => {
    console.log('localhost8080');
})
