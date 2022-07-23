import { Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import MapView from './MapView';
import SearchView from './SearchView';
import ListView from './ListView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  navbar: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'absolute',
    bottom: 25,
  },

  icon: {
    width: 50,
    height: 50
  },

  serachIcon: {
    width: 55,
    height: 55,
    bottom: 2.5,
    marginLeft: 40,
    marginRight: 40
  }
});


export default function App() {
  const [view, setView] = useState(1);

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
          <Image style={styles.serachIcon} source={require('./assets/search-circle-outline.png')} />
        </Pressable>
        <Pressable onPress={props.setListView}>
          <Image style={styles.icon} source={require('./assets/list-circle-outline.png')} />
        </Pressable>
      </View>
    </>
  )
}