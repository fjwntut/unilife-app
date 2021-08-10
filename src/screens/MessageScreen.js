import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, SafeAreaView, ScrollView, View, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/styles';
import { firebase } from '../firebase/config'
import RenderHtml from 'react-native-render-html';
// import HTMLView from 'react-native-htmlview';

export default function MessageScreen(props) {

    const chatroom = props.route.params.chatroom
    // console.log('chatroom', chatroom)
    const user = props.user.data()
    const storageRef = firebase.storage().ref()
    const messagesRef = props.route.params.messagesRef

    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState([])

    useEffect(() => {
        messagesRef
            .orderBy('timestamp', 'desc')
            .limit(5)
            // .orderBy('timestamp')
            .onSnapshot(
                querySnapshot => {
                    const messages = []
                    querySnapshot.forEach(async doc => {
                        const message = doc.data()
                        message.id = doc.id
                        // console.log(message)
                        const snapshot = await message.user.get()
                        message.user = snapshot.data().info.nickname
                        message.replies = messagesRef.doc(doc.id).collection('replies')
                        if (message.timestamp == null) {
                            message.timestamp = firebase.firestore.Timestamp.now();
                        }
                        messages.unshift(message)
                        setMessages(messages)
                    });
                },
                error => {
                    // console.log(error)
                }
            )
            // setMessages([
            //     {id: '1', user: 'zdv', message: 'First Comment', timestamp: Date.now(), replies: null},
            //     {id: '2', user: 'sdcxrg', message: 'Second Comment', timestamp: Date.now(), replies: null},
            //     {id: '1', user: 'xdfger', message: 'Third Comment', timestamp: Date.now(), replies: null}
            // ])
    }, [])

    const messageItem = ({item}) => {
        return (
            <View style={styles.messageItem}>
                <Text style={styles.inputText}>{item.user}</Text>
                <Text style={styles.inputText}>{item.timestamp.toDate().toString()}</Text>
                <Text style={styles.inputText}>{item.content}</Text>
            </View>
        )
    }
    
    const sendMessage = () => {
        if (inputText && inputText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                user: firebase.firestore().doc('users/' + user.id),
                content: inputText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };
            messagesRef.add(data)
                .then(_doc => {
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const tagsStyles = {
        b: {
            fontWeight: 'bold'
        }
    }
    
    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={messageItem}
                keyExtractor={(item, index) => index.toString()}
                // removeClippedSubviews={true}
            />
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='留言...'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setInputText(text)}
                    value={inputText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={sendMessage}>
                    <Text style={styles.buttonText}>送出</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
