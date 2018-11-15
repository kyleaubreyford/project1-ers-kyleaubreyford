import React from 'react';

export class FilterComponent extends React.Component {

    render() {
        return(
        <button className="btn btn-dark btnStyle"
            value={this.props.value}
            onClick={this.props.updateFilter}
            type='submit'>
        Filter by {this.props.value}
         </button>
        )
    }
}