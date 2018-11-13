import React from 'react';

export class ReimbursementComponent extends React.PureComponent {

    renderButtons(value,id) {
        let input;
        if (value === 'pending') {
          input = <>  
          <span>
            <button className="btn btn-sm btn-success"
              type="submit"
              onClick={() => this.props.approve(id)}>
              A
            </button>
            <button className="btn btn-sm btn-danger"
              type="submit"
              onClick={() => this.props.reject(id)}>
              R 
          </button>
          </span>
          </>;
    
          return input;
        }
      }
    



  render() {
    return (
        <tr>
        <td>
           {this.renderButtons(this.props.reimbursement.status,this.props.reimbursement.id)}
        </td>
        <td>{this.props.reimbursement.id}</td>
        <td>{this.props.reimbursement.authorusername}</td>
        <td>{this.props.reimbursement.amount}</td>
        <td>{this.props.reimbursement.description}</td>
        <td>{this.props.reimbursement.type}</td>
        <td>{this.props.reimbursement.submitted}</td>
        <td>{this.props.reimbursement.receipt}</td>
        <td>{this.props.reimbursement.status}</td>
        <td>{this.props.reimbursement.resolverusername}</td>
        <td>{this.props.reimbursement.resolved}</td>
      </tr>
    )
  }
}