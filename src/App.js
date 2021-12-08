import React,{ Component } from 'react'
import axios from 'axios';
const apiKey = ''
const apiKey2 = 'Bearer ' + apiKey

class Form extends Component{
  constructor(props){
    super(props)
    this.state = { restaurantName: '', location: '', results: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.makeGetRequest = this.makeGetRequest.bind(this)
  }
  
  makeGetRequest(config) {
    return new Promise(function (resolve, reject) {
      axios(config).then(
            (response) => {
                var result = response.data;
                console.log('Processing Request');
                resolve(result);
            },
                (error) => {
                reject(error);
            }
        );
    });
}

  // Form submitting logic, prevent default page refresh 
  async handleSubmit(event){
    event.preventDefault();
    const { restaurantName, location } = this.state
    
    var config = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=' + restaurantName + '&location=' + location,
      headers: { 
        'user-key': apiKey, 
        'Accept': 'application/json', 
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Headers': '*', 
        'Origin': '*', 
        'Authorization': apiKey2
      }
    };

    var result = await this.makeGetRequest(config);

    this.setState({ results: Object.values(result)});
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

        <h2>Results are: {this.state.results.map(result => <div>{JSON.stringify(result)}</div>)}</h2>
      </form>
    )
  }
}
  
export default Form