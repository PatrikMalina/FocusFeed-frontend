import {View, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionCreators from '../../state/action-creators';
import {allPosts} from '../../services/AppService';
import Posts from '../../components/Post';
import {ScrollView} from 'react-native-gesture-handler';
import {Post} from '../../util/interface';
import {Screens} from '../../util/enums';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = ({navigation}: any) => {
  const {removeToken, removeUser} = bindActionCreators(
    ActionCreators,
    useDispatch(),
  );

  const [posts, setPosts] = useState<Post[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      allPosts()
        .then(res => {
          setPosts(res.data);
        })
        .catch(error => {
          console.warn(error);
        });
    }, []),
  );

  return (
    <View>
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
          <TouchableOpacity
            key={index}
            onPress={() => navigation.push(Screens.COMMENT, {post})}>
            <Posts post={post} key={index} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
