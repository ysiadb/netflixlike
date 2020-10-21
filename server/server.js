const express = require("express");
let app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
let fs = require('fs');
var md5 = require('md5');

let keyD=""
let keyA="1ae3dc8f5b19"
let key=keyA

app.use(bodyParser.json({limit: '50mb'}));

//LOGIN
app.post('/login/:loge/:password', async function(req, res) {
    // console.log(req.params.loge)
    // console.log(req.params.password)
    try {
    await axios.post('https://api.betaseries.com/members/auth?login='+req.params.loge+'&password='+md5(req.params.password)+'&client_id='+key)
    .then(resp => {
        // console.log(resp.data,"yoooo");
        res.setHeader('Access-Control-Allow-Origin','http://localhost:3000')
        res.send(resp.data);
    })
    }catch (error) {
        console.log(error.response.data,'teeeeeest');
        res.send('echec');
    }
})

app.listen(4242, function (err) {
    if (err) {
		console.log(err);
	} else {
		console.log(`server listening on http://localhost:4242`);
    }
})