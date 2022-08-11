import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, TextInput } from 'react-native';
import axios from 'axios';
import FeedCard from '../components/feedCard';
import { ListModal } from './ListView';

const styles = StyleSheet.create({
    feedViewContainer: {
        marginTop: 70,
        margin: 20,
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 30,
        fontWeight: '700'
    }
});

const FeedStack = createNativeStackNavigator();

export default function FeedStackController(){
    return(
        <FeedStack.Navigator>
            <FeedStack.Group screenOptions={{ headerShown: false }}>
                <FeedStack.Screen name='FeedView' component={FeedView} />
            </FeedStack.Group>
            <FeedStack.Group screenOptions={{ presentation: 'modal' }}>
                <FeedStack.Screen name="Comments" component={CommentModal} />
                <FeedStack.Screen title="List" name="Add to List" component={ListModal} />
            </FeedStack.Group>
        </FeedStack.Navigator>
    );
}

export function FeedView({ navigation }){
    const [feedItems, setFeedItems] = useState([]);

    useEffect(() => {
        async function getFeedItems(){
            try{
                let res = await axios.get('http://192.168.1.31:8080/feedItem/barkley/Raisin');
                console.log(res.data.data);
                setFeedItems([...feedItems, res.data.data.data]);
            }catch(err){
                console.error(err);
            }
        }

        getFeedItems();
    }, []);

    return(
        <ScrollView style={styles.feedViewContainer} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Feed</Text>

                {feedItems.map((item, index) => {
                    return(
                        <FeedCard key={'FeedCard_' + index} navigation={navigation} item={item} />
                    );
                })}
        </ScrollView>
    );
}

export function CommentModal({ route }){
    const s = StyleSheet.create({
        commentModal: {
            margin: 20,
        },
        commentModalHeaderContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        commentModalHeaderIcon: {
            width: 40,
            height: 40
        },
        commentInput: {
            padding: 10,
            color: '#F5F5F5',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 8,
            backgroundColor: 'white'
        },

        commentContainer: {
            flex: 1,
            flexDirection: 'column',
            minHeight: 100,
            marginTop: 20,
            padding: 10,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 8
        },
        commentHeaderContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        displayName: {
            fontSize: 15,
            fontWeight: '600'
        },
        comment: {
            fontSize: 15,
            fontWeight: '400'
        },
        icon: {
            width: 50,
            height: 50,
            borderRadius: 50,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'white'
        }
    });

    const { comments } = route.params;
    const [newCommentText, setNewCommentText] = useState('');
    const [commentsList, setCommentsList] = useState(comments);

    const createComment = async () => {
        const newComment = {
            'userId': 'bryce',
            'displayName': 'Bryce Blankinship',
            'profileUri': 'https://pngset.com/images/icono-de-mi-cuenta-clipart-download-default-profile-picture-footprint-transparent-png-306148.png',
            'comment' : newCommentText
        }

        try{
            let res = await axios.patch('http://192.168.1.31:8080/feedItem/barkley/Raisin', newComment);
            // TODO: make sure res status is 200, otherwise post error dialogue
            setCommentsList([newComment, ...commentsList]);
        }catch(err){
            console.error(err);
        }
    }

    return(
        <ScrollView>
            <View style={s.commentModal}>
                <TextInput style={s.commentInput} placeholder='Add a comment...' returnKeyType='done' onChangeText={text => setNewCommentText(text)} onSubmitEditing={createComment}></TextInput>

                {commentsList.map((comment, index) => {
                    return(
                        <View key={index} style={s.commentContainer}>
                            <View key={'headerContainer_' + index} style={s.commentHeaderContainer}>
                                <Text key={'displayName_' + index} style={s.displayName}>{comment.displayName}</Text>
                                <Image key={'profileIcon_' + index} style={s.icon} source={{ uri: comment.profileUri }} />
                            </View>
                            <Text key={'comment_' + index} style={s.comment}>{comment.comment}</Text>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}