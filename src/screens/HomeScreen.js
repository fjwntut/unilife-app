import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, TouchableHighlight, View, StyleSheet,Image } from 'react-native'
import { stylesheet } from '../styles'
import { ListItem } from '../components/lists'
import { firebase } from '../firebase/config'
import { StickedBg, ExpandCard } from '../components/decorative'
import { HomeShortcutItem } from '../components/shortcutItem'

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
    
    const homeCardStyle = StyleSheet.create({
        container:{
            width: '100%',
            paddingTop: 56,
            zIndex:3,
        },
        greeting: {
            paddingHorizontal:16,
            marginBottom:16,
            fontSize: 32,
            color:'white',
        },
        time:{
            marginBottom:40,
            paddingHorizontal:16,
            fontSize: 18,
            color:'white',
        },
        icon:{
            marginHorizontal:16,
            boxSizing: 'paddingBox',
            marginVertical: 8,
            height: 32,
            width: 32,
            resizeMode:'contain',
        },
    })
    const [myShortcuts, setMyShortcuts] = useState([
        {icon: 'ic-class', title: 'ILMS', url: 'https://google.com'},
        {icon: 'ic-book', title: '圖書館系統', url: ''},
        {icon: 'ic-bus', title: '校車時刻表', url: ''},
        {icon: 'ic-announce', title: '公佈欄', url: ''},
    ]) 
    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            headerShown: false
        })
      }, [props.navigation])
    return (
        <View style={stylesheet.container}>
            <StickedBg image={require('../../assets/home.jpg')}>
            </StickedBg>
            <View style={homeCardStyle.container}>
                <View style={stylesheet.row}>
                    <View style={{flex:1}}>
                        <Text style={homeCardStyle.greeting}>小攸，午安！</Text>
                        <Text style={homeCardStyle.time}>6月24日星期六 下午3點30分</Text>
                    </View>
                    {/* <TouchableOpacity>
                        <Image source={require('../../assets/icons/bookmark.png')} style={homeCardStyle.icon} tintColor='#fff'/>
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                        <Image style={homeCardStyle.icon}  source={require('../../assets/icons/bookmark.png')} tintColor='#fff'/>
                    </TouchableOpacity>
                </View>
                <View style={stylesheet.row}>
                    {myShortcuts.map((item, index)=><HomeShortcutItem item={item} key={index}/>)}
                </View>
            </View>
            {/* <FlatList
                data = {myShortcuts}
                renderItem = {(itemProps) => <HomeShortcutItem {...itemProps}/>}
                keyExtractor={(item, index) => 'sc'+index}
                numColumns={4}
            /> */}
            <ExpandCard>
                { articles && (
                    <FlatList
                        data={articles}
                        renderItem={articleListItem}
                        keyExtractor={(item) => item.id}
                        removeClippedSubExpandCards={true}
                    />
                )}
            </ExpandCard>
        </View>
    )
}