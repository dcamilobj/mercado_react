import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

var url = "https://api.mercadolibre.com/sites/MCO/search?q="

class App extends Component {
  constructor(props){
    super(props)
    this.state = {text: '',
                  items: []
                };
    this.searchItem = this.searchItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  searchItem()
  {
    var self = this
     axios.get(url+this.state.text).then(function(response)
      {
        self.setState({
          items: response.data.results
        })
      }).catch(function(error){
        console.log(error);
      })
  }

  handleInputChange(e) {
   this.setState({text: e.target.value});
 }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mercado search 'dcamilobj'</h1>
        </header>
        <p className="App-intro">
         Aplicación para el curso 'Desarrollo de apps empresariales' UdeA
        </p>
        <br/>
        <div>
          <input type="text" name="item" placeholder="Search item..." value={this.state.email} onChange={this.handleInputChange}/>
          <button onClick={this.searchItem}>Search</button>
        </div>
        <div>
        <ul  className="list img-list">
          {
            this.state.items.map(item =>
            <li key={item.id}>
            <div className="li-img">
              <img className="img-size" src={item.thumbnail} alt="server-error"/>
            </div>
            <div className="li-text">
              <h4 className="li-head">{item.title}</h4>
              <p className="li-sub">{item.price} {item.currency_id}</p>
              <p className="li-sub">Sold quantity: {item.sold_quantity}</p>
            </div>
            </li>
            )
          }
        </ul>
        </div>
      </div>
    );
  }
}

export default App;
