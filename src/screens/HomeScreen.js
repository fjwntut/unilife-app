import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import { stylesheet } from '../styles'
import { ListItem } from '../components/lists'
import { firebase } from '../firebase/config'

export default function HomeScreen(props) {
    // console.log(props)
    
    const user = props.user.data()
    // console.log(props.user)
    const storageRef = firebase.storage().ref()
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
                let promises = []
                querySnapshot.forEach(doc => {
                    const article = doc.data()
                    article.id = doc.id
                    // console.log("article", article)
                    // console.log(storageRef.child('articles/' + article.id + '/images/' + article.coverImage))
                    /* Get Images */
                    promises.push(
                        // storageRef.child('articles/' + article.id + '/images/' + article.meta.coverImage).getDownloadURL()
                        storageRef.child('articles/9qAFUBpb7n0U1bzylreO/images/' + article.meta.coverImage).getDownloadURL()
                            .then((url) => {
                                article.imageUrl = url
                            })
                            .catch((e) => {
                                // console.log('Errors while downloading => ', e)
                            })
                            .finally(() => {
                                newArticles.push(article)
                            })
                    )
                    articlesRef.doc(article.id).update({
                        meta: {
                            source: 'NewHere',
                            abstract: "大家好，我是張恩睿，於台灣接受國高中教育，然畢業即申請美加大學，目前是美國密涅瓦大學（Minerva Schools at KGI）的大三生。",
                            coverImage: "2.jpg",
                            publishedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        }                            
                    })
                })
                Promise.all(promises).finally(() => {
                    // console.log("End promises", newArticles)
                    setArticles(newArticles)
                })
            }).finally(() => {
                // // console.log("finally", newArticles)
                // setArticles(newArticles)
            })
    }, [])

    const articleListItem = (itemProps) => 
        <ListItem {...itemProps} onPress={() => props.navigation.navigate('Article', {article: itemProps.item}) } 
        />

    return (
        <View style={stylesheet.container}>
            <TouchableOpacity style={stylesheet.button} onPress={()=>{props.navigation.navigate('ChatStack', {chatroom: '1'})}}>
                <Text style={stylesheet.buttonText}>收藏</Text>
            </TouchableOpacity>
            { articles && (
                <FlatList
                    data={articles}
                    renderItem={articleListItem}
                    keyExtractor={(item) => item.id}
                    removeClippedSubviews={true}
                />
            )}
        </View>
    )
}