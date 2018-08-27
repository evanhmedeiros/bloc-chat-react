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

    // handleSubmit(newRoomName) {//this will allow newRoom to get pushed to firebase...
    //     if (!this.state.newRoomName) {return} // not sure 100% how this code is working
    //     this.roomsRef.push({ name: newRoomName });
    //     this.setState({ newRoomName: '' })
    // }

    createRoom(e) {
        e.preventDefault();
        const newRoomName = this.state.newRoomName;
        console.log(newRoomName);
        this.roomsRef.push({
            name: newRoomName
        });
        this.setState({ newRoomName: '' });
    }

    handleChange(e){//create a new room name
        this.setState({ newRoomName: e.target.value });
    }

    roomChange (room) {
        console.log('change room:', room);
        this.props.setActiveRoom(room);
    }

    componentDidMount() {        
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
          });
    }


    render() {
        return(
            <section>
         <div>
          {
            this.state.rooms.map((room, index) =>
            <div onClick={() => this.roomChange(room)} key={index}>{room.name}</div>
          )
          }
        </div>

                <form onSubmit={ (e) => this.createRoom(e) }>
                    Create new room:
                    <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
                    <input type="submit" value="Create Room"/>
                </form>
                
            </section>
        );
    }
}

export default RoomList;

