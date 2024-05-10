const http = require('http');
const formidable = require('formidable');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            if (!files.file) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('No files were uploaded');
                return;
            }
            const oldPath = files.file.path;
            const newPath = `uploads/${files.file.name}`;
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('File uploaded successfully');
            });
        });
        return;
    }
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head><meta charset="UTF-8"><title>File Upload</title></head>
            <body><h2>Upload a File</h2>
            <form action="/" method="POST" enctype="multipart/form-data">
            <input type="file" name="file" required><br><br>
            <button type="submit">Upload</button></form></body></html>
        `);
        return;
    }
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
});

const port = 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));
