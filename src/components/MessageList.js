import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.messageRef = this.props.firebase.database().ref('messages');

    }

    componentDidMount() {        
        this.messageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messageContent: this.state.messageContent.concat( messageContent )})
        });
    } 
// Look at how the album info was rendered... .map() message content to tb perhaps...
    render() {
        return(
            <table>
                <tbody>
                    
                </tbody>
            </table>
        );
    }
}





export default MessageList;



