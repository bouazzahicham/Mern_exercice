import * as React from 'react'
import {Segment,Button} from "semantic-ui-react"
import 'react-notifications/lib/notifications.css';
import * as moment   from 'moment';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import UserCard from "../UserCard/UserCard";
import * as io from 'socket.io-client';
import { Input } from 'semantic-ui-react'
import autobind from "autobind-decorator";
import DataTicker from "../../../../backend/modals/types/DataTicker";


interface State
{

    nameToSubscribe : string ,
    sockioClients : Array<Object>

}

@autobind
export default class Exercice extends React.Component<any,State>
{
    SockioClient
    constructor(props)
    {
        super(props)
        this.state = {
            nameToSubscribe : "",
            sockioClients : []
        }

    }

    subscribeName()
    {
        // Toute la data qu'on veut envoyer vers le BackEnd
        const {nameToSubscribe} = this.state

        //Nouvelle socket pour chaque nom/id
        let socket = io("http://localhost:7000",{forceNew: true,reconnection: false})

        //Emission du nom ou une configuration particulière

        //Enregistrement dans la table des clients locales
        this.setState(previousState =>  ({
            sockioClients: previousState["sockioClients"].concat([
                {
                    name : nameToSubscribe ,
                    socket: socket,
                    time: moment().format("LLLL")
                }
            ])
        }))
        socket.emit("message",{name: nameToSubscribe})



    }
    onChangeInput(e,{value})
    {
        this.setState({nameToSubscribe: value})
    }

    deleteClient(clientToDelete)
    {

        this.setState((previousState)=>(
            {...previousState,
                sockioClients: previousState["sockioClients"].filter(
                    (client) =>
                    {
                        if (client["socket"]["id"] !== clientToDelete["socket"]["id"])
                            return true
                        client["socket"].disconnect()
                        return false
                    })
            }))



    }




render()
{

    const clients = this.state["sockioClients"]

    return(
        <Segment.Group style={{"textAlign" : "center"}} >

            <Input placeholder='Insérez le nom à enregistrer...'
                   style={{"width" : "20%","margin": "2px","textAlign" : "center"}}
                   onChange ={this.onChangeInput}
                   focus={true}  />

            <Button style={{"margin" : "10px"}} content={"Valider le nom"}
                    positive inverted onClick={this.subscribeName}   />

            {
                clients ? clients.map( (client , key) => (
                    <Segment key={key}><UserCard time={client["time"]}  deleteClient={this.deleteClient}  client={client}/></Segment>)) : null
            }

        </Segment.Group>

    )
}
}

