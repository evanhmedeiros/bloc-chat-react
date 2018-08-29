import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false
        };

        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    // to respond to sign-in and sign-out events in Firebase

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    // signing in button method

    signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
    }

    // signing out button method
    signOut() {
        this.props.firebase.auth().signOut();
    }



    render() {
            const guest = 'Guest';
        return(
            // What's this going to look like?
            <div>
                <p>Bloc Chatter: {this.props.activeUser ? this.props.activeUser.displayName : guest}.</p>
                <p>{this.props.user === null ? "Sign in you lump!" : "Ok... you're signed in."}</p>
                <button onClick={this.signIn}>Sign In!</button>
                <button onClick={this.signOut}>Sign Out!</button>
            </div>
        );
    }
}

export default User;