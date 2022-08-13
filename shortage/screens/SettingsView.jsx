import React, { useContext } from 'react';
import { Button, Image, View, ScrollView, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';

const styles = StyleSheet.create({
    profileViewContainer: {
        marginTop: 70,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
        margin: 20
    },
    headerContainer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
    header: {
        fontSize: 30,
        fontWeight: '700'
    },
    headerProfileIcon: {
        width: 40,
        height: 40,
    }
});

const SettingsStack = createNativeStackNavigator();

export default function SettingsStackController() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Group screenOptions={{ headerShown: false }}>
                <SettingsStack.Screen name="Settings View" component={SettingsView} />
            </SettingsStack.Group>
            <SettingsStack.Group screenOptions={{ presentation: 'modal' }}>
                <SettingsStack.Screen name="ProfileEditor" component={ProfileEditor} />
            </SettingsStack.Group>
        </SettingsStack.Navigator>
    );
}

export function SettingsView({ navigation }) {
    const authContext = useContext(AuthContext);

    const changeProfileImage = () => {
        navigation.navigate('ProfileEditor');
    }

    return (
        <View style={styles.profileViewContainer}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Profile</Text>
                    <Pressable onPress={changeProfileImage}>
                        <Image style={styles.headerProfileIcon} source={require('../assets/person-circle-outline.png')}></Image>
                    </Pressable>
                </View>
                <Settings />
            </ScrollView>
        </View>
    );
}

function Settings() {
    return (
        <Text>Welcome!</Text>
    );
}


function ProfileEditor({ navigation }) {
    return (
        <View style={styles.profileViewContainer}>
            <Button onPress={() => navigation.goBack()} title="Get me outta here"></Button>
        </View>
    );
}