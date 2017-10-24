import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
const avi = require('./assets/avi.jpg');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#bababa',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
	marginBottom: 5,
  },
  itemHeader: {
	borderBottomWidth: 1,
	borderColor: 'black',
	marginBottom: 7,
  },
  footer: {
	position: 'absolute',
	top: window.height-75
  }
});

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          source={avi}
          style={styles.avatar}
        />
        <Text style={styles.name}>ss7@illinois.edu</Text>
      </View>
	  
	  <View style={styles.itemHeader}>
	  <Text style={styles.item}>Saved locations</Text>
	  </View>

      <Text
        onPress={() => onItemSelected('Home')}
        style={styles.item}
      >
        Home
      </Text>

      <Text
        onPress={() => onItemSelected('Union')}
        style={styles.item}
      >
        Illini Union
      </Text>
	  
      <Text
        onPress={() => onItemSelected('Library')}
        style={styles.item}
      >
        Main Library
      </Text>
	  
	  <View style={styles.footer}>
		<Text>SteerClear</Text>
		<Text style={{textDecorationLine:'underline'}}>Log out | Report a bug</Text>
	  </View>
    </ScrollView>
  );
}
{/*
Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
*/}