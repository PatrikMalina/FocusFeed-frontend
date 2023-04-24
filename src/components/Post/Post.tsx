import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {Divider} from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import {likePost} from '../../services/AppService';
import {Post} from '../../util/interface';
import {API_URL} from '@env';
import store from '../../state/store';

interface Props {
  post: Post;
}

const Posts: React.FC<Props> = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLikePost = async () => {
    try {
      await likePost(post.id);
      setLiked(true);
      setLikesCount(prevCount => prevCount + 1);
    } catch (error) {
      console.warn(error);
    }
  };

  const openMap = () => {
    const x = post.location?.x
    const y = post.location?.y
    const url = `https://www.google.com/maps/search/?api=1&query=${y},${x}`;
    Linking.openURL(url);
  };

  useEffect(() => {
    const hasUserLikedPost = post.likes.some(
      like => like.userId == store.getState().user?.id,
    );
    setLiked(hasUserLikedPost);   
  }, [post.likes]);
 
  return (
    <View style={{marginBottom: 60}}>
      <Divider width={1} orientation="vertical" />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: `${API_URL}/` + post.profilePictureUrl}}
            style={{width: 35, height: 35, borderRadius: 50, marginLeft: 6}}
          />
          <Text style={{marginLeft: 8, fontWeight: '700', fontSize: 18}}>
            {post.createdByUsername}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
        }}>
        <Image
          source={{uri: `${API_URL}/` + post.pictureUrl}}
          style={{width: '80%', height: 250, resizeMode: 'contain'}}
        />
      </View>

      <View style={{marginLeft: '10%', flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {if (!liked){handleLikePost()}}}>
          <Image
            style={{width: 30, height: 30}}
            source={{
              uri: liked
                ? `${API_URL}/images/like.png`
                : `${API_URL}/images/nolike.png`,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 5,
            marginTop: 5,
            fontWeight: '600',
            fontSize: 12,
          }}>
          {likesCount} likes
        </Text>
      </View>
        {post.location && (
          <TouchableOpacity onPress={openMap} style={{marginLeft: '10%'}}>
        <Text style={{fontWeight: '600', fontSize: 14}}>
          Location
        </Text>
        </TouchableOpacity>
    )}

      <View style={{marginTop: 5}}>
        <Text style={{marginLeft: '10%', fontWeight: '600'}}>
          {post.caption}
        </Text>
      </View>
    </View>
  );
};

export default Posts;
