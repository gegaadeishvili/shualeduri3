const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const expensesRouter = require('./routes/expenses')

const PORT = process.env.PORT || 3000
const DB_USERNAME = process.env.DB_USERNAME || 'GegaGeorgianHero'
const DB_PASSWORD = process.env.DB_USERNAME || 'PiF9uTZpxmkI9Rop'

const app = express()
const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main'  
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({extended: true}))

app.use(expensesRouter)

async function start(){
    try{
        await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@gegalab.krmvsiy.mongodb.net/expenses`) //?retryWrites=true&w=majority&appName=GegaLab
        app.listen(PORT, ()=> {
            console.log('Server has been started...')
        })
    }catch(e){
        console.log(e)
    }
}

start()