import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    verticalCardContainer: {
        flex: 1,
        flexDirection: 'column',
        width: 100,
        minHeight: 130,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginLeft: 20,
        marginRight: -10,
        backgroundColor: 'white'
    },

    title: {
        fontSize: 14,
        fontWeight: '700'
    },

    desc: {
        fontSize: 12
    }
});

export default function VerticalCard(props){
    return(
        <View style={styles.verticalCardContainer}>
            <Text style={styles.title}>Hey There</Text>
            <Text style={styles.desc}>This is a desc</Text>
        </View>
    );
}