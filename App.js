import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	TouchableOpacity,
	Image
	} from 'react-native';
import MapView from 'react-native-maps';
import Menu from './Menu'
import SideMenu from 'react-native-side-menu';

const menuIcon = require('./assets/menu.png');
const markerIcon = require('./assets/marker.png');
const rideIcon = require('./assets/ride.png');

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
	menuButton: {
		position: 'absolute',
		top: 20,
		padding: 10,
	},
	markerButton: {
		position: 'absolute',
		bottom: 20,
		right: 0,
		padding: 10,
	},
	rideButton: {
		position: 'absolute',
		bottom: 20,
		padding: 10,
	},
});



export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.toggle = this.toggle.bind(this);
		
		this.state = {
			isOpen: false,
			selectedItem: 'About',
		};
	}
	
	toggle(){
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}
	
	updateMenuState(isOpen){
		this.setState({ isOpen });
	}
	
	onMenuItemSelected = item =>
		this.setState({
			isOpen: false,
			selectedItem: item,
		});
		
	render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigator={navigator}/>;

		return (
			<View style={styles.container}>
				<SideMenu
					menu={menu}
					isOpen={this.state.isOpen}
					onChange={isOpen => this.updateMenuState(isOpen)}
				>
					
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: 40.1020,
							longitude: -88.2272,
							latitudeDelta: 0.0722,
							longitudeDelta: 0.0221,
						}}
					/>
					
					<TouchableOpacity
						onPress={this.toggle}
						style={styles.menuButton}
					>
					    <Image
							source={menuIcon}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={this.toggle}
						style={styles.markerButton}
					>
					    <Image
							source={markerIcon}
							style={{ width: 40, height: 40 }}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={this.toggle}
						style={styles.rideButton}
					>
					    <Image
							source={rideIcon}
							style={{ width: 40, height: 40 }}
						/>
					</TouchableOpacity>
					
				</SideMenu>
			</View>
		);
	}
}