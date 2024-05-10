// Import required modules
const http = require('http');
const fs = require('fs');

// Create the server
const server = http.createServer((req, res) => {
    // Extract the URL and remove leading and trailing slashes
    const url = ""

    // Define content based on URL
    let content = '';
    if (url === 'about') {
        content = 'About page';
    } else if (url === 'contact') {
        content = 'Contact page';
    } else {
        content = 'Home page';
    }

    // Set response headers
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send the response
    res.end(content);
});

// Set the port
const port = 3000;

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
