const express = require('express');
const server = express();
const port = process.env.PORT || 4000;
const projectController = require('./data/controllers/projectController');

server.use(express.json());
server.use('/api/projects', projectController);

server.get('/', (req, res) => {
    res.send({Success: "sanity check..."})
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})