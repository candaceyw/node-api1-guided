const express = require("express")
const db = require("./database.js")

// creates our server instance
const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "hello, world2" })
})

// read(get) users
server.get("/users", (req, res) => {
    const users = db.getUsers()
    res.json(users)
})

// read(get) user by Id
server.get("/users/:id", (req, res) => {
    const userId = req.params.id
    const user = db.getUserById(userId)

user ? res.json(user) : res.status(404).json({ message: "user not found"})

    // if (user) {
    //     res.json(user)
    // } else {
    //     res.status(404).json({
    //         message: "User not found",
    //     })
    // }


})

// create a new user
server.post("/users", (req, res) => {
   if (!req.body.name){
    return res.status(400).json({ 
        message: 'Need a user name!',
    })
    
   }  
    const newUser = db.createUser({
        name: req.body.name,
    })

    res.status(201).json(newUser)
})

server.listen(8080, () => {
    console.log("server started at port 8080")
})

// update user
server.put('/users/:id', (req, res) => {
   const user = db.getUserById(req.params.id)

   if(user) {
       const updatedUser = db.updateUser(user.id, {
           name: req.body.name || user.name,
       })

       res.json(updatedUser)
   } else { 
   res.status(404).json({ message: "user not found"})
   }
})

// delete user
server.delete('/users/:id', (req, res) => {
    const user = db.getUserById(req.params.id)

    if(user) {
        db.deleteUser(user.id)
        //204 is just a successful empty response
        res.status(204).end()
    } else {
        res.status(404).json({ message: "user not found"})

    }
})


// const http = require("http")

// const server = http.createServer((req, res) => {
//     // a status code of 200 means a successful response, no issues
//     res.statusCode = 200

//     // tell the browser, or the client, that we're sending back some JSON
//     res.setHeader("Content-Type", "application/json")

//     // the client is now expecting some JSON, set it out
//     res.write(JSON.stringify({ message: "hello, world" }))

//     // send the response off
//     res.end()
// })

// server.listen(8080, () => {
//     console.log("server started at port 8080")
// })