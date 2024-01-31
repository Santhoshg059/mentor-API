import express from 'express'
const app = express()
import dotenv from "dotenv"
const PORT = process.env.PORT || 3000
import connect from './database/connect.js'
import AppRouter from './routers/router.js'

dotenv.config();
app.use(express.json())
app.use('/',AppRouter)

app.get('/', (req,res)=>{
    res.status(200).send("Welcome to the Mentor - Student API ")
})

app.get('/mentor', (req,res)=>{
    res.status(200).send("Welcome to the Mentor Page ")
})



connect().then(()=>{
    try{
        app.listen(PORT, ()=>console.log(`App is listening at ${PORT}`))
    }
    catch (error){
        console.log('Server Connection Unsuccessful')

    }
}).catch((error)=>console.log('Database connection Error'))