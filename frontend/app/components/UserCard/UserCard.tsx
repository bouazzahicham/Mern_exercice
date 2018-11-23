import * as React from 'react'
import { Card ,Button,Container,Divider,Icon} from 'semantic-ui-react'
import TableData from "../UserTable/TableData";
import DataTicker from "../../../../backend/modals/types/DataTicker";


export default class UserCard extends React.Component<any,any>
{
    constructor(props)
    {
        super(props)
        this.state = {
            volatilite : null


        }


    }

    componentDidMount()
    {
        this.props["client"]["socket"].on("updateClients",
            ({dataTicker} )=>{
            this.setState(
                    {
                        volatilite: dataTicker["volatilite"] ,
                        prix: dataTicker["apiTicker"]["last"]
                    })
            })

    }
    render()
    {
        let {client,time,deleteClient} = this.props
        let {volatilite ,prix} = this.state
        return (
            <Card.Group >

                <Card fluid   color='red' style={{"margin" : "20px 0 20px 0"}} >
                    <Card.Header>

                        <h3>{time}</h3>
                    </Card.Header>

                    <Card.Content>
                        <TableData client={client} volatilite={volatilite} prix={prix}/>
                    </Card.Content>
                    <Card.Meta textAlign={"right"} >
                        <Button
                            attached={true}
                            size={"small"}
                            circular
                            labelPosition={"right"}
                            floated={"right"}
                            compact={true}
                            icon={"cancel"}
                            color={"red"}
                            content={"Se déconnecter"}
                            onClick={() => {client &&  deleteClient(client)}}

                        />
                    </Card.Meta>
                </Card>

            </Card.Group>
        )
    }
}



