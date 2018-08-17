import * as firebase from 'firebase';
import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList'
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
state={
  activeRoom: '',
  activeRoomName: '',
  user: null
}

activeRoomHandle = (e) =>{ //activeRoom will filter the visible messages
  this.setState({ activeRoom: e.target.value })
  this.setState({ activeRoomName: e.target.name })
}//activeRoomName will show the user the correct room name


  render() {
    return (
      <div className="App">
       <RoomList 
       firebase={firebase}
       activeRoom={this.state.activeRoom}
       activeRoomHandle={this.state.activeRoomHandle}
       />
       <MessageList 
       firebase={firebase}
       activeRoom={this.state.activeRoom}
       />
      </div>
    );
  }
}

export default App;
