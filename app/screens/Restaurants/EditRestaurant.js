import React, { Component } from 'react';
import * as firebase from "firebase";
import AppButton from "../../components/AppButton";
import { StyleSheet, View } from 'react-native';
import { options, Restaurant } from "../../forms/restaurant";
import t from "tcomb-form-native";
import { Card } from "react-native-elements";
const Form = t.form.Form;
import { NavigationActions } from 'react-navigation';
import Toast from "react-native-simple-toast";

class EditRestaurant extends Component {
	constructor(props) {
		super(props);
		const { params } = props.navigation.state;
		this.state = {
			restaurant: params.restaurant
		}
	}

	update() {
		const validate = this.refs.form.getValue();
		if (validate) {
			let data = Object.assign({}, validate);
			const ref = firebase.database().ref().child(`restaurants/${this.state.restaurant.id}`);
			ref.update(data).then( () => {
				Toast.showWithGravity(
		            "Restaurante actualizado exitosamente",
		            Toast.LONG,
		            Toast.CENTER
		         );
				const navigateAction = NavigationActions.navigate({
					routeName: 'DetailRestaurant',
					params: { restaurant: this.state.restaurant }
				});
				this.props.navigation.dispatch(navigateAction);
			});
		}
	}

	onChange( restaurant ) {
		this.setState({ restaurant });
	}

	render() {
		const { restaurant } = this.state;
		return (
			<View styles={styles.container}>
				<Card title="Editar Restaurante">
					<View>
						<Form
						ref="form"
						type={Restaurant}
						options={options}
						value={restaurant}
						onChange={v => this.onChange(v)}
						/>
					</View>
					<AppButton
					bgColor="#F47B00"
					title="Actualizar "
					action={this.update.bind(this)}
					iconName="md-create"
					iconSize={30}
					iconColor="#fff"
					/>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFB300",
    padding: 10
  }
});


export default EditRestaurant;