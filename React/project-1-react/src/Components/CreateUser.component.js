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
                <form className="form-signin" onSubmit={this.submit}>
                    <h1 className="h3 mb-3 font-weight-normal">Create an Account</h1>

                    <label htmlFor="input-username" className="sr-only">Username</label>
                    <input type="text"
                        id="input-username"
                        className="form-control"
                        placeholder="Username"
                        required
                        maxLength="50"
                        value={this.state.username}
                        onChange={this.usernameChange}
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required
                        maxLength="50"
                        value={this.state.password}
                        onChange={this.passwordChange} />

                    <label htmlFor="input-firstName" className="sr-only">First Name</label>
                    <input type="text"
                        id="input-firstName"
                        className="form-control"
                        placeholder="First Name"
                        required
                        maxLength="100"
                        value={this.state.firstname}
                        onChange={this.firstnameChange}
                    />

                    <label htmlFor="input-lastName" className="sr-only">Last Name</label>
                    <input type="text"
                        id="input-lastName"
                        className="form-control"
                        placeholder="Last Name"
                        required
                        maxLength="100"
                        value={this.state.lastname}
                        onChange={this.lastnameChange}
                    />

                    <label htmlFor="input-email" className="sr-only">Email</label>
                    <input type="email"
                        id="input-email"
                        className="form-control"
                        placeholder="Email"
                        required
                        maxLength="150"
                        value={this.state.email}
                        onChange={this.emailChange}
                    />


                    <button className="btn btn-lg btn-primary btn-block"
                        type="submit">
                        Create Account
        </button>
                </form>


                <button className="btn btn-lg btn-primary btn-block"
                    type="submit"
                    onClick={this.returnWelcome}>
                    Return to Welcome Page
                 </button>
            </>

        )
    }
}