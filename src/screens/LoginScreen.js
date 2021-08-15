import React, { useState } from 'react'
import { ImageBackground, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Asset from '../components/assets'
import { Button } from '../components/forms'
import { stylesheet } from './LoginScreen/styles'
import { firebase } from '../firebase/config'

export default function LoginScreen({navigation}) {
    const usersRef = firebase.firestore().collection('users')
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }
    
    const onLoginPress = () => {
        navigation.navigate('Profile')

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                usersRef
                    .doc(uid)
                    .get()
                    .then(doc => {
                        if (!doc.exists) {
                            alert("User does not exist anymore.")
                            return
                        }
                        const user = doc.data()
                        navigation.navigate('ProfileInfo', {user: user})
                    })
                    .catch(error => {
                        alert(error)
                    })
            })
            .catch(error => {
                alert(error)
            })
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
      }, [navigation])
    return (
            <ImageBackground source={Asset('bg-login.jpg')} resizeMode="cover" style={stylesheet.bg}>
        <View  style={stylesheet.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={stylesheet.logo}
                    source={Asset('logo_with_text.png')}
                />
                <View style={stylesheet.card}>
                    <TextInput
                        style={stylesheet.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={stylesheet.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <Button onPress={() => onLoginPress()} title="登入" />
                </View>
                <View style={stylesheet.footerView}>
                    <Text style={stylesheet.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={stylesheet.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
            </ImageBackground>
    )
}
