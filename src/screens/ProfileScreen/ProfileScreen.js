import React, { useState } from 'react'
import { ImageBackground, Image, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';

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
                style={styles.headerButton}
                onPress={() => true}>
                <Text style={styles.buttonTitle}>完成</Text>
            </TouchableOpacity>
            ),
        });
      }, [navigation]);

    return (
            
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' ,backgroundColor: 'white'}}
                keyboardShouldPersistTaps="always">
                <View style={styles.green}>
                    <Image
                        style={styles.propic}
                        source={require('../../../assets/default-propic.png')}/>
                </View>
                <View>
                    <ImageBackground source={require('../../../assets/bg-profile.jpg')} resizeMode="cover" style={styles.bg}>
                        <TouchableOpacity
                            style={styles.editButton}
                            onPress={() => onLoginPress()}>
                            <Text style={styles.buttonTitle}>編輯頭像</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder='姓名'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='暱稱'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='生日'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor="#aaaaaa"
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='密碼'
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
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
