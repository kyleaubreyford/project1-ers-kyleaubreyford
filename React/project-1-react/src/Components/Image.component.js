import React from 'react';
import { AWSClientBlank } from '../AxiosClients/Project1Client';
export class ImageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          flag: false,
          clicked: false,
          image: ""
        }
      }

    componentDidMount(){
        console.log(this.state.image);
        AWSClientBlank.get(this.props.receipt)
        .then(data => {
          this.setState({
            ...this.state,
            image: data.data,
            flag: true
          })
          console.log(this.state.image);
        }).catch(err => {
          console.log(err);
        });
    }




    viewImage = () => {
        this.setState({
            ...this.state,
            clicked: !this.state.clicked
          })
          console.log(this.state.clicked);
    }

    render() {
        return(
            this.state.flag ? this.state.clicked ? <img src = {'data:image/;base64,'+this.state.image} alt="" width="100"height="100" onClick={this.viewImage}/> 
                : <p onClick={this.viewImage.bind(this)}>View Receipt</p> :""
        )
    }


}