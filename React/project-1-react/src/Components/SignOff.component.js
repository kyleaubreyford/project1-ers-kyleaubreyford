import React from 'react';
import Project1Client from '../AxiosClients/Project1Client';

export class SignOffComponent extends React.Component {

    render() {
        return(
        <button className="btn btnStyle btn-dark"
            onClick={this.signOff}
            type='submit'>
            Sign Off
         </button>
        )
    }


    signOff = (e) => {
        e.preventDefault();
        Project1Client.get("Logout")
          .then(res => {
            
              sessionStorage.clear();
              this.props.history.push('/welcome');
          })
          .catch(err => {
            console.log(err);
          })
    }
}