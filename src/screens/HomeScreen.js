import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Image, TextInput, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import styles from '../styles/styles';
import { firebase } from '../firebase/config'

export default function HomeScreen(props) {
    // console.log(props)
    
    const user = props.user.data()
    // console.log(props.user)
    const storageRef = firebase.storage().ref();
    const articlesRef = firebase.firestore().collection('articles')

    const [articles, setArticles] = useState([])
    // console.log("Ref", firebase.firestore().doc('articles/9qAFUBpb7n0U1bzylreO'))

    useEffect(() => {
        // console.log("community", user.community)
        // console.log("identity", user.identity.community)
        const newArticles = []
        articlesRef
            .where("community", "in", ["all", user.identity.community])
            .orderBy('publishedAt', 'desc')
            .get().then(querySnapshot => {
                let promises = [];
                querySnapshot.forEach(doc => {
                    const article = doc.data()
                    article.id = doc.id
                    // console.log("article", article)
                    // console.log(storageRef.child('articles/' + article.id + '/images/' + article.coverImage))
                    /* Get Images */
                    promises.push(
                        storageRef.child('articles/' + article.id + '/images/' + article.coverImage).getDownloadURL()
                            .then((url) => {
                                article.imageUrl = url;
                            })
                            .catch((e) => {
                                // console.log('Errors while downloading => ', e)
                            })
                            .finally(() => {
                                newArticles.push(article)
                            })
                    )
                })
                Promise.all(promises).finally(() => {
                    // console.log("End promises", newArticles)
                    setArticles(newArticles)
                });
            }).finally(() => {
                // // console.log("finally", newArticles)
                // setArticles(newArticles)
            })
    }, [])

    const articleItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('Article', {article: item}) } >
                <View style={styles.articleContainer}>
                    <Image style={{width: 50, height: 50}} source={{uri: item.imageUrl}}/>
                    <Text style={styles.articleText}>
                        {item.title}
                    </Text>
                    <Text style={styles.articleText}>
                        {item.abstract}
                    </Text>
                </View>
            </TouchableOpacity>
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
                <Text style={styles.buttonText}>收藏</Text>
            </TouchableOpacity>
        </View>
    )
}