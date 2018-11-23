import {Response} from 'express'
import {MongoClient, Db , Cursor} from "mongodb";
import {URL_MONGODB} from "../../config/configuration";



export function saveData(name,jsonArray)
{
    MongoClient.connect(URL_MONGODB, function (err, client)
    {
        if (err) return -1;

        const ExerciceProject : Db = client.db("ExerciceProject");


        let collection = ExerciceProject.collection(name);
        if (collection !== null || typeof collection !== "undefined")
            collection.drop()

        ExerciceProject
            .createCollection(name)
            .then((collection)=>{
                collection.insertMany(jsonArray)
            })
            .catch((error)=>{
                console.log(error);
            })


    })



}
