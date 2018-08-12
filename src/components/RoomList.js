import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ''
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');

    }


    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )})
        });
    }

    //This function will push newRoom to firebase
    roomCreate() {
        this.roomsRef.push({name: this.state.newRoomName})
    }
    // user will enter text into input box, the value is goes to state.newRoomName
    handleChange = (e) => {
        this.setState({newRoomName: e.target.value})
    }
    //this will launch roomCreate function
    onClickHandle(e) {
        e.preventDefault();
        this.roomCreate()
    }
    
    

    render() {
        return(
            <div>
                {/* form to create new room */}
                {this.state.rooms.map(( room, index) => 
                <div key={index}>{room.name}</div>)}

                <form onSubmit={ (e) => { e.preventDefault(); 
                    this.handleSubmit(this.state.newRoomName) }}>
                </form>
                {/* input to create new room, this will require event handlers... */}
                <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e)}/>
                <input type="submit"/>
            </div>
        );
    }
}

export default RoomList;