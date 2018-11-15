import React from 'react';
import { ReimbursementComponent } from './Reimbursement.component';
import { FilterComponent } from './Filter.component';
import { SignOffComponent } from './SignOff.component';
import { LocationButtonComponent } from './LocationButton.component';
import { AppNav } from './Nav.component';

export class AdminComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reimbursements: [],
      filter: 'All'
    }
  }

  approve = (id) => {
    console.log(id);
    fetch('http://localhost:8080/Project1/admin/approve', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          ...this.state,
          reimbursements: data
        })
      }).catch(err => {
        console.log(err);
      })
  }

  reject = (id) => {
    console.log(id);
    fetch('http://localhost:8080/Project1/admin/reject', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          ...this.state,
          reimbursements: data
        })
      }).catch(err => {
        console.log(err);
      })
  }

  updateFilter = (e) => {
    this.setState({
      ...this.state,
      filter: e.target.value
    })
  }

  filterReimbursements() {
    if (this.state.filter === 'All') {
      return this.state.reimbursements.map(r =>
        <ReimbursementComponent key={r.id} reimbursement={r} approve={this.approve.bind(this)} reject={this.reject.bind(this)} />
      )
    } else if (this.state.filter === 'Pending') {
      return this.state.reimbursements.filter(word => word.status === 'pending').map(r =>
        <ReimbursementComponent key={r.id} reimbursement={r} approve={this.approve.bind(this)} reject={this.reject.bind(this)} />
      )
    } else if (this.state.filter === 'Completed') {
      return this.state.reimbursements.filter(word => word.status !== 'pending').map(r =>
        <ReimbursementComponent key={r.id} reimbursement={r} approve={this.approve.bind(this)} reject={this.reject.bind(this)} />
      )
    } else {
      console.log("No filter status found.")
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/Project1/admin', {
      credentials: 'include'
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          ...this.state,
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
         <LocationButtonComponent history={this.props.history} name={'Create A Reimbursement'} redirectURL={'admin/addReimbursement'}/>
         <FilterComponent key={'All'} value={'All'} updateFilter={this.updateFilter.bind(this)}/>
         <FilterComponent key={'Completed'} value={'Completed'} updateFilter={this.updateFilter.bind(this)}/>
         <FilterComponent key={'Pending'} value={'Pending'} updateFilter={this.updateFilter.bind(this)}/>
         <SignOffComponent history={this.props.history}/>
      </div >
      <div className ="tableHeader">Reimbursements
        <table className="table tableStyle scrollbar">
          <thead >
            <tr>
              <th></th>
              <th>Id</th>
              <th>Author</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Type</th>
              <th>Time Submitted</th>
              <th>Receipt</th>
              <th>Status</th>
              {this.state.filter !== 'Pending' ?
                <>
                  <th>Resolver</th>
                  <th>Time Resolved</th>
                </> : <></>
              }
            </tr>
          </thead>
          <tbody>
            {
              this.filterReimbursements()
            }
          </tbody>
        </table>
        </div>
      </>
    )
  }
}