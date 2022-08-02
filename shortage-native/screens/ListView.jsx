import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    listViewContainer: {
        marginTop: 70,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        margin: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
    },
    headerIcon: {
        width: 30,
        height: 30,
    },

    desc: {
        marginTop: 10,
        fontSize: 16,
    },
    listInput: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4
    },

    listItem: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        borderStyle: 'solid',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        width: 20,
        height: 20,
    }
});

// API calls to CRUD lists
function createList() {

}

const sampleData = [
    {
        title: 'First List!',
        desc: 'First list desc!',
        contents: [
            'Hammer',
            'Screwdriver',
            'Bucket',
            'Pipe fitting',
            'Bunny',
        ]
    },
    {
        title: 'Second List!',
        desc: 'Second list desc!',
        contents: [
            'Laundry Detergent',
            'Wasp Repellent',
            'Caulk',
            'Outlet Cover',
            'Magic 8 Ball',
        ]
    },
    {
        title: 'Third List!',
        desc: 'Third list desc!',
        contents: [
            'Salmon',
            'Steak',
            'Porkchops',
            'Spinach',
            'Black Top Hat',
        ]
    },
]

const Stack = createNativeStackNavigator();

export function ListNavController(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="List View" component={ListView} />
            <Stack.Screen name="List Details" component={ListScreen} />
        </Stack.Navigator>
    );
}

export default function ListView({ navigation }) {
    const [showCreateList, setShowCreateList] = useState(true);
    const [createListText, setCreateListText] = useState('');

    const handleListCreate = (e) => {
        console.log(createListText);
    }

    return (
        <View style={styles.listViewContainer}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>My Lists</Text>
                    <Pressable onPress={() => setShowCreateList(!showCreateList)}>
                        <Image style={styles.headerIcon} source={showCreateList ? require('../assets/remove-circle-outline.png') : require('../assets/add-circle-outline.png')} />
                    </Pressable>
                </View>
                {showCreateList && <TextInput style={styles.listInput} placeholder='Enter List Title...' autoFocus={true} returnKeyType={'done'} onChangeText={text => setCreateListText(text)} onSubmitEditing={handleListCreate}></TextInput>}
                {sampleData.map((item, index) => {
                    return (
                        <Pressable key={'LIST-ITEM-PRESSABLE_' + index} onPress={() => navigation.navigate("List Details", { item: item })}>
                            <ListItem item={item} key={'LIST-ITEM_' + index} />
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export function ListItem(props) {
    return (
            <View style={styles.listItem}>
                <Text>{props.item.title}</Text>
                <Image style={styles.icon} source={require('../assets/forward-circle-outline.png')} />
            </View>
    );
}

export function ListScreen({ route }){
    const { item } = route.params;

    return(
        <ScrollView>
            <View style={styles.listViewContainer}>
                <Text style={styles.header}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>

                <TextInput style={styles.listInput} placeholder='Add An Item...'></TextInput>

                {item.contents.map((content, index) => {
                    return(
                        <Text key={index} style={styles.listItem}>{content}</Text>
                    );
                })}
            </View>
        </ScrollView>
    )
}