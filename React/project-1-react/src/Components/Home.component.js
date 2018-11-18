import React from 'react';
import { SignOffComponent } from './SignOff.component';
import Project1Client from '../AxiosClients/Project1Client';
import { ReimbursementComponent } from './Reimbursement.component';

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
    Project1Client.get('home')
      .then(data => {
        console.log(data);
        this.setState({
          reimbursements: data.data
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
       <div  className="flexName">
            <table className="table-responsive-lg table table-lg table-dark table-trial" >
  
              <thead>
                <tr >
                  <th></th>
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
                    <ReimbursementComponent key={r.id} reimbursement={r} render={false}/>
                  )
                }
              </tbody>
            </table>
            </div>

      </>
    )
  }
}