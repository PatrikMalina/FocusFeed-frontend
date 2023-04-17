import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';
import {allPosts, checkMe } from '../../services/AppService';
import Posts from '../../components/Post';
import {ScrollView} from 'react-native-gesture-handler';
import {RootState} from '../../state/store';
import {Post, User} from '../../util/interface';

const HomeScreen = ({navigation}: any) => {
  const {removeToken, removeUser, setUser} = bindActionCreators(
    ActionCreators,
    useDispatch(),
  );

  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [posts, setPosts] = useState<Post[]>([]);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    checkMe().then(res => {
      if (res !== undefined) {
        const user = res.data;
        setUser(user);
      }
    });

    allPosts().then(res => {
      setPosts(res.data);
    });
      .catch(error => {
        console.warn(error);
      });
  }, []);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

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
      <ScrollView style={{marginBottom: 50}}>
        {posts.map((post, index) => (
          <TouchableOpacity onPress={() => navigation.push('Comment', { post })}>
            <Posts post={post} key={index} />
          </TouchableOpacity>
        ))} 
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
