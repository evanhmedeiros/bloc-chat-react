import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            content: ""
        };

        this.messageRef = this.props.firebase.database().ref('messages');

    }

    componentDidMount() {  //Load messages via firebase
        this.messageRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message)})
        });
    }
    
    //new messages from user's inputs
    onChangeHandle = (e) =>{
        e.preventDefault
        this.setState({ content: e.target.value })
    }

    createMessage () {// can only post a message if logged in
        if(this.props.user !== null) {
            this.messageRef.push({
               roomID: this.props.activeRoom,
               sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
               userName: this.user.displayName,
               content: this.state.content
            })
        } else {
            alert('Please sign in.')
        }
    };

    onClickHandle = (e) => {// submit button event handler for new messages
        e.preventDefault();
        this.createMessage()
    }

// Look at how the album info was rendered... .map() message content to tb perhaps...
    render() {
        const messageArray = this.state.messages.filter( message => message.roomID === this.props.activeRoomKey)
        return(
        <div>
            <table>
                <tbody>{messageArray.map( (message, index) => 
                    <tr key={index}> 
                        <td>{message.userName}</td>
                        <td>{message.content}</td>
                        <td>{message.sentAt}</td>
                    </tr>)}
                </tbody>
            </table>
            <form onSubmit = { (e) => {this.createMessage(e)} }>
                <input 
                type="text"
                placeholder="Type your message"
                value={this.state.newMessage}
                />
                <input type="submit" value="send" />
            </form>
        </div>
        );
    }
}





export default MessageList;



