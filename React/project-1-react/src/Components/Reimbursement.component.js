import React from 'react';
import { ImageComponent } from './Image.component';

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
        <tr className={(this.props.reimbursement.status === 'pending') ? 'pendingStyle': (this.props.reimbursement.status === 'approved') ? 'approveStyle': 'rejectStyle'}>
        <td>
           {this.props.render ?this.renderButtons(this.props.reimbursement.status,this.props.reimbursement.id) : ""}
        </td>
        <td>{this.props.reimbursement.id}</td>
        {this.props.render ?<td>{this.props.reimbursement.authorusername}</td>:null}
        <td>{this.props.reimbursement.amount}</td>
        <td>{this.props.reimbursement.description}</td>
        <td>{this.props.reimbursement.type}</td>
        <td>{this.props.reimbursement.submitted}</td>
        <td>{(this.props !== null) ? (this.props.reimbursement.receipt !== null) ? (this.props.reimbursement.receipt !== "") ? <ImageComponent receipt={this.props.reimbursement.receipt}/> :"" : "" :""}</td>
        <td>{this.props.reimbursement.status}</td>
        <td>{this.props.reimbursement.resolverusername}</td>
        <td>{this.props.reimbursement.resolved}</td>
      </tr>
    )
  }
}