import React, { Component } from "react";
import PreLoader from "../PreLoader";
import { View, StyleSheet, FlatList } from "react-native";
import { Card, Divider, Text } from "react-native-elements";
import CommentEmpty from "./CommentEmpty";
import Comment from "./Comment";
import * as firebase from "firebase";

class CommentList extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      loaded: false
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref(`comments/${this.props.restaurantId}`)
      .on("value", snapshot => {
        let comments = [];
        snapshot.forEach(row => {
          comments.push({
            id: row.key,
            rating: row.val().rating,
            comment: row.val().comment
          });

          this.setState({
            comments,
            loaded: true
          });
        });
      });
  }

  renderComment(comment) {
    return <Comment comment={comment} />;
  }

  render() {
    const { comments, loaded } = this.state;

    if (!comments.length) {
      return (
        <View>
          <CommentEmpty />
        </View>
      );
    }

    if (!loaded) {
      return <PreLoader />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Opiniones</Text>
        <Divider style={styles.divider} />
        <FlatList
          data={comments}
          renderItem={data => this.renderComment(data.item)}
          keyExtractor={(data) => data.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center"
  },
  divider: {
    backgroundColor: "#ffb300"
  }
});
export default CommentList;
