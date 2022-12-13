const Signer = require("./index");
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const signer = new Signer();
const start = new Date();

signer.init();

(async function main() {
    try {
    
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    
        app.post('/api/tt-sign', async function(req, res) {
            var url = "";
            const chunk = req.body.url;
            url += chunk;
            console.log("Native url:"+url);
            try {
                const sign = await signer.sign(url);
                const navigator = await signer.navigator();
                let output = JSON.stringify({status: "ok",data: {...sign,navigator: navigator,},});
                res.send(output);
                console.log(output);
            } catch (err) {
              console.error(err);
              }
    
        });
    await signer.close();
    } catch (err) {
      console.error(err);
      }
})();

app.listen(port);
console.log('Server started at http://localhost:' + port);