import React from 'react';
import { LocationButtonComponent } from './LocationButton.component';
import Project1Client from '../AxiosClients/Project1Client';

export class AddReimbursement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            description: '',
            receipt: '',
            type: 'LODGING'
        }
    }

    amountChange = (e) => {
        this.setState({
            ...this.state,
            amount: e.target.value
        })
    }

    descriptionChange = (e) => {
        this.setState({
            ...this.state,
            description: e.target.value
        })
    }

    receiptChange = (e) => {
        this.setState({
            ...this.state,
            receipt: e.target.value
        })
    }

    typeChange = (e) => {
        this.setState({
            ...this.state,
            type: e.target.value
        })
    }



    submit = (e) => {
        e.preventDefault();
        let reimbursementObject = this.state;
        Project1Client.post("admim/approve",reimbursementObject)
            .then(res => {
                console.log(res.status)
                if (res.status === 201) {
                    this.props.history.push(`/${this.props.redirectURL}`);

                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    returnHome = (e) => {
        this.props.history.push('/'+this.props.redirectURL);
    }



    render() {
        return (
            <>
                <form className="form-signin" onSubmit={this.submit}>
                    <h1 className="h3 mb-3 font-weight-normal">Create a new Reimbursement</h1>

                    <label>Description</label>
                    <input type="text"
                        id="input-description"
                        placeholder="Description"
                        required
                        maxLength="250"
                        value={this.state.description}
                        onChange={this.descriptionChange}
                    />
                    <label>Amount</label>
                    <input type="number"
                        id="inputNumber"
                        placeholder="Password"
                        required
                        maxLength="20"
                        value={this.state.amount}
                        onChange={this.amountChange} />

                    <label >Receipt</label>
                    <input type="text"
                        id="input-firstName"
                        placeholder="Receipt"
                        required
                        maxLength="250"
                        value={this.state.receipt}
                        onChange={this.receiptChange}
                    />

                    <label>Type: </label>
                    <select name="Types" onChange={this.typeChange}>
                        <option value="LODGING"> LODGING</option>
                        <option value="TRAVEL">TRAVEL</option>
                        <option value="FOOD">FOOD</option>
                        <option value="OTHER">OTHER</option>
                    </select>

                    <button className="btn btn-md btn-dark"
                        type="submit">
                        Create Reimbursement
                </button>
                </form>


                <LocationButtonComponent history={this.props.history} name={this.props.name} redirectURL={this.props.redirectURL}/>
                {/* <button className="btn btn-md btn-dark"
                    type="submit"
                    onClick={this.returnHome}>
                    Return to Home Page
                 </button> */}
            </>

        )
    }
}