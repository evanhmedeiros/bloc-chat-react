import * as firebase from 'firebase';
import React, { Component } from 'react';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
import './App.css';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQdTiUsOnrgMxm6RGVGoVxkEUeQTkXc20",
    authDomain: "bloc-chat-react-57b2f.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-57b2f.firebaseio.com",
    projectId: "bloc-chat-react-57b2f",
    storageBucket: "bloc-chat-react-57b2f.appspot.com",
    messagingSenderId: "1037545036712"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      addItem: '',
      activeRoom: [],
      activeUser: ""
    };

    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setUser = this.setUser.bind(this);
  }

setActiveRoom(room) {
  this.setState({ activeRoom: room}, () => console.log("active room:", this.state.activeRoom));
}

handleChange(e) {
  this.setState({
  [e.target.name]: e.target.value 
  });
}

handleSubmit(e) {
  e.preventDefault();
  const itemsRef = firebase.database().ref('items');
  const item = {
    value: this.state.addItem,
  }
  itemsRef.push(item);
  this.setState({
    addItem: ''
  });
}

setUser(user) {
  this.setState({activeUser: user});
}


  render() {
    
    return (
      <div className="App">

      <header>
       <h1>Let's Go Bloc Chat!</h1>
      </header>
        <h2>{this.state.activeRoom.name || "Enter Your Room"}</h2>


        <RoomList 
        firebase = {firebase} 
        setActiveRoom={ (room) => this.setActiveRoom(room)}
         />

        <MessageList 
        firebase={firebase} 
        activeRoom={this.state.activeRoom}
        setUser={this.state.setUser} 
        user={this.state.activeUser}
         />
        <User 
        firebase={firebase} 
        setUser= {this.setUser} 
        activeUser={this.state.activeUser}
        />


        
      </div>
    );
  }
}

export default App;
