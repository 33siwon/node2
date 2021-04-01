const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const userRouter = require('./routes/user')
const app = express()

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(cookieParser('process.env.COOKIE_SECRET'))
app.use(session(
    {resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie:{
    httpOnly : true,
}}
))
app.use(express.json())
app.use(express.urlencoded({ extended : true}))


app.get('/', (req,res,next)=>{
    req.cookies
    res.cookie('name', 'siwon' ,{
        expires : new Date(),
        httpOnly: true,
        path:'/'
    })
    res.sendFile(path.join(__dirname,'multipart.html'))
})

app.use('/user', userRouter)


app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행')
})