import React, { useState } from 'react'
import { ImageBackground, Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { button } from '../components/forms'
import styles from './ProfileScreen/styles'
import { firebase } from '../firebase/config'

export default function ProfileScreen({navigation}) {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#00aebb',
                borderBottomWidth: 0,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitleStyle: { alignSelf: 'center' },
            headerRight: () => (
                <TouchableOpacity
                style={stylesheet.headerButton}
                onPress={() => true}>
                <Text style={stylesheet.buttonTitle}>完成</Text>
            </TouchableOpacity>
            ),
        })
      }, [navigation])

    return (
            
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' ,backgroundColor: 'white'}}
                keyboardShouldPersistTaps="always">
                <View style={stylesheet.green}>
                    <Image
                        style={stylesheet.propic}
                        source={Assets('default-propic.png')}/>
                </View>
                <View>
                    <ImageBackground source={Assets('bg-profile.jpg')} resizeMode="cover" style={stylesheet.bg}>
                        <TouchableOpacity
                            style={stylesheet.editButton}
                            onPress={() => onLoginPress()}>
                            <Button style={stylesheet.editButton}>編輯頭像</Button>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={stylesheet.container}>
                    <TextInput
                        style={stylesheet.input}
                        placeholder='姓名'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={stylesheet.input}
                        placeholder='暱稱'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={stylesheet.input}
                        placeholder='生日'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={stylesheet.input}
                        placeholder='Email'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={stylesheet.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='密碼'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={stylesheet.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='再次輸入密碼'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                </View>
            </KeyboardAwareScrollView>
            
    )
}
