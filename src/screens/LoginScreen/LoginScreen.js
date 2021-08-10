import React, { useState } from 'react'
import { ImageBackground, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';

export default function LoginScreen({navigation}) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const usersRef = firebase.firestore().collection('users')

    const onFooterLinkPress = () => {
        navigation.navigate('Registration')
    }
    
    const onLoginPress = () => {
        navigation.navigate('Profile')

        // firebase
        //     .auth()
        //     .signInWithEmailAndPassword(email, password)
        //     .then((response) => {
        //         const uid = response.user.uid
        //         usersRef
        //             .doc(uid)
        //             .get()
        //             .then(doc => {
        //                 if (!doc.exists) {
        //                     alert("User does not exist anymore.")
        //                     return;
        //                 }
        //                 const user = doc.data()
        //                 navigation.navigate('Home', {user: user})
        //             })
        //             .catch(error => {
        //                 alert(error)
        //             });
        //     })
        //     .catch(error => {
        //         alert(error)
        //     })
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false

        });
      }, [navigation]);
    return (
            <ImageBackground source={require('../../../assets/bg-login.jpg')} resizeMode="cover" style={styles.bg}>
        <View  style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo_with_text.png')}
                />
                <View style={styles.card}>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
            </ImageBackground>
    )
}
