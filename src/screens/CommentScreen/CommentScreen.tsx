import { View, ScrollView, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native'
import React, { useState } from 'react'
import Posts from '../../components/Post';
import Comments from '../../components/Comments/Comments';
import Icons from 'react-native-vector-icons/AntDesign';
import PostIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Comment, Post } from '../../util/interface';
import { addComment, postById } from '../../services/AppService';

const CommentScreen = ({ route, navigation }: any) => {
    const { post } = route.params;   
    const [commentText, setCommentText] = useState('');
    const handleCommentSubmit = async (commentText: string, post: any) => {
      await addComment(post.id, commentText)
      postById(post.id).then(res => {
        const postsData = res.data;
        postsData.map((post: Post) => (
          navigation.setParams({ post: post})
        ))
      });
      Keyboard.dismiss()
  };
  
  return (
    <View>
    <View style={{margin: 5}}>
        <Icons name={'left'} size={40} color={'black'} onPress={() => navigation.push('Home')}/>
    </View>
    <ScrollView style={{marginBottom: 100}}>
      <Posts post={post} />
      {post.comments.map((comment: Comment) => (
        <Comments comment={comment} />
      ))}
    </ScrollView>
    <View style={styles.commentInputContainer}>
      <TextInput
        style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 5, paddingLeft: 10 }}
        placeholder="Write a comment"
        onChangeText={setCommentText}
        value={commentText}
      />
        <TouchableOpacity onPress={() => handleCommentSubmit(commentText, post)} style={styles.commentIcon}>
          <PostIcon name="send" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 50
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  commentIcon: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default CommentScreen