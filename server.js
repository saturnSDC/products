const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.get('/', (req,res) => {
    res.send('please reference the API docs to get started');
});
app.post('/', (req, res) => {
    return res.send('post request received!');
});

app.listen(port, () => {
    console.log(`SDC LISTENING ON PORT ${port}...`);
})