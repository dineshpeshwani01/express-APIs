const { response } = require('express');
const express =  require('express')
const app = express()
const port = 8080
const fs = require("fs")

app.use(express.json());

//let carInfo = {};

app.get('/' , (req, res) => {
    res.send("hello world!!")
})

app.get('/getday', (req , res) => {
    res.send("Today is Sunday")
} )

app.post("/createStudentRecord" , (req , res) => {
    console.log("request", req.body);
    
    res.send({"response": "Data received Successfully"});
});

app.post("/storeCarInfo", (req, res) => {
    console.log("request", req.body);
    fs.writeFile("carDetails.json", JSON.stringify(req.body),err => {
        if(err) throw err;
        console.log("Done Writing");
        res.status(200).send({response : "Data recied successfully"})
    })
    
})

app.get("/getCarInfo" , (req, res) => {
    fs.readFile("carDetails.json",function(err, data){
        if (err) throw err;
        const carInfo = JSON.parse(data)
        console.log("carInfo",carInfo)
        res.status(200).send(carInfo);
    })
})

app.put("/updateCarInfo" , (req , res) => {
    console.log("request", req.body);
    fs.readFile("carDetails.json",function(err, data){
        if (err) throw err;
        const carInfo = JSON.parse(data)
        carInfo.CarBrand = req.body.CarBrand;
        
        fs.writeFile("carDetails.json", JSON.stringify(carInfo),err => {
            if(err) throw err;
            console.log("Done Writing");
            res.status(200).send({"result":"Data Updated SuccessFully"});
        })
    })
})

app.delete('/deleteCarInfo' , (req, res) => {
    carInfo = {};
    fs.unlink(("carDetails.json"), function(err){
        if(err) return console.log(err);
        res.status(200).send({result : "Data Cleared SuccessFully"})
   });
});

app.listen(port,() => {
    console.log(`Example app Listening at http://localhost:${port}`)  
})