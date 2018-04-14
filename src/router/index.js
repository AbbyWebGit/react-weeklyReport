import React from 'react';
import {Switch,Route,BrowserRouter  } from 'react-router-dom'

import Index from '../contents/Index/index'
import Detail from '../contents/Detail/detail'
import Login from '../contents/Login/login'


const Main = () =>(
    <BrowserRouter>
      {/* <HashRouter>  */}
 
        <Switch>
        
            <Route exact path='/' component={Index}/>
            <Route exact path='/index' component={Index}/>
            <Route exact path='/detail' component={Detail}/>
            <Route exact path='/login' component={Login}/>
       
        </Switch>

      {/* </HashRouter>   */}
    </BrowserRouter>
)

export default Main