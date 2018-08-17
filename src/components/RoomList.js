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

    handleSubmit(newRoomName) {//this will allow newRoom to get pushed to firebase...
        if (!this.state.newRoomName) {return} // not sure 100% how this code is working
        this.roomsRef.push({ name: newRoomName });
        this.setState({ newRoomName: '' })
    }

    handleChange(e){//create a new room name
        this.setState({newRoomName: e.target.value })
    }

    componentDidMount() {        
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )})
        });
    }

    //This function will push newRoom to firebase
    // roomCreate() {
    //     this.roomsRef.push({name: this.state.newRoomName})
    // }
    
    //this will launch roomCreate function
    // onClickHandle(e) {
    //     e.preventDefault();
    //     this.roomCreate()
    // }
    
    

    render() {
        return(
            <div>
                {this.state.rooms.map(( room, index) => 
                <div key={index}>{room.name}</div>)}

                <form onSubmit={ (e) => { e.preventDefault(); 
                this.handleSubmit(this.state.newRoomName) }
                }>
                
                <input type="text" value={this.state.newRoomName} 
                onChange={ (e) => this.handleChange(e)}/>
                <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default RoomList;