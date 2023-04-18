import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import store from '../../state/store'
import { API_URL } from '@env'
import CustomButton from '../../components/CustomButton/CustomButton'
import { deletePost, myPosts } from '../../services/AppService'
import { Post } from '../../util/interface'
import { Screens } from '../../util/enums'

const ProfileScreen = ( {navigation}: any) => {
    const user = store.getState().user
    const [posts, setPosts] = useState<Post[]>([]);

    const onDeletePost = (postId: number) => {
        Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'Delete',
                onPress: () => {
                  deletePost(postId).then(res => {
                    console.log(res.data);
                    setPosts(posts.filter(p => p.id !== postId));
                  })
                  .catch(error => {
                    console.warn(error);
                  });
                },
                style: 'destructive'
              }
            ]
          );
    }

    useEffect(() => {
      myPosts().then(res => {
        setPosts(res.data);      
      })
      .catch(error => {
        console.warn(error);
      });
    
    }, [])
    

  return (
    <ScrollView>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
            <Image source={{ uri: `${API_URL}/`+user?.pictureUrl }} style={{flex: 1}} />
        </View>
        <Text style={styles.username}>{user?.username}</Text>
      </View>
      <View style={styles.settingsContainer}>
        <CustomButton text="SETTINGS" onPress={() => navigation.push(Screens.SETTINGS)}/>
      </View>
      <View style={styles.postsContainer}>
        {posts.map(post => (
          <TouchableOpacity key={post.id} onPress={() => onDeletePost(post.id)}>
          <Image source={{ uri: `${API_URL}/`+post.pictureUrl }} style={styles.postImage} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 20,
    },
    profileImageContainer: {
      height: 200,
      width: 200,
      borderRadius: 90,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    settingsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    postsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      paddingHorizontal: 5,
    },
    postImage: {
        width: 150,
        height: 150,
        marginVertical: 5,
      },
  });

export default ProfileScreen