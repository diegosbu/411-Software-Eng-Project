import React,{ Component } from 'react'
import axios from 'axios';
const apiKey = 'Bearer Qx5b42fSnJ716nDQ5q2IIE8-H8yw3EhqBxEmCKycwy0xhfBJLVBfbeKle4HvdG6RiF3NaTUZzQOEctR_WQCn4niYJYjFOuvSeFdMbpVGTdklQjKW_yHpbcMLT8GOYXYx'

class Form extends Component{
  constructor(props){
    super(props)
    this.state = { restaurantName:'', location:''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  // Form submitting logic, prevent default page refresh 
  handleSubmit(event){
    event.preventDefault();
    // const { restaurantName, location } = this.state

    var config = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=42&longitude=-72',
      headers: { 
        'user-key': 'Qx5b42fSnJ716nDQ5q2IIE8-H8yw3EhqBxEmCKycwy0xhfBJLVBfbeKle4HvdG6RiF3NaTUZzQOEctR_WQCn4niYJYjFOuvSeFdMbpVGTdklQjKW_yHpbcMLT8GOYXYx', 
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Headers': '*', 
        'Origin': '*', 
        'Authorization': 'Bearer Qx5b42fSnJ716nDQ5q2IIE8-H8yw3EhqBxEmCKycwy0xhfBJLVBfbeKle4HvdG6RiF3NaTUZzQOEctR_WQCn4niYJYjFOuvSeFdMbpVGTdklQjKW_yHpbcMLT8GOYXYx'
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    // Promise.props({
    //   local: axios({
    //     url: urlProxy,
    //     params: params,
    //     json: true,
    //     method: 'GET',
    //     withCredentials: true,
    //     headers: {
    //                 'user-key': apiKey,
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Origin': 'http://localhost:3000',
    //                 'Access-Control-Allow-Headers': '*',
    //                 'Access-Control-Allow-Origin': 'http://localhost:3000',
    //             },
    //   }).then(res => console.log(res.data))
    //     .catch(err => console.log(err))
    //  })
    //   .then(data => {
    //     console.log(data)
    //   });
  }
  
  // Method causes to store all the values
  handleChange(event){
    this.setState({
      [event.target.name] : event.target.value
    })
  }
  
  // Return a controlled form
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor='restaurantName'>Restaurant Name</label>
          <input 
            name='restaurantName'
            placeholder='Example Restaurant Name' 
            value = {this.state.restaurantName}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='location'>Location</label>
          <input
            name='location' 
            placeholder='Example Location'
            value={this.state.location}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button>Search!</button>
        </div>
      </form>
    )
  }
}
  
export default Form