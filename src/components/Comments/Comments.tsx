import { View, Text, Image } from 'react-native'
import React, { useMemo } from 'react'
import { Comment } from '../../util/interface';
import { Divider } from 'react-native-elements';
import { API_URL } from '@env';


interface Props {
  comment: Comment;
}

const Comments: React.FC<Props> = ({comment}) => { 
  const timeAgo = useMemo(() => {
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const diff = Math.abs(now.getTime() - createdAt.getTime());
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) {
      return "just now";
    } else if (minutes === 1) {
      return "1 minute ago";
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (minutes < 120) {
      return "1 hour ago";
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hours ago`;
    } else if (minutes < 2880) {
      return "1 day ago";
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} days ago`;
    }
  }, [comment.createdAt]);
  return (
    <View style={{marginBottom: 20}}>
      <Divider width={1} orientation="vertical" />
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
          <Image
            source={{uri: `${API_URL}/` + comment.commentProfilePictureUrl}}
            style={{width: 35, height: 35, borderRadius: 50, marginLeft: 6}}
          />
          <Text style={{marginLeft: 8, fontWeight: '700', fontSize: 18}}>{comment.commentByUsername}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginLeft: 50, marginRight: 80}}>{comment.comment}</Text>
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 20}}>
          <Text style={{fontSize: 12, color: 'gray'}}>{timeAgo}</Text>
      </View>
    </View>
  )
}

export default Comments