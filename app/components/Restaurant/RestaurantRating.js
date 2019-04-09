import React, { Component } from "react";
import { Rating, Text } from "react-native-elements";
import { View } from "react-native";
import * as firebase from "firebase";

class RestaurantRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    };
    const { restaurantId } = props;
    this.commentsRef = firebase.database().ref(`comments/${restaurantId}`);
  }

  componentDidMount() {
    this.commentsRef.on("child_added", snapshot => {
      this.commentsRef.on("value", snap => {
        let comments = [];
        snap.forEach(row => {
          comments.push(parseInt(row.val().rating));
        });
        let rating =
          comments.reduce((previus, current) => previus + current, 0) /
          comments.length;
        this.setState({
          rating: rating
        });
        // Para que actualice el componente
        this.refs.rating.setCurrentRating(rating);
      });
    });
  }

  render() {
    const { rating } = this.state;
    return (
      <View>
        <Rating ref="rating" imageSize={20} readonly startingValue={rating} />
      </View>
    );
  }
}

export default RestaurantRating;
