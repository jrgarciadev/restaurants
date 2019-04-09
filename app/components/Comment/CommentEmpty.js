import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class CommentEmpty extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.commentEmptyView}>
        <Text style={styles.commentEmptyText}>
          {" "}
          No hay comentarios, ¡pueder ser el primero!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  commentEmptyView: {
    justifyContent: "center",
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  commentEmptyText: {
    textAlign: "center",
    padding: 20
  }
});

export default CommentEmpty;
