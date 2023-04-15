import {View, Text, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';
import {checkMe, myPosts} from '../../services/AppService';
import Posts from '../../components/Post';
import { ScrollView } from 'react-native-gesture-handler';
import store, { RootState } from '../../state/store';
import { Post, User } from '../../util/interface';

const HomeScreen = () => {
  const {removeToken, removeUser, setUser} = bindActionCreators(
    ActionCreators,
    useDispatch(),
  );
  const [currentUser, setCurrentUser] = useState<User | null | undefined>()
  const [posts, setPosts] = useState<Post[]>([])
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {   
    checkMe().then(
      res => {
        const user = res.data
        setUser(user)
      }
    );
  }, []);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() =>{
        myPosts().then(res => {
            const postsData = res.data
            setPosts(postsData)
        })
    }, [posts])
  return (
    <View>
      <Text>Signed in! {currentUser?.username}</Text>
      <Button
        title="Sign out"
        onPress={() => {
          removeToken();
          removeUser();
          console.log('sign out');
        }}
      />
      <ScrollView>
        {posts.map((post, index) =>(
            <Posts post={post} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
