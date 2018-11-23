import Client from "./types/Client";
import {Server as HttpServer} from "http";
import Volatilite from "./Volatilite/Volatilite";
const io = require('socket.io');

export default class ClientManager
{
    private clients : Array<Client> = []
    private history  : Array<Object> = []
    private serverSocket
    private calculVolatilite : Volatilite

    constructor(server : HttpServer, origins :  string[] | string  = ["http://localhost:7000"] )
    {
        this.serverSocket  = new io(server)
        this.serverSocket.origins(origins)

    }

    //Gestion des messages
    listenClients()
    {

        this.serverSocket.on('connection', (socket ) =>
        {
            const clientToPush : Client = new Client()

            //Enregistrement de l'id Socket
            clientToPush.socket = socket

            console.log("Connection établie le  " + new Date());
            console.log(`\t\t Socket d'id  : ${socket.id}\n\n`);

            //Enregistrement du nom
            socket.on('message',(message) => message["name"] && (clientToPush["name"] = message["name"]) && this.addClient(clientToPush))


            //Gestion de la deconnexion
            socket.on('disconnect',(reason) => {
                this.removeClient(socket.id)
                console.log(`Fermeture pour : \t ${reason}`);
            })
        })
        return this ;


    }

    attach(volatilite : Volatilite)
    {
        this.calculVolatilite = volatilite
        this.calculVolatilite.start()
        return this ;


    }

    broadcastClients()
    {
        this.calculVolatilite.on('updateClientManager',
            (data ) => {
            this.clients.forEach((client)=>{
                console.log(data)
                ;
                client["socket"].emit('updateClients',{
                    dataTicker : data["dataTicker"]
                })
            })

            })
        return this

    }
    private addClient(client : Client)
    {

        this.clients.push(client)

    }
    private removeClient(socketId)
    {
        //Checker si unicité pour ne pas boucler sur toute l'array
        this.clients.forEach( (client,index) => (client["socket"]["id"] === socketId && this.clients.splice(index)))

    }



}