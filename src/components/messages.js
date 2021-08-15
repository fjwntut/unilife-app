import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Text, TextInput } from 'react-native'
import { styles, stylesheet } from '../styles'
import Asset from './assets'
import moment from 'moment'

const messageStyle = StyleSheet.create({
    message: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 8,
        justifyContent: 'flex-start'
    },
    profileImage: {
        width: 40,
        height: 40,
        marginVerticle: 0,
        marginTop: 6,
    },
    messageRight: {
        flex: 'column',
        flexShrink: 1,
        marginLeft: 8,
    },    
    userNickname: {
        ...styles.textSmall,
        ...styles.textGrey,
        fontWeight: 'bold',
    },
    messageRow: {
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'flex-end'
    },
    messageTime: {
        ...styles.textXSmall,
        ...styles.textGrey,
        alignSelf: 'flex-end',
        marginHorizontal: 8,
    },
    messageText: {
        ...styles.text,
        ...styles.textBubble,
        // overflow: 'wrap',
        backgroundColor: '#f2f3f3',
        fontSize: 16,
    },
    right: {
        flexDirection: 'row-reverse',
        textAlign: 'right',
    }
})

export function Bubble(message) {
    console.log(message.position)
    return (
        <View style={[messageStyle.messageRight]}>
            <Text style={[stylesheet.textXSmall, stylesheet.textGrey, (message.position=='right') ?messageStyle.right:{}]}>
                {message.user}
            </Text>
            <View style={[messageStyle.messageRow, (message.position=='right') ?messageStyle.right:{}]}>
                <Text style={messageStyle.messageText}>
                    {message.content}
                </Text>
                <Text style={messageStyle.messageTime}>
                    {/* {moment(message.timestamp.toDate()).calendar()} */}
                    {moment(message.timestamp).calendar()}
                </Text>
            </View>
        </View>
    )
}

export function ProfileImage({id}) {
    return (
        <Image source={Asset('profile-image-'+id+'.png')} style={messageStyle.profileImage} />
    )
}
    
export function Message(message) {
    console.log('Message', message)
    return (
        <View style={[messageStyle.message, {justifyContent: message.position}]}>
            <ProfileImage id={0} />
            <Bubble {...message} />
        </View>
    )
}

export function Input() {
    return (
        <View style={styles.messageText}>
            <TextInput
                style={styles.messageTextInput}
                multiline={true}
                placeholder="Type a message"
                onChangeText={(text) => {
                    console.log(text)
                }}
            />
        </View>
    )
}