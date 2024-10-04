const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

// app.prepare().then(() => {  
//     server.listen(3000, (err) => {
//       if (err) throw err;
//       console.log('> Ready on http://localhost:3000');
//     });
//   });

//   server.get('/api/custom-route', (req, res) => {
//     res.json({ message: 'This is a custom API route.' });
//   });

  const path = require('path');
    server.use('/static', express.static(path.join(__dirname, 'static')));