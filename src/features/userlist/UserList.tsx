import React, {useEffect} from 'react';
import {FunctionComponent} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchUsers, User} from './userListSlice';

const UserList: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const screenState = useAppSelector(state => state.userList);

  useEffect(() => {
    dispatch(fetchUsers({page: 1}));
  }, [dispatch]);

  const handleOnEndReached = () => {
    if (!screenState.loading) {
      dispatch(fetchUsers({page: screenState.nextPage}));
    }
  };

  return (
    <>
      <View style={style.status}>
        {screenState.loading && <Text style={style.statusText}>LOADING</Text>}
        {screenState.error && <Text style={style.statusText}>ERROR</Text>}
        {!screenState.error && !screenState.loading && (
          <Text style={style.statusText}>READY</Text>
        )}
      </View>
      <FlatList
        data={screenState.users}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return <UserListItem user={item} />;
        }}
        onEndReached={handleOnEndReached}
      />
    </>
  );
};

const UserListItem: FunctionComponent<{user: User}> = ({user}) => {
  return (
    <View style={style.container}>
      <Image source={{uri: user.picture.thumbnail}} style={style.thumbnail} />
      <Text style={style.nameText}>{user.name.first}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  status: {
    width: '100%',
    height: 75,
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  statusText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  nameText: {
    padding: 15,
    fontWeight: '500',
    fontSize: 20,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'purple',
    borderWidth: 3,
  },
});

export default UserList;
