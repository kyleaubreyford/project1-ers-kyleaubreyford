import React from 'react';
import { SignOffComponent } from './SignOff.component';
import { AppNav } from './Nav.component';

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
    fetch('http://project1kyle-env.99qncmeu49.us-east-2.elasticbeanstalk.com/Project1/home', {
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          reimbursements: data
        })
      }).catch(err => {
        console.log(err);
        this.props.history.push('/welcome');
      });
  }

  render() {
    let obj = sessionStorage.getItem("username");
    console.log(obj);
    return (
      <>

       <div className="mainNav flexBoxNav navbar navbar-toggleable-md navbar-expand-lg display-front nav-pad flexBoxNav">
         <div className="welcomeDiv">Welcome {sessionStorage.getItem('username')}</div>
         <button className="btn btn-lg btnStyle"
              type="submit"
              onClick={this.createButton}>
              Create A Reimbursement
        </button>
        
            <SignOffComponent history={this.props.history} />
      </div >
       <div  className="tableHeader"> Available Reimbursement
            <table className="table tableHome scrollbar" >
  
              <thead>
                <tr >
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

      </>
    )
  }
}