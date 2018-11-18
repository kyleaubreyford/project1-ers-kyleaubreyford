import React from 'react';
import { AWSClientBlank } from '../AxiosClients/Project1Client';
export class ImageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          flag: false,
          clicked: 1,
          image: ""
        }
      }

    componentDidMount(){
        AWSClientBlank.get(this.props.receipt)
        .then(data => {
          this.setState({
            ...this.state,
            image: data.data,
            flag: true
          })
        }).catch(err => {
          console.log(err);
        });
    }




    viewImage = () => {
        let temp;
        if (this.state.clicked < 3){
            temp = this.state.clicked + 1;
        }else{
          temp = 1
        }
        this.setState({
            ...this.state,
            clicked: temp
          })
        console.log(this.state.clicked)
    }

    render() {
        return(
            this.state.flag ? 
              this.state.clicked > 1 ?
                this.state.clicked === 2 ?
                  <img src = {'data:image/;base64,'+this.state.image} alt="" width="100"height="100" onClick={this.viewImage}/> 
                :<img src = {'data:image/;base64,'+this.state.image} alt="" className="imageActive"onClick={this.viewImage}/> 
              : <p onClick={this.viewImage.bind(this)}>View Receipt</p> 
            :""
        )
    }


}