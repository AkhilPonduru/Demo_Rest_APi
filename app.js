const express = require("express")
const app = express()
const fs = require('fs')

// This is a middleware used to convet the text into 
// required format precisely JSON Format
app.use(express.json())

// Here we are parsing the data which is in json format so that 
// javascript can understand it clearly
const tours = JSON.parse(
    fs.readFileSync("tours-simple.json")
)

//This method gives the list of available tours
app.get('/tours',(req,res)=>{
    res.status(200).json(tours)
})

//This method with an added endpoint gives us the required tour only
// as we are specifying it by adddig an id
app.get('/tours/:id',(req,res)=>{
    console.log(req.params)

    const time = req.params.id * 1 //This is to make id a number from string
    const toor = tours.find(el =>
        el.id === time //this is to compare the id in the given data 
                             //and to provide the required output 
    )
    res.status(200).json(toor)
})

// Here we are parsing the data which is in json format so that 
// javascript can understand it clearly
const users_list = JSON.parse(
    fs.readFileSync("users.json")
)

//This method gives the list of all available users
app.get('/users',(req,res)=>{
    res.status(200).json(users_list)    
})

//This method with an added endpoint gives us the required user only
// as we are specifying it by adddig an users name
app.get('/users/:name',(req,res)=>{
    console.log(req.params)

    const name = req.params.name //This is to make id a number from string
    const user = users_list.find(el =>
        el.name === name //this is to compare the id in the given data 
                             //and to provide the required output 
    )
    res.status(200).json(user)
})

app.post('/tours',(req,res)=>{
    const newid = tours[tours.length-1].id + 1
    const newone = Object.assign({id : newid},req.body)

    tours.push(newone)

    fs.writeFile("tours-simple.json",JSON.stringify(newone),err =>{
        res.status(201).json({
            status : "Success",
            data : newone
        })
    })
})

app.delete('/tours/:id',(req,res)=>{
    
    const time = req.params.id * 1

    const toor = tours.find(el =>
        el.id === time
    )
    if(!time){
        res.status(404).json({
            status :'Not Found'
        })
    }
    res.status(200).json({
        status : 'Success',
        data : null
    })
})

module.exports = app