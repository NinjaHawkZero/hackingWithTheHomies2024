# hwthdc2024
API Development
---

Step 1: Download Node JS and Postman Desktop Agent

- https://nodejs.org/en/download/current
- https://www.postman.com/downloads/postman-agent/
- Make a Postman account


Step 2: Create new folder and initialize app inside directory

-npm init from inside folder


Step 3: Create express app

-install express with npm i express --save

-create index.js file, this will be the main entry file for the app

-import express into index.js file and include the following code

```
const express = require("express")
const app = express() // creates express app


const PORT = 3001


// Parse incoming json
app.use(express.json())

// This tends server to listen requests at specific port
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
}) 
```

Step 4: Create file JSON file for student data.

```
const Students = [{name: 'John', age: 25, id: 123}, {name: 'Jane', age: 24, id: 124}, {name: 'Jack', age: 26, id: 125}]


module.exports = Students;

```

Step 5: Import Students into index.js file and write routes

```


//Import the express library

const express = require('express');

//Create an instance of express app

const app = express();

//Define a port number

const PORT = 3001;


// parse application/json

app.use(express.json())

//Imported the studentJSON file

const Students = require('./studentJSON');

//Sets up server to listen to requests at the specified port (3001)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
});




//Serves get request @ "/" and sends a response "WHAT UP DOE!?

app.get('/' , (req, res) => {

    try {
        res.status(200).send('WHAT UP DOE!?')
    } catch(error) {
        res.status(500).json({message: error.message})
    }
    
});




//Serves get request @ "/students" and sends a response of the Students array

app.get('/students', (req, res) => {

    try {
        res.status(200).json(Students)
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
});




//Serves get request @ "/students/:id" and sends a response of the student with the specified id

app.get('/students/:id', (req, res) => {
try{
    let id = req.params.id;

    let student = Students.filter(student => student.id == id);

    if(student.length > 0){

    res.status(200).json(student[0])}

    else {
        res.status(404).json({message: "Student not found"})
    }
} 
catch(error) {
    res.status(500).json({message: error.message})}
});




//Serves post request @ "/students/addStudent" and adds a new student to the Students array

app.post('/students/addStudent', (req, res) => {
    
    try {
        let newStudent = req.body;
        Students.push(newStudent)
        res.status(201).json(Students)
    }
    catch(error) {

    res.status(500).json({message: error.message})}

});




//Serves delete request @ "/students/deleteStudent/:id" and deletes the student with the specified id

app.delete('/students/deleteStudent/:id', (req, res) => {


try {

    let id = req.params.id;
    let filteredArr = Students.filter(student => student.id != id);
    Students = filteredArr;

    res.status(200).json(Students)}

    catch(error) {
        res.status(500).json({message: error.message})
    
    }

});




//Serves put request @ "/students/editStudent/:id" and updates the student with the specified id

app.put('/students/editStudent/:id', (req, res) => {

try{

    let id = req.params.id;
    let updatedStudent = req.body;

    let student = Students.filter(student => student.id == id);

    if(student.length > 0){
        student[0].name = updatedStudent.name;
        student[0].age = updatedStudent.age;
        res.status(200).json(student[0])
    }
    else {
        res.status(404).json({message: "Student not found"})
    }}

    catch(error)    {
        res.status(500).json({message: error.message})
    }
});
```
