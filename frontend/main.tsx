import * as React from 'react'
import  {render} from 'react-dom'
import {BrowserRouter ,Route,Switch} from 'react-router-dom'
import MainApp from './app/index'
import "./style/design.css"



//hot reload for react  :
if ((module as any).hot)
    (module as any).hot.accept()




render(

    <BrowserRouter >
        <Switch>
            <Route path={"/"} component={(props)=><MainApp {...props}/> } />
        </Switch>
    </BrowserRouter>
    ,
    document.querySelector("div#app")

);
//