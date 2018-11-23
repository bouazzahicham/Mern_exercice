import path = require ('path')
import express = require('express')
import bodyParser = require('body-parser')
import moment = require('moment')

import {Application} from 'express'
import SocketioRouter from "./Routes/WebSocket/SocketioRouter";
import {config, PORT} from "./config/configuration";
import ClientManager from "./modals/ClientManager";
import Volatilite from "./modals/Volatilite/Volatilite";




//#Title:Internal
process.title = "node-chat"


//#Init Express
const app : Application  = express()


app.use(config)

//#Static:Express
app.use("/",express.static(__dirname + '/public'))

// app.use("/public/assets",express.static(__dirname + '/public'))



//#Middleware:External
app.use(bodyParser.json())



//#Routes
app.use("/api",SocketioRouter)



//#Listen:Express
const server = app.listen(PORT,()=>{console.log(`\n###\t Server listening on PORT : ${PORT}  \t### \n`)})


// Liste des clients connectés

new ClientManager(server)
    .attach(new Volatilite())
    .listenClients()
    .broadcastClients()







