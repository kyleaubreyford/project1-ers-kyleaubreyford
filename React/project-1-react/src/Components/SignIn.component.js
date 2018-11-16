import React from 'react';

export class SignInComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  passwordChange = (e) => {
    this.setState({
      ...this.state,
      password: e.target.value
    })
  }

  usernameChange = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value
    })
  }

  submit = (e) => {
    e.preventDefault();
    let cred = this.state;
    fetch('http://project1kyle-env.99qncmeu49.us-east-2.elasticbeanstalk.com/Project1/welcome/login', {
      method: 'POST',
      body: JSON.stringify(cred),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 210) {
          console.log(res);
          sessionStorage.setItem("username", this.state.username);
          this.props.history.push('/admin');

        } else if (res.status === 211) {
          console.log(res);
          sessionStorage.setItem("username", this.state.username);
          this.props.history.push('/home');

        }
      })
      .catch(err => {
        console.log(err);
      })
  }


  createButton = (e) => {
    this.props.history.push('/create');
  }


  render() {
    return (
      <>
        <div className="text-center signInBox">
          <form className="form-signin" onSubmit={this.submit}>
            <h1 className="h3 mb-3 font-weight-normal headerSignIn">Log in to ERS</h1>

            <label htmlFor="input-username" maxLength="50" className="sr-only">Username</label>
            <input type="text"
              id="input-username"
              placeholder="Username"
              required
              className="form-control"
              autoFocus
              value={this.state.username}
              onChange={this.usernameChange}
            />
            <br></br>
            <label htmlFor="inputPassword" maxLength="50" className="sr-only inputSize" >Password</label>
            <input type="password"
              id="inputPassword"
              placeholder="Password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.passwordChange} />
              <div className = "flexSpaceAround">
            <button className="btn btn-dark btn-sign-in"
              type="submit">
              Sign in
            </button>
            <button className="btn btn-dark btn-sign-in"
              onClick={this.createButton}>
              Create Account
           </button>
           </div>
          </form>
        </div>
      </>
    )
  }
}