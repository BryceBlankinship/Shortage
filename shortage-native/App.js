import { Appearance, Button, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import MapView from './screens/MapView';
import SearchView from './screens/SearchView';
import ListView from './screens/ListView';

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
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    // 101% width so border doesn't show on sides
    width: '101%',
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

const ThemeContext = createContext({
  
})

export default function App() {
  const [view, setView] = useState(1);
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
      <Navbar setMapView={setMapView} setSearchView={setSearchView} setListView={setListView}>
        {view === 0 ? <MapView /> : null}
        {view === 1 ? <SearchView /> : null}
        {view === 2 ? <ListView /> : null}
      </Navbar>
    </View>

  );
}


export function Navbar(props) {
  return (
    <>
      {props.children}
      <View style={styles.navbar}>
        <Pressable onPress={props.setMapView}>
          <Image style={styles.icon} source={require('./assets/navigate-circle-outline.png')} />
        </Pressable>
        <Pressable onPress={props.setSearchView}>
          <Image style={styles.searchIcon} source={require('./assets/search-circle-outline.png')} />
        </Pressable>
        <Pressable onPress={props.setListView}>
          <Image style={styles.icon} source={require('./assets/list-circle-outline.png')} />
        </Pressable>
      </View>
    </>
  )
}