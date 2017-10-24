import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View,
	TouchableOpacity,
	Image,
	Modal,
	Dimensions,
	TextInput,
	} from 'react-native';
import {
	Button,
	FormLabel,
	FormInput,
	FormValidationMessage,
	CheckBox,
	} from 'react-native-elements';
	
import MapView from 'react-native-maps';
import Menu from './Menu'
import SideMenu from 'react-native-side-menu';
import call from 'react-native-phone-call';

const window = Dimensions.get('window');
const menuIcon = require('./assets/menu.png');
const markerIcon = require('./assets/marker.png');
const rideIcon = require('./assets/ride.png');
const iconSize = 42;
const closeIcon = require('./assets/close.png');

const safewalks = {
  number: '2173331216',
  prompt: true,
}
const saferides = {
  number: '2172657433',
  prompt: true,
}
const callErr = "Err: Could not make call";

const apiKey = 'AIzaSyASYV0vUMhJq28hX1zrE3sI2jEd689CAI8';

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
		left: 10,
		padding: 10,
		backgroundColor: 'rgba(186,186,186,.7)',
		borderRadius: iconSize,
	},
	markerButton: {
		position: 'absolute',
		bottom: 20,
		right: 10,
		padding: 10,
		backgroundColor: 'rgba(255,80,51,.7)',
		borderRadius: iconSize,
	},
	rideButton: {
		position: 'absolute',
		bottom: 20,
		left: 10,
		padding: 10,
		backgroundColor: 'rgba(138,224,244,.7)',
		borderRadius: iconSize,
	},
	rideModalContainer: {
		width: .9*window.width,
		height: .5*window.height,
		marginLeft: .05*window.width,
		marginTop: .25*window.height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(235,245,255,.9)',
		borderRadius: 2,
		borderColor: 'rgba(161,237,255,.1)',
		borderWidth: 1,
	},
	closeRideModalButton: {
		position: 'absolute',
		top: -10,
		right: -10,
	},
	reportModalContainer: {
		width: .9*window.width,
		height: .6*window.height,
		marginLeft: .05*window.width,
		marginTop: .2*window.height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(232,48,48,.9)',
		borderRadius: 2,
		borderColor: 'white',
		borderWidth: 1
	},
	reportModalHeading: {
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
		this.toggleAnonymousReport = this.toggleAnonymousReport.bind(this);
		this.updateDescription = this.updateDescription.bind(this);
		this.updateAddress = this.updateAddress.bind(this);
		
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
			reportIsAnonymous: false,
			description: '',
			address: '',
			markerIndex: 3,
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
	
	toggleAnonymousReport(){
		this.setState({
			reportIsAnonymous: !this.state.reportIsAnonymous,
		});
	}
	
	updateDescription(event){
		this.setState({
			description: event.nativeEvent.text,
		});
	}
	
	updateAddress(event){
		this.setState({
			address: event.nativeEvent.text,
		});
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
							style={{ width: iconSize, height: iconSize, opacity: .9 }}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={this.toggleReportModal}
						style={styles.markerButton}
					>
					    <Image
							source={markerIcon}
							style={{ width: iconSize, height: iconSize, opacity: .9 }}
						/>
					</TouchableOpacity>
					
					<TouchableOpacity
						onPress={this.toggleRideModal}
						style={styles.rideButton}
					>
					    <Image
							source={rideIcon}
							style={{ width: iconSize, height: iconSize, opacity: .9 }}
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
								style={{ width: iconSize, height: iconSize, padding: 20}}
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
									call(safewalks).catch(console.log(callErr));
									}
								}
							/>
						<Text style={{fontSize: 18,marginBottom: 50}}>217-333-1216</Text>
						<Button
							raised
							large
							title='Call SafeRides'
							icon={{name: 'phone', type: 'font-awesome'}}
							backgroundColor='#ec464c'
							onPress={
								function(){
									call(saferides).catch(console.log(callErr));
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
								style={{ width: iconSize, height: iconSize, padding: 20}}
							/>
						</TouchableOpacity>
						<Text style={styles.reportModalHeading}>
							File a report
						</Text>
						
						<FormLabel labelStyle={{color:'white'}}>Description</FormLabel>
						<FormInput
							inputStyle={{color:'white', width: 300}}
							onChange={this.updateDescription.bind(this)}/>
						<FormLabel labelStyle={{color:'white'}}>Address</FormLabel>
						<FormInput
							inputStyle={{color:'white', width: 300}}
							onChange={this.updateAddress.bind(this)}/>
						<Button 
							style={{marginTop: 10, marginBottom: 10}}
							backgroundColor='rgba(255,255,255,.3)'
							borderRadius={5}
							title='Use current location'
							icon={{name: 'location-arrow', type: 'font-awesome'}}
						/>
						
						<CheckBox
							title='Anonymous'
							checked={this.state.reportIsAnonymous}
							onIconPress={this.toggleAnonymousReport}
							onPress={this.toggleAnonymousReport}
							containerStyle={{
								backgroundColor: 'rgba(255,255,255,0)',
								borderWidth: 0,
								}}
							textStyle={{color:'white'}}
						/>
						<Text>{this.state.description}</Text>
						<Button
							raised
							title='Submit'
							color='black'
							backgroundColor='#dedede'
							borderRadius={5}
							style={{marginTop: 10}}
						/>
					</View>
				</Modal>
				
				
			</View>
		);
	}
}