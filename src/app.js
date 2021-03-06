const path = require('path')
const express = require("express")
const hbs = require("hbs")
const gecode = require('./util/gecode')
const forcast = require('./util/forcast')



const app = express()
const port = process.env.PORT || 3000

// Define path for express config 

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res)=>{
    res.render('index', {
        title:"Weather",
        name: "Sanjay"        
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:"About me",
        name:"Sanjay"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText:"This is some helpful text.",
        title:"Help",
        name:"Sanjay"
    })
})


app.get('/weather', (req,res)=>{

    if (!req.query.address){
        return res.send({error:'You must provide address term!'})
    }

    gecode(req.query.address, (error, { latittude, longitude,location } = {}) => {
        if (error) {
            return res.send(error);
        }

        forcast(latittude,longitude, (error, forcastData) => {
            if (error) {
                return console.log(error);
            }

            res.send({
                forcastData:forcastData,
                location,
                address:req.query.address
            })

        })

    })
})

app.get('/products', (req,res)=>{

    if (!req.query.search){
         return res.send('You must proovid search term');

    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title:'404',
        name:'Sanjay',
        errorMessage:'Help article not found!'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title:'404',
        name:'Sanjay',
        errorMessage: 'Page not found.'

    })

})

app.listen(port, ()=>{
    console.log('Server is up on port' + port);
})