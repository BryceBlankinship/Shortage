import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const styles = StyleSheet.create({
    feedCardContainer: {
        padding: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        minHeight: 400
    },

    feedCardTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    feedCardPrice: {
        fontSize: 18,
        fontWeight: '600'
    },
    feedCardDesc: {

    },
    feedCardImage: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    },

    reactionsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    reactionIcon: {
        marginLeft: 30,
        width: 30,
        height: 30
    }
});

export default function FeedCard({ navigation, item }) {
    const { userId, title, desc, price, imageUri, comments } = item;

    return (
        <View style={styles.feedCardContainer}>
            <Text style={styles.feedCardTitle}>{title}</Text>
            <Image style={styles.feedCardImage} source={{ uri: imageUri }} />
            <Text style={styles.feedCardPrice}>{price}</Text>
            <Text style={styles.feedCardDesc}>{desc}</Text>

            <View style={styles.reactionsContainer}>
                <Pressable onPress={() => navigation.navigate('Comments', { comments: comments })}>
                    <Image style={styles.reactionIcon} source={require('../assets/chatbox-outline.png')}></Image>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Add to List', { userId: userId, title: title, item: item  })}>
                    <Image style={styles.reactionIcon} source={require('../assets/list-circle-outline.png')}></Image>
                </Pressable>
            </View>
        </View>
    );
}