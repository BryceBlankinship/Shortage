import { Appearance, Button, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import MapView from './screens/MapView';
import SearchView from './screens/SearchView';
import { ListNavController } from './screens/ListView';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
    // 101% width so border doesn't show on sides
    width: '102%',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  icon: {
    width: 40,
    height: 40
  },

  searchIcon: {
    width: 45,
    height: 45,
    bottom: 2.5,
    marginLeft: 40,
    marginRight: 40
  }
});

const Tab = createBottomTabNavigator();

const ThemeContext = createContext({

})

export default function App() {
  const [view, setView] = useState(-1);
  const [theme, setTheme] = useState();
  const colorScheme = useColorScheme();

  useEffect(() => {
    setTheme(colorScheme);
  }, []);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  const setMapView = () => {
    setView(0);
  }

  const setSearchView = () => {
    setView(1);
  }

  const setListView = () => {
    setView(2);
  }

  return (

    <View style={styles.container}>
      <StatusBar />

      <NavigationContainer>
        <Tab.Navigator tabBar={props => <Navbar {...props} />} initialRouteName="Search" screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Search" component={SearchView} />
          <Tab.Screen name="Map" component={MapView} />
          <Tab.Screen name="List" component={ListNavController} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
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
        <Pressable onPress={() => navigation.navigate('List')}>
          <Image style={styles.icon} source={require('./assets/list-circle-outline.png')} />
        </Pressable>
      </View>
  )
}