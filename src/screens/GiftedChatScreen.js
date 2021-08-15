import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { FlatList, Keyboard, Text, SafeAreaView, ScrollView, View, TextInput, TouchableOpacity } from 'react-native'
import { stylesheet } from '../styles/styles'
import { firebase } from '../firebase/config'
import RenderHtml from 'react-native-render-html'
import { Bubble, ProfileImage } from '../components/messages'
import Asset from '../components/assets'

export default function MessageScreen(props) {
    const chatroom = props.route.params.chatroom
    // console.log('chatroom', chatroom)
    const user = props.user.data()
    const storageRef = firebase.storage().ref()
    const messagesRef = props.route.params.messagesRef

    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState([])
    let isLoading = false
    let messageLoaded = []

    useEffect(() => {
        // loadMessages()
        messagesRef.orderBy('timestamp', 'desc')//.limit(20)
            .onSnapshot(querySnapshot => {
                const messageList = []
                let promises = []
                querySnapshot.forEach(async doc => {
                    const id = messageList.push(doc.data()) -1
                    console.log(messageList)
                    const message = doc.data()
                    messageList[id].id = doc.id
                    promises.push(
                        message.user.get()
                            .then(snapshot => {
                                messageList[id].user = snapshot.data().info.nickname
                                messageList[id].position = (snapshot.data().id == user.id) ? 'right' : 'left'
                                messageList[id].replies = messagesRef.doc(doc.id).collection('replies')
                                if (messageList[id].timestamp == null) {
                                    messageList[id].timestamp = firebase.firestore.Timestamp.now()
                                }
                                messageList[id].position = (snapshot.data().id == user.id) ? 'right' : 'left'
                                // messageList[id].replies = messagesRef.doc(doc.id).collection('replies')
                                messageList[id].timestamp = messageList[id].timestamp.toDate()
                                messageList[id]._id = id
                                messageList[id].createdAt = messageList[id].timestamp
                                messageList[id].text = messageList[id].content
                                messageList[id].user = {
                                    _id: snapshot.data().id,
                                    name: snapshot.data().info.nickname,
                                    avatar: Asset('profile-image-0.png')
                                }
                                console.log(messageList[id].user._id, user.id)
                            })
                    )
                    // const snapshot = await message.user.get()
                    // messageList[id].user = snapshot.data().info.nickname
                    // messageList[id].replies = messagesRef.doc(doc.id).collection('replies')
                    // if (messageList[id].timestamp == null) {
                    //     messageList[id].timestamp = firebase.firestore.Timestamp.now();
                    // }
                })
                Promise.all(promises).then(() => {setMessages(messageList)})
            })
    }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderBubble = ({user, currentMessage}) => {
    const message = {
        user: currentMessage.user.name,
        timestamp: currentMessage.createdAt,
        content: currentMessage.text,
        position: currentMessage.position
    }
    return (
        <Bubble {...message} />
    )
  }

  const renderAvatar = (e) => <ProfileImage id={0} />

  return (
    <View style={stylesheet.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar}
        onSend={messages => onSend(messages)}
        renderAvatarOnTop = {true}
        user={{
          _id: user.id,
        }}
      />
    </View>
  )
}