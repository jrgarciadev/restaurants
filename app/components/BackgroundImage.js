
import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

export default class BackgroundImage extends Component {
	render() {
		/**
		 *  Children es para que se rendericen
		 *  los componentes hijos
		 */
		const {source,children} = this.props;
		return(
			<ImageBackground 
				source={source}
				style={styles.container}
			>
				{children}
			</ImageBackground>
		);		
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: null,
		height: null,
	}
});


