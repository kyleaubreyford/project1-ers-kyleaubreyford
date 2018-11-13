import React from 'react';

export class FilterComponent extends React.Component {

    render() {
        return(
        <button className="btn btn-sm btn-dark"
            value={this.props.value}
            onClick={this.props.updateFilter}
            type='submit'>
        Filter by {this.props.value}
         </button>
        )
    }
}