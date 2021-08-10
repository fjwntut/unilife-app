import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 
import { LoginScreen, HomeScreen, ArticleScreen, RegistrationScreen, MessageScreen, ChatRoomScreen } from './src/screens'
import {decode, encode} from 'base-64'
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((doc) => {
            setLoading(false)
            setUser(doc)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  function HomeStackScreen(props) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>		  
			<Stack.Screen name="Home">
				{props => <HomeScreen {...props} user={user} />}
			</Stack.Screen>
			<Stack.Screen name="Article">
				{props => <ArticleScreen {...props} user={user} />}
			</Stack.Screen>
      </Stack.Navigator>
    );
  }

  function ChatStackScreen(props) {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>		  
			{/* <Stack.Screen name="Chatroom">
				{props => <ChatRoomScreen {...props} user={user} />}
			</Stack.Screen> */}
			<Stack.Screen name="Message">
				{props => <MessageScreen {...props} user={user} />}
			</Stack.Screen>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
        { user ? (
          <Tab.Navigator>
            <Tab.Screen name="HomeStack" options={{tabBarLabel:"主頁"}}>
              {props => <HomeStackScreen {...props} user={user} />}
            </Tab.Screen>
            <Tab.Screen name="ChatStack" options={{tabBarLabel:"聊天室"}}>
              {props => <ChatStackScreen {...props} user={user} />}
            </Tab.Screen>
          </Tab.Navigator>
        ) :  
        (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen}/>
          </Stack.Navigator>
        )} 
    </NavigationContainer>
  );
}
