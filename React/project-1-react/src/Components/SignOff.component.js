import React from 'react';

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
        fetch('http://project1kyle-env.99qncmeu49.us-east-2.elasticbeanstalk.com/Project1/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
          .then(res => {
            
              sessionStorage.clear();
              this.props.history.push('/welcome');
          })
          .catch(err => {
            console.log(err);
          })
    }
}