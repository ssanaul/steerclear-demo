import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	TouchableOpacity,
	Image,
	Modal,
	Dimensions,
	} from 'react-native';
import {
	Button,
	} from 'react-native-elements';
import MapView from 'react-native-maps';
import Menu from './Menu'
import SideMenu from 'react-native-side-menu';
import call from 'react-native-phone-call'

const window = Dimensions.get('window');
const menuIcon = require('./assets/menu.png');
const markerIcon = require('./assets/marker.png');
const rideIcon = require('./assets/ride.png');
const iconSize = 29;
const closeIcon = require('./assets/close.png');

const safewalks = {
  number: '2173331216',
  prompt: true,
}

const saferides = {
  number: '2172657433',
  prompt: true,
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
	rideModalContainer: {
		width: .9*window.width,
		height: .5*window.height,
		marginLeft: .05*window.width,
		marginTop: .25*window.height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(161,237,255,.8)',
		borderRadius: 2,
	},
	closeRideModalButton: {
		position: 'absolute',
		top: -10,
		right: -10,
	},
	reportModalContainer: {
		width: .9*window.width,
		height: .5*window.height,
		marginLeft: .05*window.width,
		marginTop: .25*window.height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(232,48,48,.8)',
		borderRadius: 2,
	},
	reportModalText: {
		color: 'white',
		fontSize: 32,
	},
	closeReportModalButton: {
		position: 'absolute',
		top: -10,
		right: -10,
	},
});

export default class App extends React.Component {
	constructor(props){
		super(props);
		
		this.toggle = this.toggle.bind(this);
		this.toggleRideModal = this.toggleRideModal.bind(this);
		this.toggleReportModal = this.toggleReportModal.bind(this);
		
		this.state = {
			isOpen: false,
			selectedItem: 'About',
			markers: [
				{
					key: 0,
					latlng: {latitude: 40.1020, longitude: -88.2272},
					title: 'Car accident',
					description: 'Authorized by police',
				},
				{
					key: 1,
					latlng: {latitude: 40.1090, longitude: -88.2272},
					title: 'Unlith path',
					description: 'Authorized by Student Patrol',
				},
				{
					key: 2,
					latlng: {latitude: 40.1040, longitude: -88.2372},
					title: 'Suspicious man',
					description: 'Pacing outside Nugent',
				},
			],
			rideModalIsVisible: false,
			reportModalIsVisible: false,
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
		
	toggleRideModal(){
		this.setState({
			rideModalIsVisible: !this.state.rideModalIsVisible,
		});
	}
	
	updateRideModalState(isVisible){
		this.setState({ rideModalIsVisible });
	}
	
	toggleReportModal(){
		this.setState({
			reportModalIsVisible: !this.state.reportModalIsVisible,
		});
	}
	
	updateReportModalState(isVisible){
		this.setState({ reportModalIsVisible });
	}
	
	
		
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
					>
						{this.state.markers.map(marker => (
							<MapView.Marker
								key={marker.key}
								coordinate={marker.latlng}
								title={marker.title}
								description={marker.description}
							/>
						))}
					</MapView>
					<TouchableOpacity
						onPress={this.toggle}
						style={styles.menuButton}
					>
					    <Image
							source={menuIcon}
							style={{ width: iconSize, height: iconSize, backgroundColor: 'white', padding: 20,
							borderRadius: 20, opacity: .8 }}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={this.toggleReportModal}
						style={styles.markerButton}
					>
					    <Image
							source={markerIcon}
							style={{ width: iconSize, height: iconSize, backgroundColor: '#ff5033', padding: iconSize,
							borderRadius: iconSize, opacity: .8 }}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={this.toggleRideModal}
						style={styles.rideButton}
					>
					    <Image
							source={rideIcon}
							style={{ width: iconSize, height: iconSize, backgroundColor: '#8ae0f4', padding: iconSize,
							borderRadius: iconSize, opacity: .8 }}
						/>
					</TouchableOpacity>
					
				</SideMenu>
				
				<Modal
					style={styles.rideModal}
					visible={this.state.rideModalIsVisible}
					transparent={true}
				>
					<View style={styles.rideModalContainer}>
						<TouchableOpacity
							onPress={this.toggleRideModal}
							style={styles.closeRideModalButton}
						>
							<Image
								source={closeIcon}
								style={{ width: iconSize, height: iconSize, padding: iconSize-10}}
							/>
						</TouchableOpacity>
						<Button
							raised
							large
							title='Call SafeWalks'
							icon={{name: 'phone', type: 'font-awesome'}}
							backgroundColor='#fd686c'
							onPress={
								function(){
									call(safewalks).catch();
									}
								}
							/>
						<Text style={{fontSize: 18,marginBottom: 50}}>217-333-1216</Text>
						<Button
							raised
							large
							title='Call SafeRides'
							icon={{name: 'phone', type: 'font-awesome'}}
							backgroundColor='#fb614b'
							onPress={
								function(){
									call(saferides).catch();
									}
								}
							/>
						<Text style={{fontSize: 18}}>217-265-7433</Text>
					</View>
				</Modal>
				
				<Modal
					style={styles.reportModal}
					visible={this.state.reportModalIsVisible}
					transparent={true}
				>
					<View style={styles.reportModalContainer}>
						<TouchableOpacity
							onPress={this.toggleReportModal}
							style={styles.closeReportModalButton}
						>
							<Image
								source={closeIcon}
								style={{ width: iconSize, height: iconSize, padding: iconSize-10}}
							/>
						</TouchableOpacity>
						<Text style={styles.reportModalText}>
							File a report
						</Text>
					</View>
				</Modal>
				
				
			</View>
		);
	}
}