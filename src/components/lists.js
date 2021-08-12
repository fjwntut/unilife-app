import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'
import { styles, Color } from '../styles'
import Asset, { Icon } from './assets'
import moment from 'moment'

export function ListItem({ item, onPress, style}) {
    const listItemStyle = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            height: 90,
            paddingVertical: 8,
            paddingHorizontal: 16,
            overflow: 'hidden',
        },
        image: {
            width: 90,
            height: 90,
            borderRadius: 6,
        },
        textContainer: {
            flex: 'column',
            flexShrink: 1,
            paddingLeft: 16,
        },
        title: {
            ...styles.text,
            flexWrap: 'wrap',
        },
        description: {
            ...styles.textSmall,
            ...styles.textGrey,
            height: 30,
            flexWrap: 'wrap',
            overflow: 'hidden',
        },
        bottom: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
        },
        bottomText: {
            ...styles.textSmall,
            ...styles.textGrey2,
            alignSelf: 'flex-end',
        },
        bottomIcon: {
            alignSelf: 'flex-end',
            paddingHorizontal: 5,
        }
    })
    
    const iconStyle = {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        tintColor: Color.grey0,
    }
    moment.locale('zh-tw')
    const [ isSaved, setIsSaved ] = useState(false)

    return (
        <TouchableOpacity onPress={onPress} >
            <View style={style? [listItemStyle.container, style.container] : listItemStyle.container}>
                <Image style={style? [listItemStyle.image, style.image] : listItemStyle.image} source={{uri: item.imageUrl}}/>
                <View style={style? [listItemStyle.textContainer, style.textContainer] : listItemStyle.textContainer}>
                    <Text style={style? [listItemStyle.title, style.title] : listItemStyle.title}>
                        {item.title}
                    </Text>
                    <Text style={style? [listItemStyle.description, style.description] : listItemStyle.description}>
                        {item.meta.abstract}
                    </Text>
                    <View style={style? [listItemStyle.bottom, style.bottom] : listItemStyle.bottom}>
                        <Text style={style? [listItemStyle.bottomText, style.bottomText] : listItemStyle.bottomText}>
                            {moment(item.publishedAt.toDate()).fromNow()}
                        </Text>
                        {/* <Icon size={14} name="bookmark" style={style? style.bottomIcon : {}}/> */}
                        <TouchableOpacity onPress={() => setIsSaved(!isSaved)} style={listItemStyle.bottomIcon}>
                            <Image source={Asset(isSaved? `icons/bookmark-active.png` : `icons/bookmark.png`)} style={[iconStyle]} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}