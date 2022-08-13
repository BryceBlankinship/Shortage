import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Button } from 'react-native';
import { authorize, logout } from 'react-native-app-auth';
import { GOOGLE_OAUTH_CLIENT_ID } from '@env';
import * as Keychain from 'react-native-keychain';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
    const [authenticated, setAuthenticated] = useState();
    const [accessToken, setAccessToken] = useState();
    const [idToken, setIdToken] = useState();

    useEffect(() => {
        // check persisted storage to see if a live idToken exists
        
    }, []);

    useEffect(() => {
        // add logic here to check for refresh token,
        // if there is one set auth to false so that user has to reauthenticate!
        if(idToken){
            setAuthenticated(true);
        }

        // regardless, add idToken to persisted storage
        async function store(){
            
        }
        store();
    }, [idToken]);

    const authenticateGoogle = async () => {
        const googleConfig = {
            issuer: 'https://accounts.google.com',
            clientId: GOOGLE_OAUTH_CLIENT_ID,
            //TODO: figure out this redirectUrl
            redirectUrl: 'com.shortage.bryce:/oauth2Callback',
            scopes: ['openid', 'profile']
        };

        const result = await authorize(googleConfig);
        setAccessToken(result.accessToken);
        setIdToken(result.idToken);
    }

    const unauthenticateGoogle = async () => {
        const googleConfig = {
            issuer: 'https://accounts.google.com',
        }

        const result = await logout(config, {
            idToken: idToken,
            postLogoutRedirectUrl: 'com.shortage.bryce:/oauth2Callback',
        });
        console.log(result);
    }

    return (
        <AuthContext.Provider value={{ authenticated: authenticated, authenticateGoogle: authenticateGoogle, unauthenticateGoogle: unauthenticateGoogle }}>
            {authenticated ? props.children : <AuthScreen />}
        </AuthContext.Provider>
    )
}

export function AuthScreen() {
    const authContext = useContext(AuthContext);

    const styles = StyleSheet.create({
        authContainer: {
            marginTop: 40,
            flex: 1,
            flexDirection: 'column',
            marginBottom: 500
        },
        authHeaderContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
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

    return (
        <>
            <View style={styles.authHeaderContainer}>
                <Text style={styles.authTextSm}>Let's Get</Text>
                <Text style={styles.authTextLg}> Unlocked.</Text>
            </View>
            <View style={styles.authContainer}>

                <Button title='Login with Google' onPress={() => authContext.authenticateGoogle()} />
            </View>
        </>
    );
}