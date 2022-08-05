import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    horizontalCardContainer: {
        flex: 1,
        flexDirection: 'column',
        minHeight: 100,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        marginTop: 10,
        marginRight: 20,
        backgroundColor: 'white',
    },

    title: {
        fontSize: 14,
        fontWeight: '700'
    },

    desc: {
        fontSize: 12
    }
});

export default function HorizontalCard(props){
    return(
        <View style={styles.horizontalCardContainer}>
            <Text style={styles.title}>Hey There</Text>
            <Text style={styles.desc}>This is a desc</Text>
        </View>
    );
}