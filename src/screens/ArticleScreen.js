import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, SafeAreaView, ScrollView, View, useWindowDimensions } from 'react-native'
import styles from './ArticleScreen/styles';
import { firebase } from '../firebase/config'
import RenderHtml from 'react-native-render-html';
// import HTMLView from 'react-native-htmlview';

export default function ArticleScreen({route, navigation}) {

    const [entityText, setEntityText] = useState('')
    const [content, setContent] = useState(route.params.article.content)

    const article = route.params.article;
    var storageRef = firebase.storage().ref();
    const articlesRef = firebase.firestore().collection('articles')

    /* Get Images */
    var newContent = content;
    storageRef.child('articles/' + article.id + '/images/').listAll()
        .then(async res => {
            for (const imageRef of res.items) {
                console.log('<img src="'+imageRef.name+'"')
                const url = await imageRef.getDownloadURL()
                console.log('<img src="'+url+'"')
                newContent = newContent.replace('<img src="'+imageRef.name+'"', '<img src="'+url+'" style="width: 100%"')
                console.log(newContent)
            }
            setContent(newContent)
        })

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
                    {article.publishedAt}
                </Text> 
                <RenderHtml
                    source={{html: content}}
                    tagsStyles={tagsStyles}
                />
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='留言...'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setArticleText(text)}
                        value={articleText}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>送出</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
