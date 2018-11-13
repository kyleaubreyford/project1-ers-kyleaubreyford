import React from 'react';

export class SignOffComponent extends React.Component {

    render() {
        return(
        <button className="btn btn-sm btn-dark"
            onClick={this.signOff}
            type='submit'>
            Sign Off
         </button>
        )
    }


    signOff = (e) => {
        this.props.history.push('/welcome');
    }
}