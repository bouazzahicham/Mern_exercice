import {EventEmitter} from "events";
import DataTicker from "../types/DataTicker";
import axios from 'axios'
import {carreEcart, ecart, moyenneCarreEcart, moyenneVariation, variation, volatilite} from "./utils/utils";
const reinterval = require('reInterval')

export default class Volatilite extends EventEmitter
{
    //Couplage assez fort pour l'exercice
    public dataHistory: Array<DataTicker> = []
    private interloop

    constructor(private interval: number = 10 * 1000) {super()}

    start()
    {
        this.interloop = reinterval(() =>
        {

            axios.get("https://www.bitstamp.net/api/ticker/")
                .then((response) =>
                {
                    this.pushDataTicker(response)
                    this.updateClients(this.dataHistory.slice(-1)[0])
                    this.saveToMongo()
                })
                .catch((error) => {console.log(error);})



        }, this.interval);

        return this;


    }

    stop() {this.interloop.clear(); return this }

    private pushDataTicker(response)
    {
        let dataTicker: DataTicker = new DataTicker()

        //Aspect Fonctionnelle #TODO Encapsuler
        dataTicker.apiTicker = response.data


        dataTicker.variation = variation(response.data, this.dataHistory)
        dataTicker.moyenneVariation = moyenneVariation(response.data, this.dataHistory)


        dataTicker.ecart = ecart(dataTicker.moyenneVariation , this.dataHistory)

        dataTicker.carreEcart = carreEcart(dataTicker.ecart, this.dataHistory)

        dataTicker.moyenneCarreEcart = moyenneCarreEcart(dataTicker.carreEcart, this.dataHistory)

        dataTicker.volatilite = volatilite( dataTicker.moyenneCarreEcart, this.dataHistory)



        console.log(dataTicker);
        this.dataHistory.push(dataTicker)

    }

    private updateClients(dataTicker)
    {

        //Mise a jour des clients
        this.emit('updateClientManager',
            {
                "dataTicker": dataTicker
            })

    }
    private saveToMongo()
    {
    //    TODO: A implementer


    }


}