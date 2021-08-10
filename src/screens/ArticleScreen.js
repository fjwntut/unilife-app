import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, SafeAreaView, ScrollView, View, TextInput, TouchableOpacity } from 'react-native'
import styles from '../styles/styles';
import { firebase } from '../firebase/config'
import RenderHtml from 'react-native-render-html';
// import HTMLView from 'react-native-htmlview';

export default function ArticleScreen(props) {

    const article = props.route.params.article
    const user = props.user.data()
    const storageRef = firebase.storage().ref()
    const commentsRef = firebase.firestore().collection('articles').doc(article.id).collection('comments')

    const [content, setContent] = useState(article.content)
    const [comments, setComments] = useState([])
    const [inputText, setInputText] = useState([])

    /* Get Images */
    let newContent = content;
    storageRef.child('articles/' + article.id + '/images/').listAll()
        .then(async res => {
            for (const imageRef of res.items) {
                // console.log('<img src="'+imageRef.name+'"')
                const url = await imageRef.getDownloadURL()
                // console.log('<img src="'+url+'"')
                newContent = newContent.replace('<img src="'+imageRef.name+'"', '<img src="'+url+'" style="width: 100%"')
                // console.log(newContent)
            }
            setContent(newContent)
        })
    
    useEffect(() => {
        commentsRef
            .orderBy('timestamp', 'desc')
            .limit(5)
            // .orderBy('timestamp')
            .onSnapshot(
                querySnapshot => {
                    const comments = []
                    querySnapshot.forEach(async doc => {
                        const comment = doc.data()
                        comment.id = doc.id
                        // console.log(comment)
                        const snapshot = await comment.user.get()
                        comment.user = snapshot.data().info.nickname
                        comment.replies = commentsRef.doc(doc.id).collection('replies')
                        if (comment.timestamp == null) {
                            comment.timestamp = firebase.firestore.Timestamp.now();
                        }
                        comments.unshift(comment)
                        setComments(comments)
                    });
                },
                error => {
                    // console.log(error)
                }
            )
            // setComments([
            //     {id: '1', user: 'zdv', comment: 'First Comment', timestamp: Date.now(), replies: null},
            //     {id: '2', user: 'sdcxrg', comment: 'Second Comment', timestamp: Date.now(), replies: null},
            //     {id: '1', user: 'xdfger', comment: 'Third Comment', timestamp: Date.now(), replies: null}
            // ])
    }, [])

    const commentItem = ({item}) => {
        return (
            <View style={styles.commentItem}>
                <Text style={styles.inputText}>{item.user}</Text>
                <Text style={styles.inputText}>{item.timestamp.toDate().toString()}</Text>
                <Text style={styles.inputText}>{item.content}</Text>
            </View>
        )
    }
    
    const addComment = () => {
        if (inputText && inputText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                user: firebase.firestore().doc('users/' + user.id),
                comment: inputText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            };
            commentsRef.add(data)
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
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                <Text style={styles.articleText}>
                    {article.title}
                </Text>
                <Text style={styles.articleText}>
                    {article.source}
                </Text>
                <Text style={styles.articleText}>
                    {article.publishedAt.toDate().toString()}
                </Text> 
                <RenderHtml
                    source={{html: content}}
                    tagsStyles={tagsStyles}
                />
                <FlatList
                    data={comments}
                    renderItem={commentItem}
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
                    <TouchableOpacity style={styles.button} onPress={addComment}>
                        <Text style={styles.buttonText}>送出</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
