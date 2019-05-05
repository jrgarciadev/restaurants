import React, { Component } from 'react';
import { AsyncStorage, Text, View }  from 'react-native';
import { Card, Input } from 'react-native-elements';
import AppButton from '../components/AppButton';
import Toast from 'react-native-simple-toast';
import Icon from "react-native-vector-icons/Ionicons";

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: '',
				age: ''
			}
		};
	}
	
	componentsDidMount() {
		this.fetch().then( () => {
			Toast.showWithGravity(
				"Usuario obtenido",
				Toast.LONG,
				Toast.CENTER
				);
		});
	}

	updateName(val) {
		let state = this.state.user;
		this.setState({
			user: Object.assign({}, state, {
				name: val
			})
		});
	}

	updateAge(val) {
		let state = this.state.user;
		this.setState({
			user: Object.assign({}, state, {
				age: val
			})
		});
	}

	async save() {
		try {
			const user = {
				name : this.state.user.name,
				age: this.state.user.age
			}
			await AsyncStorage.setItem('user', JSON.stringify(user));
			Toast.showWithGravity(
				"Usuario guardado exitosamente",
				Toast.LONG,
				Toast.CENTER
				);
		} catch (error) {
			Toast.showWithGravity(
				"Error al intentar guardar el usuario",
				Toast.LONG,
				Toast.CENTER
				);
		}
	}

	async fetch() {
		try {
			let user = await AsyncStorage.getItem('user');
			if (user) {
				let parsed = JSON.parse(user);
				this.setState({ user: parsed });
			}
		} catch (error) {
			Toast.showWithGravity(
				"Error al intentar obtener el usuario",
				Toast.LONG,
				Toast.CENTER
				);
		}
	}
	render() {
		const { user } = this.state;
		return (
			<View>
			<Card>
			<Input
			placeholder="Nombre de usuario"
			shake={true}
			value={user.name}
			onChangeText={(val) => this.updateName(val)}
			/>
			<Input
			placeholder="Edad del usuario"
			shake={true}
			value={user.age}
			onChangeText={(val) => this.updateAge(val)}
			/>
			<View style={{marginTop: 12}}>
			<AppButton
			bgColor="#F47B00"
			title="Guardar en local "
			action={this.save.bind(this)}
			iconName="md-save"
			iconSize={30}
			iconColor="#fff"
			/>
			</View>
			</Card>
			</View>
			);
	}
}


export default Profile;