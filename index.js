
//Import the express library

const express = require('express');

//Create an instance of express app

const app = express();

//Define a port number

const PORT = 5000;


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

