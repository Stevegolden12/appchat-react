import React from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'Steve',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
          })
        .catch(err => console.log('error on joinableRooms: ', err))

       
      })
      .catch(err => console.log('error on connecting', err))
}

getRooms(){
  this.currentUser.getJoinableRooms()
    .then(joinableRooms = > {
      this.setState({
        joinablerooms,
        joinedRooms: this.currentuser.rooms
      })
    }

  subscribeToRoom(roomId) {
      this.setState = ({ messages: [] })
    this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            console.log('message.text: ', message.text);
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      }}
    .then(room => {
      this.setState({
        roomId: roomId
      })
        this.getRooms()
      })
     .catch(err => console.log('error on subscribing to room: ', err))
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: 9434238
    })
  }

  render() {
    return(
      <div className = "app" >
        <RoomList
          subscribeToRoom={this.subscriptToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App