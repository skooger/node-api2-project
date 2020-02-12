const express = require('express');

//routers
const blogRouter = require('./routers/blogRouter.js');
const server = express();

server.use(express.json());

server.use('/api/posts', blogRouter);

const port = 3000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));