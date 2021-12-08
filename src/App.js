import React,{ Component } from 'react'
import axios from 'axios';
const apiKey = process.env.YELPKEY
const apiKey2 = 'Bearer ' + apiKey

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
        'user-key': apiKey, 
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Headers': '*', 
        'Origin': '*', 
        'Authorization': apiKey2
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
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