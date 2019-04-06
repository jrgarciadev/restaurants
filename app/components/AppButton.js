import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

export default class AppButton extends Component {
	render() {
		const {action, iconName, iconColor, title, bgColor} = this.props;
		const {width} = Dimensions.get('window');
		return(
			<Button
				onPress={action}
				buttonStyle={{
					backgroundColor: bgColor,
					height: 45,
					borderColor: "transparent",
					borderWidth: 0,
					borderRadius: 5,
					width: width
				}}
				icon= {
					<Icon
						name={iconName}
						size={15}
						iconColor={iconColor}
					/>
				}
				title={title}
				iconRight={true}
			>
			</Button>
		);		
	}
}

