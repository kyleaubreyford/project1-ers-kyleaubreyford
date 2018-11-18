import React from 'react';
import { LocationButtonComponent } from './LocationButton.component';
import Project1Client from '../AxiosClients/Project1Client';

export class AddReimbursement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            description: '',
            receipt: "empty",
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
            receipt: e.target.result
        })
    }

    typeChange = (e) => {
        this.setState({
            ...this.state,
            type: e.target.value
        })
    }

   
    handleFileChosen = (file) => {
        let fileReader = new FileReader();
        fileReader.onloadend = (file)=>{
            let content =  btoa(fileReader.result);
            this.setState({
                ...this.state,
                receipt:content
            })
        }
        fileReader.readAsBinaryString(file);
    }

    submit = (e) => {
        e.preventDefault();
        let reimbursementObject = this.state;
        Project1Client.post("home/createReimbursement",reimbursementObject)     
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
            <div className = "text-center ">
                <form className="form-signin createReimbursementBox" onSubmit={this.submit}>
                    <div className ="formHeader">Create a new Reimbursement</div>
                    <div className="formGroup formClass">
                    <label className="labelClass">Description</label>
                    <input type="text"
                        className="form-control"
                        id="input-description"
                        placeholder="Description"
                        required
                        maxLength="250"
                        value={this.state.description}
                        onChange={this.descriptionChange}
                    />
                    </div>
                    <div className="formGroup formClass">
                    <label className="labelClass">Amount</label>
                  <input type="number"
                     className="form-control "
                        id="inputNumber"
                        placeholder="Password"
                        required
                        maxLength="20"
                        min="0"
                        value={this.state.amount}
                        onChange={this.amountChange} />
                   
                    </div>
                    
                    <div className="formGroup formClass">
                    <label className="labelClass">Receipt</label>
                    <input type="file"
                     className="white"
                        id="file"
                        onChange={e => this.handleFileChosen(e.target.files[0])}
                    />
                    </div>
                    <img src = {'data:image/;base64,'+this.state.receipt} className="imageSpacing"alt="" width="200"height="200"/>
                    <div className="formGroup formClass">
                    <label className="labelClass">Type: </label>
                    <select name="Types" onChange={this.typeChange}
                     className="form-control">
                        <option value="LODGING"> LODGING</option>
                        <option value="TRAVEL">TRAVEL</option>
                        <option value="FOOD">FOOD</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                    </div>
                    <div className="buttonMargin">
                         <button className="btn btn-primary  btn-lg active btnStyle buttonMarginRight"
                            type="submit">
                            Create Reimbursement
                        </button>
                        <LocationButtonComponent history={this.props.history} name={this.props.name} redirectURL={this.props.redirectURL}/>
                    </div>
                </form>


    
                </div>
            </>

        )
    }
}