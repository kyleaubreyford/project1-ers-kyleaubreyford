import React from 'react';
import Project1Client from '../AxiosClients/Project1Client';

export class CreateUserComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: ''
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

    firstnameChange = (e) => {
        this.setState({
            ...this.state,
            firstName: e.target.value
        })
    }

    lastnameChange = (e) => {
        this.setState({
            ...this.state,
            lastName: e.target.value
        })
    }

    emailChange = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value
        })
    }


 



    submit = (e) => {
        e.preventDefault();
        let cred = this.state;
        Project1Client.post("welcome/create",cred)
        .then(res => {
                if (res.status === 201) {
                    this.props.history.push('/welcome');

                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    returnWelcome = (e) => {
        this.props.history.push('/welcome');
    }



    render() {
        return (
            <>
              <div className = "text-center ">
                <form className="form-signin createReimbursementBox" onSubmit={this.submit}>
                    <h1 className="formHeader">Create an Account</h1>
                    <div className="formGroup formClass">
                    <label htmlFor="input-username" className="labelClass">Username</label>
                    <input type="text"
                        id="input-username"
                        className="form-control"
                        placeholder="Username"
                        required
                        maxLength="50"
                        value={this.state.username}
                        onChange={this.usernameChange}
                    />
                    </div>
                    <div className="formGroup formClass">
                    <label htmlFor="inputPassword" className="labelClass">Password</label>
                    <input type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required
                        maxLength="50"
                        value={this.state.password}
                        onChange={this.passwordChange} />
                    </div>
                    <div className="formGroup formClass">
                    <label htmlFor="input-firstName" className="labelClass">First Name</label>
                    <input type="text"
                        id="input-firstName"
                        className="form-control"
                        placeholder="First Name"
                        required
                        maxLength="100"
                        value={this.state.firstname}
                        onChange={this.firstnameChange}
                    />
                    </div>

                      <div className="formGroup formClass">
                    <label htmlFor="input-lastName" className="labelClass">Last Name</label>
                    <input type="text"
                        id="input-lastName"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        maxLength="100"
                        value={this.state.lastname}
                        onChange={this.lastnameChange}
                    />
                    </div>

                      <div className="formGroup formClass">
                    <label htmlFor="input-email" className="labelClass">Email</label>
                    <input type="email"
                        id="input-email"
                        className="form-control"
                        placeholder="Email@host.com"
                        required
                        maxLength="150"
                        value={this.state.email}
                        onChange={this.emailChange}
                    />
                    </div>
                    <div className="buttonMargin">
                    <button className="btn btn-primary  btn-lg active btnStyle buttonMarginRight"
                        type="submit">
                        Create Account
                    </button>

                    
                     <button className="btn btn-primary  btn-lg active btnStyle buttonMarginRight"
                          type="submit"
                          onClick={this.returnWelcome}>
                          Return to Welcome Page
                     </button>
                     </div>
                </form>

                 </div>
            </>

        )
    }
}