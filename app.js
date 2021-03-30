const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'))
app.use(cookieParser('siwonpassword'))
app.use(session())
app.use(express.json())
app.use(express.urlencoded({ extended : true}))



app.get('/', (req,res,next)=>{
    req.cookies
    res.cookie('name', 'siwon' ,{
        expires : new Date(),
        httpOnly: true,
        path:'/'
    })
    res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행')
})