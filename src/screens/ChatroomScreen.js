import React, { useEffect, useState } from 'react'
import { FlatList, Text, Image, TextInput, TouchableOpacity, View, StyleSheet, useWindowDimensions } from 'react-native'
import { stylesheet, Color } from '../styles'
import { firebase } from '../firebase/config'
// import Carousel from 'react-native-ui-lib/carousel';

export default function ChatroomScreen(props) {
    
    const user = props.user.data()
    const storageRef = firebase.storage().ref()
    const chatroomsRef = props.user.ref.collection('chatHistory')

    const [chatrooms, setChatrooms] = useState([])
    // carousel = React.createRef<typeof Carousel>();

    useEffect(() => {
        chatroomsRef
            .orderBy('startedAt')
            .get()
            .then(querySnapshot => {
                    const newChatrooms = [
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                        {
                            active: true,
                            userNames: ['Aa', 'Bb', 'Cc'],
                            id: '0'
                        },
                    ]
                    querySnapshot.forEach(async doc => {
                        let promises = []
                        const chatEntry = doc.data()
                        console.log('chatEntry', chatEntry)
                        chatEntry.messagesRef = chatEntry.chatroom.collection('messages')
                        console.log('MessagesRef', chatEntry.messagesRef)
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
    
    class chatroomItem extends React.Component {
        render() {
        let items = this.props.items
        // const cardWidth = useWindowDimensions().width * 0.7
        // const cardHeight = useWindowDimensions().width * 0.6
        const cardStyle = StyleSheet.create({
            fullHeight: {
                flex: 1,
                alignItems: 'center',
            },
            card: {
                width: 400,
                height: 300,
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: Color.green,
            }
        }) 
        return (
            <TouchableOpacity 
                style={cardStyle.fullHeight}
                onPress={() => props.navigation.navigate('Message', {chatroom: item.chatroom, messagesRef: item.messagesRef}) } >
                <View style={cardStyle.card}>
                    <Text style={stylesheet.chatroomItemText}>{item.id}</Text>
                    <Text style={stylesheet.chatroomItemText}>{item.userNames.join(', ')}</Text>
                    <Text style={stylesheet.chatroomItemText}>{item.active ? 'Active' : 'Inactive'}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

    return (
        <View style={stylesheet.container}>
            { chatrooms && (
                <View style={{ flex: 1 }}>
                    <FlatList
                        style={{ flex: 1 }}
                        data={chatrooms}
                        renderItem={chatroomItem}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                        horizontal={true}
                        inverted={true}
                    />
                </View>
            )}
        </View>
    )
}
