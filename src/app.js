import express from 'express'
import path from 'path'
import hbs from 'hbs'
import { forecast } from './utils/forecast.js'
import { geocode } from './utils/geocode.js'

const app = express()
const publicDirPath = path.join(path.resolve(), '/public')
const viewsDirPath = path.join(path.resolve(), '/templates/views')
const partialsPath = path.join(path.resolve(), '/templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsDirPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Nimit Kalaria'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About HBS Page',
        name: 'Nimit Kalaria'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help HBS Page',
        name: 'Nimit Kalaria',
        helpText: 'This is some helpful text.'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nimit Kalaria',
        errorMessage: 'Help page not found.'
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        search: req.query.search,
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a address term.'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            res.send({
                error
            })
        } else {
            forecast(data.lat, data.long, (error, foreCastData) => {
                if (error) {
                    res.send({ error })
                } else {
                    res.send({ weather : foreCastData, location: data.location })
                }
            })
        }
    })
    // res.send({
    //     yourAddress: req.query.address
    // })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Nimit Kalaria'
    })
})

app.listen(3000, () => {
    console.log('Starting server on port 3000')
})