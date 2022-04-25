var exec = require('ssh-exec');
var fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post("/results", (req, res) => {
	console.log(req.body["term"]);
        exec('python3 /home/anirudha_karanam_gmail_com/hw4/search1.py "' + req.body.term + '"', {
                user: 'anirudha_karanam_gmail_com',
                host: '10.128.0.8',
                key: fs.readFileSync('../.ssh/id_rsa')
        }, function (err, stdout, stderr) {
		console.log(stdout);
                var o = JSON.parse(stdout);
                console.log(o);
                toReturn = {"results": o}
                res.send(toReturn);
        });
});

app.post("/trends", (req, res) => {
       exec('python3 /home/anirudha_karanam_gmail_com/hw4/search4.py "' + req.body.term + '"', {
                user: 'anirudha_karanam_gmail_com',
                host: '10.128.0.8',
                key: fs.readFileSync('../.ssh/id_rsa')
        }, function (err, stdout, stderr) {
                var numClicks = parseInt(stdout);
                console.log(numClicks);
                toReturn = {"clicks": numClicks}
                res.send(toReturn);
        }); 
});

app.post("/popularity", (req, res) => {
       exec('python3 /home/anirudha_karanam_gmail_com/hw4/search2.py "' + req.body.url + '"', {
                user: 'anirudha_karanam_gmail_com',
                host: '10.128.0.8',
                key: fs.readFileSync('../.ssh/id_rsa')
        }, function (err, stdout, stderr) {
                var numClicks = parseInt(stdout);
                console.log(numClicks);
                toReturn = {"clicks": numClicks}
                res.send(toReturn);
        }); 
});

app.post("/getBestTerms", (req, res) => {
       exec('python3 /home/anirudha_karanam_gmail_com/hw4/search3.py "' + req.body.website + '"', {
                user: 'anirudha_karanam_gmail_com',
                host: '10.128.0.8',
                key: fs.readFileSync('../.ssh/id_rsa')
        }, function (err, stdout, stderr) {
                var new_input = stdout.replace(/'/g, '"');
                var o = JSON.parse(new_input);
                console.log(o);
		var toReturn = {"best_terms": o};
		res.send(toReturn);
        }); 
});

var http = require('http').Server(app);
const PORT = 80;
http.listen(PORT, function() {
        console.log('Listening on port ' + PORT + '...');
});
