import React, { Component } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
const apiKey = ''
const apiKey2 = 'Bearer ' + apiKey
const apiKey3 = ''


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

    // Get restaurant recommendations
    var result = await this.makeGetRequest(config);
    let [dict] = Object.values(result)
    var arr = Object.values(dict)
    var arrayLength = arr.length;

    // Store results
    let categories = [];
    for (var i = 0; i < arrayLength; i++) {
      var item = arr[i]

      // Get reccommendation name and category
      var name = Object.values(item)[2]
      var firstCategories = Object.values((Object.values(item)[7]))[0]
      var category = Object.values(firstCategories)[1]

      // Call second api for images
      var config2 = {
        method: 'get',
        url: 'https://pixabay.com/api/?key=' + apiKey3 + '&q=' + category
      };
      var result2 = await this.makeGetRequest(config2);
      let [hits] = Object.values(result2)[2]
      var preview = Object.values(hits)[4]

      // Save results
      var info = {
        "Restaurant Name": name,
        "Category" : category,
        "Preview" : preview
      };      

      categories.push(info);
    }

    console.log(categories);
    this.setState({ results: categories});
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
        <Button type="submit" variant="outlined">Search!</Button>
        </div>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {this.state.results.map((card) => (
              <Grid item key={JSON.stringify(card)} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '56.25%',
                    }}
                    image={Object.values(card)[2]}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {Object.values(card)[0]}
                    </Typography>
                    <Typography>
                    {Object.values(card)[1] + ' Food'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </form>
    )
  }
}
  
export default Form