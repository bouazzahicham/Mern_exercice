
import * as React from "react"
import axios from 'axios'
import {Sidebar, Menu, Segment,Header,Icon} from "semantic-ui-react"
import autobind from "autobind-decorator";



@autobind
export default class MenuExercice extends React.Component<any,any>
{
    constructor(props)
    {
        super(props)
        this.state = {visible: false}
    }


    mouseEnter(event)
    {
        this.setState({visible: true});

    }
    mouseLeave(event)
    {
        this.setState({visible: false});

    }

    downloadData()
    {
        console.log("Je suis bien la : DownloadData");
    }
    render()
    {
        const {Body } = this.props ;
        const {visible} = this.state

        console.log(visible);
        return (
            <Sidebar.Pushable as={Segment} className={"mainLayout"} >
                <div id={"detectSidebar"}  onMouseEnter={this.mouseEnter} />
                <Sidebar   as={Menu} animation='push' width='thin' visible={visible} icon='labeled' vertical    className={"Sidebar"}>
                    <Menu.Item name='home'  >
                        <Header color={"teal"} size={"small"} dividing>
                            Menu
                        </Header>
                    </Menu.Item>

                    <Menu.Item  onClick={this.downloadData} name='Download'  style={{"padding":"15px","marginLeft":"-6px","position":"fixed","bottom":"0px"}} >
                        <Icon name='download' color={"teal"} disabled={true}/> Télécharger résultat </Menu.Item>

                </Sidebar>

                <Sidebar.Pusher onMouseEnter={this.mouseLeave}  style={{ minHeight: '95vh' }}>
                    <Segment >
                        {Body  === undefined ? null : <Body/> }
                    </Segment>
                </Sidebar.Pusher>

            </Sidebar.Pushable>)
    }
}
