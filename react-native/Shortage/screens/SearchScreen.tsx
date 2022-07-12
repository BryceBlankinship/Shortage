import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState();

  const onChangeText = (text: any) => {
    setSearchText(text);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Find It</Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={searchText} placeholder={'Search'} autoCorrect={false} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    minWidth: 200,
    marginTop: 10,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    borderStyle: 'solid',
  }
});
