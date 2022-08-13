import { Image, Pressable, StyleSheet, StatusBar, useColorScheme, View } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import MapView from './screens/MapView';
import SearchView from './screens/SearchView';
import { ListNavController } from './screens/ListView';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsStackController from './screens/SettingsView';
import FeedStackController from './screens/FeedView';
import NotificationContextProvider from './contexts/NotificationContext';
import AuthContextProvider, { AuthContext, AuthScreen, AuthStackController } from './contexts/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navbar: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 25,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
    borderStyle: 'solid',
    // 102% width so border doesn't show on sides
    width: '102%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  icon: {
    width: 40,
    height: 40,
    marginLeft: 10,
    marginRight: 10
  },

  searchIcon: {
    width: 45,
    height: 45,
    bottom: 2.5,
    marginLeft: 10,
    marginRight: 10
  }
});

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

const ThemeContext = createContext({

});

export default function App() {
  const [view, setView] = useState(-1);
  const [theme, setTheme] = useState();
  const colorScheme = useColorScheme();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setAuthenticated(false);
    }

    checkAuthStatus();
  }, []);


  useEffect(() => {
    setTheme(colorScheme);
  }, []);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
      <AuthContextProvider>
        <NavigationContainer>
        <View style={styles.container}>
          <NotificationContextProvider>
            <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />

            <Tab.Navigator tabBar={props => <Navbar {...props} />} initialRouteName={"Feed"} screenOptions={{ headerShown: false }}>
              <Tab.Screen name="Search" component={SearchView} />
              <Tab.Screen name="Map" component={MapView} />
              <Tab.Screen name="List" component={ListNavController} />
              <Tab.Screen name="Settings" component={SettingsStackController} />
              <Tab.Screen name="Feed" component={FeedStackController} />
            </Tab.Navigator>

          </NotificationContextProvider>
        </View>
        </NavigationContainer>
      </AuthContextProvider>
  );
}

export function Navbar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <Pressable onPress={() => navigation.navigate('Map')}>
        <Image style={styles.icon} source={require('./assets/navigate-circle-outline.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Search')}>
        <Image style={styles.searchIcon} source={require('./assets/search-circle-outline.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Feed')}>
        <Image style={styles.searchIcon} source={require('./assets/cube-outline.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('List')}>
        <Image style={styles.icon} source={require('./assets/list-circle-outline.png')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Settings')}>
        <Image style={styles.icon} source={require('./assets/person-circle-outline.png')} />
      </Pressable>
    </View>
  )
}