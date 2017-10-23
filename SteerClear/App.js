import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.map}
					initialRegion={{
						latitude: 40.1020,
						longitude: -88.2272,
						latitudeDelta: 0.0722,
						longitudeDelta: 0.0221,
					}}
				/>
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
