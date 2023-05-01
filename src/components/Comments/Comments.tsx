import {View, Text, Image} from 'react-native';
import React from 'react';
import {Comment} from '../../util/interface';
import {Divider} from 'react-native-elements';
import {formatDistance} from 'date-fns';
import {API_URL} from '../../services/Config';

interface Props {
  comment: Comment;
}

const Comments: React.FC<Props> = ({comment}) => {
  const relativeDate = () => {
    const dateValue = new Date(comment.createdAt);
    return formatDistance(dateValue, new Date(), {
      addSuffix: true,
    });
  };
  return (
    <View style={{marginBottom: 20}}>
      <Divider width={1} orientation="vertical" />
      <View style={{flexDirection: 'row', alignItems: 'center', margin: 20}}>
        <Image
          source={{uri: `${API_URL}/` + comment.commentProfilePictureUrl}}
          style={{width: 35, height: 35, borderRadius: 50, marginLeft: 6}}
        />
        <Text style={{marginLeft: 8, fontWeight: '700', fontSize: 18}}>
          {comment.commentByUsername}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginLeft: 50, marginRight: 80}}>{comment.comment}</Text>
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 20}}>
        <Text style={{fontSize: 12, color: 'gray'}}>{relativeDate()}</Text>
      </View>
    </View>
  );
};

export default Comments;
