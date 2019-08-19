const express = require('express');
const server = express();
const port = process.env.PORT || 4000;
server.use(express.json());

server.get('/', (req, res) => {
    res.send({Success: "sanity check..."})
})

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})