import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Image, TextInput, TouchableOpacity, View } from 'react-native'
import styles from '../styles/styles'
import { firebase } from '../firebase/config'

export default function ChatroomScreen(props) {
    
    const user = props.user.data()
    const storageRef = firebase.storage().ref();
    const chatroomsRef = props.user.ref.collection('chatHistory')

    const [chatrooms, setChatrooms] = useState([])

    useEffect(() => {
        chatroomsRef
            .orderBy('startedAt')
            .get()
            .then(querySnapshot => {
                    const newChatrooms = [{
                        active: true,
                        userNames: ['Aa', 'Bb', 'Cc'],
                        id: '0'
                    }]
                    querySnapshot.forEach(async doc => {
                        let promises = [];
                        const chatEntry = doc.data()
                        // console.log('chatEntry', chatEntry)
                        chatEntry.messagesRef = chatEntry.chatroom.collection('messages')
                        const snapshot = await chatEntry.chatroom.get()
                        // console.log('chatroom', snapshot.data())
                        chatEntry.chatroom = snapshot.data()
                        chatEntry.active = snapshot.data().active
                        chatEntry.userNames = []
                        snapshot.data().users.forEach(user => {
                            promises.push(
                                user.get()
                                .then(userSnapshot => chatEntry.userNames.push(userSnapshot.data().info.nickname))
                                // .finally(() => console.log('userNames', chatEntry.userNames))
                            )
                        })     
                        Promise.all(promises).finally(() => {
                            newChatrooms.push(chatEntry) 
                            setChatrooms(newChatrooms)
                            // console.log('chatrooms', newChatrooms)
                        })
                    })
                    if (querySnapshot.size === 0) {
                        // // console.log('No chatrooms')
                        const data = { 
                            chatroom: firebase.firestore().doc('chatrooms/qD6nKNouqXKnKCLjCPp2'),
                            unreadCount: 0,
                            startedAt: firebase.firestore.FieldValue.serverTimestamp()
                        }
                        props.user.ref.collection('chatHistory').add(data)
                    }
                }
            )
        
    }, [])

    const chatroomItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('Message', {chatroom: item.chatroom, messagesRef: item.messagesRef}) } >
                <View style={styles.chatroomItem}>
                    <Text style={styles.chatroomItemText}>{item.id}</Text>
                    <Text style={styles.chatroomItemText}>{item.userNames.join(', ')}</Text>
                    <Text style={styles.chatroomItemText}>{item.active ? 'Active' : 'Inactive'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            { chatrooms && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={chatrooms}
                        renderItem={chatroomItem}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}