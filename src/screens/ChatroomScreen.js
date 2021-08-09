import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Image, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './HomeScreen/styles';
import { firebase } from '../firebase/config'

export default function ChatRoomScreen(props) {
    console.log(props)
    
    const user = props.user.data()
    console.log(user)
    const storageRef = firebase.storage().ref();
    const articlesRef = firebase.firestore().collection('articles')

    const [articles, setArticles] = useState([])
    console.log("Ref", firebase.firestore().doc('articles/9qAFUBpb7n0U1bzylreO'))

    useEffect(() => {
        articlesRef
            .where("community", "in", ["all", user.community])
            .orderBy('publishedAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    let promises = [];
                    const newArticles = []
                    querySnapshot.forEach(doc => {
                        const article = doc.data()
                        article.id = doc.id
                        console.log("article", article)
                        console.log(storageRef.child('articles/' + article.id + '/images/' + article.coverImage))
                        promises.push(
                            storageRef.child('articles/' + article.id + '/images/' + article.coverImage).getDownloadURL()
                                .then((url) => {
                                    article.imageUrl = url;
                                    newArticles.push(article)
                                })
                                .catch((e) => {
                                    console.log('Errors while downloading => ', e)
                                    newArticles.push(article)
                                })
                        );
                    });
                    Promise.all(promises).then(() => 
                        setArticles(newArticles)
                    ).catch(() => setArticles(newArticles));
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const articleItem = ({item}) => {
        return (
            <TouchableHighlight onPress={() => props.navigation.navigate('Article', {article: item}) } >
                <View style={styles.articleContainer}>
                    <Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
                    <Text style={styles.articleText}>
                        {item.title}
                    </Text>
                    <Text style={styles.articleText}>
                        {item.abstract}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.container}>
            { articles && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={articles}
                        renderItem={articleItem}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={()=>{props.navigation.navigate('ChatStack', {chatroom: '1'})}}>
                <Text style={styles.buttonText}>聊天</Text>
            </TouchableOpacity>
        </View>
    )
}