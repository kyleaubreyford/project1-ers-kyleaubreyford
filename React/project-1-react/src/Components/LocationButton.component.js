import React from 'react';
export class LocationButtonComponent extends React.Component {

    render() {
        return(
        <button className="btn btn-dark btnStyle"
            onClick={()=> this.props.history.push('/'+this.props.redirectURL)}
            type='submit'>
            {this.props.name}
         </button>
        )

        //<Link to="/url">Navigate</Link> 
    }


}