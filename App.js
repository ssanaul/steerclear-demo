import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Menu from './Menu'
import SideMenu from 'react-native-side-menu';

export default class App extends React.Component {
	render() {
    const menu = <Menu navigator={navigator}/>;

		return (
			<View style={styles.container}>
				<SideMenu menu={menu}>
					<MapView
					style={styles.map}
					initialRegion={{
						latitude: 40.1020,
						longitude: -88.2272,
						latitudeDelta: 0.0722,
						longitudeDelta: 0.0221,
					}}
				/>
				</SideMenu>
			</View>
		);
	}
}

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});
