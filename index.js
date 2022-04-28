const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("hello");
});

app.listen(3001, () => {
    console.log("dang chay tren port 3001 - http://localhost:3001/");
});