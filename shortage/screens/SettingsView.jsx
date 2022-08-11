import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, View, ScrollView, StyleSheet, Text, Pressable, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../App';

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
    },

    authContainer: {
        marginTop: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    
    authHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 40
    },
    authTextLg: {
        marginTop: 8,
        fontWeight: '700',
        fontSize: 30,
    },
    authTextSm: {
        fontWeight: '400',
        fontSize: 20
    },

    authControllerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('screen').height - 300
    }
});

const SettingsStack = createNativeStackNavigator();

export default function SettingsStackController(){
    return(
        <SettingsStack.Navigator>
            <SettingsStack.Group screenOptions={{ headerShown: false }}>
                <SettingsStack.Screen name="Settings View" component={SettingsView} />
            </SettingsStack.Group>
            <SettingsStack.Group screenOptions={{ presentation: 'modal' }}>
                <SettingsStack.Screen name="ProfileEditor" component={ProfileEditor} />
                <SettingsStack.Screen name="Authenticate" component={Authenticate} />
            </SettingsStack.Group>
        </SettingsStack.Navigator>
    );
}

export function SettingsView({ navigation }){
    const authContext = useContext(AuthContext);
    const [authenticated, setAuthenticated] = useState(false);
    
    const changeProfileImage = () => {
        navigation.navigate('ProfileEditor');
    }

    return (
        <View style={styles.profileViewContainer}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Profile</Text>
                    {authenticated && <Pressable onPress={changeProfileImage}>
                        <Image style={styles.headerProfileIcon} source={require('../assets/person-circle-outline.png')}></Image>
                    </Pressable>}
                </View>
                {authenticated ? <Settings /> : <AuthenticateController navigation={navigation} />}
            </ScrollView>
        </View>
    );
}

function Settings(){
    return(
        <Text>Welcome!</Text>
    );
}

function AuthenticateController({ navigation }){
    return(
        <View style={styles.authControllerContainer}>
            <Image style={{ width: 150, height: 150, marginBottom: 50 }} source={require('../assets/lock-closed-outline.png')}></Image>
            <Button title='Unlock Profile' onPress={() => navigation.navigate('Authenticate')}></Button>
        </View>
    );
}

function Authenticate(){

    return(
        <View style={styles.authContainer}>
            <View style={styles.authHeaderContainer}>
                <Text style={styles.authTextSm}>Let's Get</Text>
                <Text style={styles.authTextLg}> Unlocked.</Text>

            </View>
        </View>
    );
}

function ProfileEditor({ navigation }){
    return(
        <View style={styles.profileViewContainer}>
            <Button onPress={() => navigation.goBack()} title="Get me outta here"></Button>
        </View>
    );
}