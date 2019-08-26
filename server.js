const express = require('express');
const bodyParser = require("body-parser");
let fs = require("fs");

const jsonParser = bodyParser.json();
const app = express();

app.get("/:name", function(req, res){

    const name = req.params.name;
    let data = fs.readFileSync("gamers.json", "utf8");
    let gamers = JSON.parse(data);
    let gamer = null;

    for(let i = 0; i < gamers.length; i++){
        if(gamers[i].name === name){
            gamer = gamers[i];
        }
    }

    if(gamer){
        res.send(JSON.stringify(gamer));
    }
    else{
        res.send();
    }
});

// получение отправленных данных
app.post("/", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    let userName = req.body.name;
    let fArray = req.body.fifteenArray;
    let gamer = {name: userName, fifteenArray: fArray};

    let data = fs.readFileSync("gamers.json", "utf8");
    let gamers = JSON.parse(data);

    gamers.push(gamer);
    data = JSON.stringify(gamers);
    fs.writeFileSync("gamers.json", data);
    res.send(gamer);
});

app.put("/", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);

    let userName = req.body.name;
    let fArray = req.body.fifteenArray;

    let data = fs.readFileSync("gamers.json", "utf8");
    let gamers = JSON.parse(data);
    let gamer;

    for(let i = 0; i < gamers.length; i++){
        if(gamers[i].name === userName){
            gamer = gamers[i];
        }
    }
    if(gamer){
        gamer.fifteenArray = fArray;
    }
    else{
        gamer = {name: userName, fifteenArray: fArray};
        gamers.push(gamer);
    }

    data = JSON.stringify(gamers);
    fs.writeFileSync("gamers.json", data);
    res.send(gamer.fifteenArray);
});

app.use(express.static('public'));
app.listen(3002);
