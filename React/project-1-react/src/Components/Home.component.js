import React from 'react';
import { SignOffComponent } from './SignOff.component';

export class HomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reimbursements: []
    }
  }

  createButton = (e) => {
    this.props.history.push('/home/addReimbursement');
  }

  componentDidMount() {
    fetch('http://localhost:8080/Project1/home', {
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          reimbursements: data
        })
      });
  }

  render() {
    let obj = sessionStorage.getItem("username");
    console.log(obj);
    return (
      <>
        <div className="container-fluid">
          
        <div className="row">
        <button className="btn btn-sm btn-dark"
            type="submit"
            onClick={this.createButton}>
            Create A Reimbursement
        </button>

         <SignOffComponent history={this.props.history}/>

        </div>




          <div className="row">
            <h1>Avaliable Reimbursements</h1>
            <table className="table table-striped table-dark"> 
          <thead>
            <tr>
              <th>Id</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Type</th>
              <th>Time Submitted</th>
              <th>Receipt</th>
              <th>Status</th>
              <th>Resolver</th>
              <th>Time Resolved</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.reimbursements.map(r =>
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.amount}</td>
                  <td>{r.description}</td>
                  <td>{r.type}</td>
                  <td>{r.submitted}</td>
                  <td>{r.receipt}</td>
                  <td>{r.status}</td>
                  <td>{r.resolverusername}</td>
                  <td>{r.resolved}</td>
                </tr>
              )
            }
          </tbody>
        </table>


             
          </div>
        </div>

      </>
    )
  }
}