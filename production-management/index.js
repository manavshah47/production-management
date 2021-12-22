const express = require('express');
const app = express();
const path = require('path');
const { request } = require('http');
const fs = require('fs');
const { truncate } = require("fs");
const mongoose = require("mongoose");
var XLSX = require("xlsx");

const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;


require("./conn");
const user = require("./form");
const user1 = require("./form1");
const user2 = require("./form2");
const user3 = require("./form3");
const user4 = require("./form4");
const userfinal = require("./formfinal");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));


app.set("view engine", "ejs");
const newitem = fs.readFileSync('./newitem.html');


app.get('/', (req, res) => {
    res.render("index");
});

app.post('/newitem',async(req, res) => {
    try {
        const Employee = new user({
            shallno: req.body.shallno,
            plan: req.body.plan,
            remark: req.body.remark
        })
        const saved = await Employee.save();
        res.redirect("/station1.ejs")
    } catch (error) {
        res.send(error);
    }
})


app.post('/station1',async (req, res) => {
    try {
        const Employee = new user1({
            shallno: req.body.shallno,
            plan: req.body.plan,
            remark: req.body.remark
        })
        const saved = await Employee.save();
        res.redirect("/station2.ejs")
    } catch (error) {
        res.send(error);
    }
    user.deleteOne({ shallno: req.body.shallno }, function(err) {
        if (!err) {
            console.log("removed to databse succesfully");
        }
        else {
            console.log(err);
        }
    });
})

app.post('/station2',async (req, res) => {
    try {
        const Employee = new user2({
            shallno: req.body.shallno,
            plan: req.body.plan,
            remark: req.body.remark
        })
        const saved = await Employee.save();
        res.redirect("/station3.ejs")
    } catch (error) {
        res.send(error);
    }
    user1.deleteOne({ shallno: req.body.shallno }, function(err) {
        if (!err) {
            console.log("removed to databse succesfully");
        }
        else {
            console.log(err);
        }
    });
})


app.post('/station3', async (req, res) => {
    console.log(req.body.shallno);
    console.log(req.body.plan);
    console.log(req.body.remark);

    try {
        const Employee = new user3({
            shallno: req.body.shallno,
            plan: req.body.plan,
            remark: req.body.remark
        })
        const saved = await Employee.save();
        res.redirect("/station4.ejs")
    } catch (error) {
        res.send(error);
    }
    user2.deleteOne({ shallno: req.body.shallno }, function(err) {
        if (!err) {
            console.log("removed to databse succesfully");
        }
        else {
            console.log(err);
        }
    });
})


app.post('/station4', async (req, res) => {

    try {
        const Employee = new user4({
            shallno: req.body.shallno,
            plan: req.body.plan,
            remark: req.body.remark
        })
        const saved = await Employee.save();
        res.redirect("/finalstation.ejs")
    } catch (error) {
        res.send(error);
    }
    user3.deleteOne({ shallno: req.body.shallno }, function(err) {
        if (!err) {
            console.log("removed to databse succesfully");
        }
        else {
            console.log(err);
        }
    });
})


app.post('/finalstation', async(req, res) => {
    user4.deleteOne({ shallno: req.body.shallno }, function(err) {
        if (!err) {
            console.log("removed to databse succesfully");
            res.redirect("/station1.ejs");
        }
        else {
            console.log(err);
        }
    });
});

app.get('/generatesheet/station1',async (req, res) => {
    var wb = XLSX.utils.book_new();
    user.find((err, data) => {
        if(err){
            console.log(err);
        } else {
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var now = new Date();
            var down = __dirname + '/station1-'+ now.getDate() + "-"+ now.getMonth() + "-" + now.getFullYear() +'.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,"sheet 1");
            XLSX.writeFile(wb,down);
            res.download(down);
        }
    });
});

app.get('/generatesheet/station2',async (req, res) => {
    var wb = XLSX.utils.book_new();
    user1.find((err, data) => {
        if(err){
            console.log(err);
        } else {
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var now = new Date();
            var down = __dirname + '/station2-'+ now.getDate() + "-"+ now.getMonth() + "-" + now.getFullYear() +'.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,"sheet 1");
            XLSX.writeFile(wb,down);
            res.download(down);
        }
    });
});

app.get('/generatesheet/station3',async (req, res) => {
    var wb = XLSX.utils.book_new();
    user2.find((err, data) => {
        if(err){
            console.log(err);
        } else {
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var now = new Date();
            var down = __dirname + '/station3-'+ now.getDate() + "-"+ now.getMonth() + "-" + now.getFullYear() +'.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,"sheet 1");
            XLSX.writeFile(wb,down);
            res.download(down);
        }
    });
});

app.get('/generatesheet/station4',async (req, res) => {
    var wb = XLSX.utils.book_new();
    user3.find((err, data) => {
        if(err){
            console.log(err);
        } else {
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var now = new Date();
            var down = __dirname + '/station4-'+ now.getDate() + "-"+ now.getMonth() + "-" + now.getFullYear() +'.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,"sheet 1");
            XLSX.writeFile(wb,down);
            res.download(down);
        }
    });
});

app.get('/generatesheet/finalstation',async (req, res) => {
    var wb = XLSX.utils.book_new();
    user4.find((err, data) => {
        if(err){
            console.log(err);
        } else {
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var now = new Date();
            var down = __dirname + '/finalstation-'+ now.getDate() + "-"+ now.getMonth() + "-" + now.getFullYear() +'.xlsx'
            XLSX.utils.book_append_sheet(wb,ws,"sheet 1");
            XLSX.writeFile(wb,down);
            res.download(down);
        }
    });
});


app.get('/station1.ejs', (req, res) => {
    user.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {

            res.render("station1", { records: data });
        };
    });
});

app.get('/station2.ejs', (req, res) => {
    user1.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("station2", { records: data });
        };
    });
});

app.get('/station3.ejs', (req, res) => {
    user2.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("station3", { records: data });
        };
    });
});

app.get('/station4.ejs', (req, res) => {
    user3.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("station4", { records: data });
        };
    });
});

app.get('/finalstation.ejs', (req, res) => {
    user4.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.render("finalstation", { records: data });
        };
    });
});

app.get('/newitem.html', (req, res) => {
    res.end(newitem);
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});