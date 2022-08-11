import React, { useContext, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import FeedCard from '../components/feedCard';
import { NotificationContext } from '../contexts/NotificationContext';

const styles = StyleSheet.create({
    listViewContainer: {
        marginTop: 70,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        margin: 20,
    },
    listModalContainer: {
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
        width: 40,
        height: 40,
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

const Stack = createNativeStackNavigator();

export function ListNavController() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="List View" component={ListView} />
            <Stack.Screen name="List Details" component={ListScreen} />
        </Stack.Navigator>
    );
}

export default function ListView({ navigation }) {
    const [showCreateList, setShowCreateList] = useState(false);
    const [createListText, setCreateListText] = useState('');
    const [userListTitles, setUserListTitles] = useState([]);

    useEffect(() => {
        async function getUserListTitles() {
            try {
                const res = await axios.get('http://192.168.1.31:8080/lists/bryce');
                setUserListTitles(res.data.data.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUserListTitles();
    }, []);

    useEffect(() => {
        console.log("USER LIST TITLES: " + userListTitles)
    }, [userListTitles]);

    const handleListCreate = async () => {
        const params = JSON.stringify({
            userId: "bryce",
            title: createListText,
            desc: "",
            contents: []
        });
            const res = await axios.post('http://192.168.1.31:8080/lists', params);
            console.log(res);
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
                {userListTitles.map((title, index) => {
                    return (
                        <Pressable key={'LIST-ITEM-PRESSABLE_' + index} onPress={() => navigation.navigate("List Details", { title: title })}>
                            <ListItem title={title} key={'LIST-ITEM_' + index} />
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
            <Text>{props.title}</Text>
            <Image style={styles.icon} source={props.modal ? require('../assets/add-circle-outline.png') : require('../assets/forward-circle-outline.png')} />
        </View>
    );
}

export function ListScreen({ route }) {
    const { title } = route.params;
    const [item, setItem] = useState({ 'data': { 'contents': [] } });

    useEffect(() => {
        async function getItemByTitle() {
            try {
                const res = await axios.get(`http://192.168.1.31:8080/lists/bryce/${title}`);
                setItem(res.data.data);
            } catch (err) {
                console.error(err);
            }
        }

        getItemByTitle();
    }, []);

    return (
        <ScrollView>
            <View style={styles.listViewContainer}>
                <Text style={styles.header}>{title}</Text>
                <Text style={styles.desc}>{item.data.desc}</Text>

                <TextInput style={styles.listInput} placeholder='Add An Item...'></TextInput>

                {item.data.contents.map((content, index) => {
                    return (
                        <FeedCard key={'FEED_CARD_LIST_' + index} item={content} />
                    );
                })}
            </View>
        </ScrollView>
    )
}

export function ListModal({ navigation, route }){
    const { item } = route.params;
    const notification = useContext(NotificationContext);
    const [userListTitles, setUserListTitles] = useState([]);

    useEffect(() => {
        async function getUserListTitles() {
            try {
                const res = await axios.get('http://192.168.1.31:8080/lists/bryce');
                setUserListTitles(res.data.data.data);
            } catch (err) {
                console.error(err);
            }
        }

        getUserListTitles();
    }, []);

    const addItemToList = async (title) => {
        try{
            const res = await axios.patch(`http://192.168.1.31:8080/lists/bryce/${title}`, item);
            if(res.status === 200) {
                navigation.goBack(null)
                notification.trigger('Success!', 'Added that to the list', 0);
            }else{
                Alert.alert('Oops! We messed up...', 'Adding ' + item.userId + "'s " + item.title + ' to that list failed.', [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Try Again',
                        onPress: () => addItemToList(title)
                    }
                ])
            }
        }catch(err){
            console.error(err);
        }
    }

    return(
        <View style={styles.listModalContainer}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>My Lists</Text>
                </View>
                {userListTitles.map((title, index) => {
                    return (
                        <Pressable key={'LIST-ITEM-PRESSABLE_' + index} onPress={() => addItemToList(title)}>
                            <ListItem modal={true} title={title} key={'LIST-ITEM_' + index} />
                        </Pressable>
                    )
                })}
            </ScrollView>
        </View>
    );
}