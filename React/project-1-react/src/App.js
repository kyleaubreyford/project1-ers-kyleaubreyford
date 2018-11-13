import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { SignInComponent } from './Components/SignIn.component';
import { HomeComponent } from './Components/Home.component';
import { CreateUserComponent } from './Components/CreateUser.component';
import { AdminComponent } from './Components/Admin.component';
import {AddReimbursement}  from './Components/AddReimbursement.component';
import history from './Components/History.component.js'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <div id="main-content-container"> 
            <Switch>
              <Route path="/Welcome" component={SignInComponent} />
              <Route path="/Home/AddReimbursement" render={(props) => <AddReimbursement {...props} name={'Return to Home Page'} redirectURL={'home'}/>} />
              <Route path="/Home" component={HomeComponent} />
              <Route path="/Create" component={CreateUserComponent} />
              <Route path="/Admin/AddReimbursement" render={(props) => <AddReimbursement {...props} name={'Return to Admin Page'} redirectURL={'admin'}/>} />
              <Route path="/Admin" component={AdminComponent} />
              {/* default */}
              <Route component={SignInComponent} />
            </Switch>
          </div>
        </>
      </BrowserRouter>
  
    );
  }
}

export default App;
