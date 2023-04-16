import React, {useEffect, useState} from 'react';
import {View, FlatList, TextInput, StyleSheet} from 'react-native';
import AppColors from '../../styling';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import CustomFriends, {
  Friend,
} from '../../components/CustomFriends/CustomFriends';

const currentUser = {
  id: 2,
  username: 'janedoe',
  picture_url: 'https://randomuser.me/api/portraits/women/2.jpg',
};

const CustomSearch = () => {
  return (
    <View style={styles.search}>
      <TextInput placeholder="Search users" style={styles.input} />
      <MaterialIcons
        name="magnify"
        size={20}
        style={styles.iconSearch}
        color="black"
      />
    </View>
  );
};

const ContactsScreen = ({navigation: {goBack}}: any) => {
  const [isYours, setIsYours] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        sent_by: {
          id: currentUser.id,
          username: currentUser.username,
          picture_url: currentUser.picture_url,
        },
        sent_to: {
          id: 3,
          username: 'johnsmith',
          picture_url: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        updated_at: '2022-10-01T12:00:00Z',
        accepted: 1,
      },
      {
        id: 2,
        sent_by: {
          id: 4,
          username: 'sarahjones',
          picture_url: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
        sent_to: {
          id: currentUser.id,
          username: currentUser.username,
          picture_url: currentUser.picture_url,
        },
        updated_at: '2022-09-15T08:30:00Z',
        accepted: 1,
      },
      {
        id: 3,
        sent_by: {
          id: currentUser.id,
          username: currentUser.username,
          picture_url: currentUser.picture_url,
        },
        sent_to: {
          id: 8,
          username: 'decknose',
          picture_url: 'https://randomuser.me/api/portraits/men/8.jpg',
        },
        updated_at: '2022-08-20T16:45:00Z',
        accepted: 0,
      },
      {
        id: 5,
        sent_by: {
          id: 10,
          username: 'meryjane',
          picture_url: 'https://randomuser.me/api/portraits/women/11.jpg',
        },
        sent_to: {
          id: currentUser.id,
          username: currentUser.username,
          picture_url: currentUser.picture_url,
        },
        updated_at: '2022-08-20T16:45:00Z',
        accepted: 0,
      },
      {
        id: 4,
        sent_by: {
          id: 8,
          username: 'amywright',
          picture_url: 'https://randomuser.me/api/portraits/women/8.jpg',
        },
        sent_to: {
          id: currentUser.id,
          username: currentUser.username,
          picture_url: currentUser.picture_url,
        },
        updated_at: '2022-07-05T10:20:00Z',
        accepted: -1,
      },
    ];

    setFriends(data);
  }, []);

  const changeTab = () => {
    setIsYours(!isYours);
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconArrow}>
          <MaterialIcons.Button
            backgroundColor={AppColors.DEFAULT_BACKGROUND}
            name="chevron-left"
            size={50}
            color="black"
            style={{paddingHorizontal: 0}}
            onPress={() => goBack()}
          />
        </View>

        <CustomSearch />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}>
        <Button
          mode="outlined"
          textColor="black"
          disabled={isYours}
          style={styles.button}
          onPress={() => changeTab()}>
          Your Friends
        </Button>

        <Button
          mode="outlined"
          textColor="black"
          disabled={!isYours}
          style={styles.button}
          onPress={() => changeTab()}>
          New Friends
        </Button>
      </View>
      <View style={styles.container}>
        {isYours ? <CustomFriends friends={friends} /> : <></>}
      </View>
    </>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  button: {
    width: '35%',
    borderRadius: 10,
  },

  search: {
    borderColor: '#d4d4d4',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    width: '75%',
    marginVertical: '10%',
    paddingLeft: '2%',
    backgroundColor: '#d4d4d4',
  },

  input: {
    width: '90%',
    paddingVertical: 5,
    color: 'black',
  },

  iconSearch: {
    alignSelf: 'center',
  },

  iconArrow: {
    alignSelf: 'center',
    marginLeft: '2%',
  },
});
