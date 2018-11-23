import * as React from "react";

import 'semantic-ui-css/semantic.min.css'

import * as _moment from 'moment'
import {
    Icon,
    Menu,
    Container,
} from 'semantic-ui-react'

import {BrowserRouter, NavLink} from "react-router-dom";
import {Route, Switch} from "react-router";
import * as path from "path";
import MenuExercice from "./components/Pusher/MenuExercice";
import Exercice from "./components/Pushed/Exercice";

_moment.locale("fr")
 const MainApp = (props) =>
{

    return (<BrowserRouter>
        <div>
            <FixedBar {...props}/>
            <Switch>
                <Route component={() => <MenuExercice Body={Exercice}/>}
                       exact strict path={path.resolve(`${props.match.path}`)}/>

            </Switch>

        </div>
    </BrowserRouter>)
}
export default MainApp

const FixedBar = (props) => {

    return (

        <Container fluid style={{display: "block", "minHeight": "4.5vh"}}>
            <Menu fixed='top' widths={1} inverted color={"teal"} fitted={"true"} stretched={"true"}>
                <Menu.Item as={NavLink} exact to={path.resolve(`${props.match.url}`)} color={"blue"} position={"left"}>
                    <Icon className='home'/>
                    Calcul de volatilité
                </Menu.Item>

            </Menu>
        </Container>

    )
}




