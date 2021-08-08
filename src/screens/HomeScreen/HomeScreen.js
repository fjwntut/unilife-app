import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Image, TextInput, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {
    console.log(props)
    const [articleText, setarticleText] = useState('')
    const [articles, setArticles] = useState([])

    var storageRef = firebase.storage().ref();
    const articleRef = firebase.firestore().collection('articles')
    const user = props.extraData

    useEffect(() => {
        articleRef
            .where("community", "in", ["all", user.community])
            .orderBy('publishedAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    var promises = [];
                    const newArticles = []
                    querySnapshot.forEach(doc => {
                        const article = doc.data()
                        article.id = doc.id
                        // storage()
                        //     .ref('/' + article.id + '/images/' + article.coverImage) //name in storage in firebase console
                        //     .getDownloadURL()
                        //     .then((url) => {
                        //         article.imageUrl = url;
                        //     })
                        //     .catch((e) => console.log('Errors while downloading => ', e));
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

    const onAddButtonPress = () => {
        if (articleText && articleText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: articleText,
                authorID: userID,
                createdAt: timestamp,
            };
            articleRef
                .add(data)
                .then(_doc => {
                    setarticleText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const articleItem = ({item, index}) => {
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
        </View>
    )
}