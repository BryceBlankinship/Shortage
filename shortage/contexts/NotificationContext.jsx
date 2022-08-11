import React, { createContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const NotificationContext = createContext();

export default function NotificationContextProvider(props) {
    const [show, setShow] = useState(true);
    const [timeout, setNotificationTimeout] = useState(3000);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    useEffect(() => {

    }, [timeout]);

    const triggerNotification = (title, desc, timeout) => {
        setTitle(title);
        setDesc(desc);
        setNotificationTimeout(timeout);

        setTimeout(() => {
            setShow(true);
        }, timeout);
        setShow(false);
    }

    return (
        <NotificationContext.Provider value={{ trigger: triggerNotification }}>
            {show && <Notification title={title} desc={desc} />}
            {props.children}
        </NotificationContext.Provider>
    )
}

function Notification({ title, desc }) {
    const styles = StyleSheet.create({
        notificationContainer: {
            flex: 1,
            flexDirection: 'column',
            width: 250,
            top: 50,
            margin: 5,
            padding: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 8,
            zIndex: 1,
            position: 'absolute',
            
            shadowColor: '#171717',
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 8
        },
        notificationTitle: {
            fontSize: 16,
            fontWeight: '700'
        },
        notificationDesc: {
            fontSize: 14,
            fontWeight: '400'
        }
    });

    return (
        <View style={styles.notificationContainer}>
            <Text style={styles.notificationTitle}>{title}Success!</Text>
            <Text style={styles.notificationDesc}>{desc}Added that to the list!</Text>
        </View>
    )
}