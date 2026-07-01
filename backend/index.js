// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.end("I create my first server");
    
// })

// const port = 3000;
// server.listen(port, ()=> {
//     console.log(`Server is listening my ${port}`);
    
// })

// const express = require('express');
// const app = express();

// app.use(express.json()); //Middleware

// const arr = [{
//     name: 'shrasti',
//     age: 23,
// }]

// let new_id = 4;

// let data = [
//     {id: 1, name: 'Shreya', age:20},
//     {id: 2, name: 'Amit', age:25},
//     {id:3, name: 'Anuj', age:35},
// ]

// app.get('/data', (req, res) => {
    
//     res.json({
//         status: "success",
//         data: data,
//         count: data.length,
//     })
// });

// app.post('/data', (req, res)=>{
    
// })

// app.listen(4000, () => {
//     console.log("server is running")
// })

// app.get('/', (req, res) => {

// })

// const mongoose = require("mongoose");

// mongoose.connect("mongodb://shrastichaudhry737:shrasti12@ac-7x2gxub-shard-00-00.xthqoeb.mongodb.net:27017,ac-7x2gxub-shard-00-01.xthqoeb.mongodb.net:27017,ac-7x2gxub-shard-00-02.xthqoeb.mongodb.net:27017/?ssl=true&replicaSet=atlas-fvx4bt-shard-0&authSource=admin&appName=shrasti")
//         .then(()=>{
//             console.log("Connected")
//         }).catch((error)=>{
//             console.log("Error aagya", error.message)
//         }
//         )

// POST API
const createRegistration = async (req , res) => {
    try {
        const {firstName, lastName, email, school, grade} = req.body;

        if(!firstName || !lastName || !email || !school || !grade){
            return res.status(400).json({
                status : "failed" ,
                message : "All fields are required"
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(emailRegex.test(email)){
            res.status(400).json({
               status: "fail",
               message: "Invalid format of email" 
            })
        }

        const newRegistration = new Registration(
            {firstName, lastName, email, school, grade}
        )

        await newRegistration.save();
        
        res.status(201).json({
            status: "success",
            message: "You join successfully"
        })
    } catch(error) {
        // if(emailRegex.test(email)){
        //     return res.status(400).json({
        //         status: "Failed"
        //         message: "Invalid format of email"
        //     })
        // }

        return res.status(500).json({
            status: "failed",
            message: `some error occur ${error}`
        })
    }
}
