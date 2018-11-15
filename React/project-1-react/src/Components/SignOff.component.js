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
        fetch('http://localhost:8080/Project1/logout', {
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