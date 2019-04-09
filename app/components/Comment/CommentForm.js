import React, { Component } from "react";
import AppButton from "../AppButton";
import { options, Comment } from "../../forms/comment";
import t from "tcomb-form-native";
import { View } from "react-native";
import { Card } from "react-native-elements";
import * as firebase from "firebase";
import Toast from "react-native-simple-toast";
import PreLoader from "../PreLoader";

const Form = t.form.Form;

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      comment: {
        comment: "",
        rating: 1
      },
      loading: false
    };
  }

  addComment() {
    const validate = this.refs.form.getValue();
    if (validate) {
      this.setState({ loading: true });
      let data = {};
      let comment = Object.assign({}, validate); // Pasa la inf de validate al objeto
      let ref = firebase
        .database()
        .ref()
        .child("comments");
      const key = ref.push().key;

      data[`${this.props.restaurantId}/${key}`] = comment;
      // Se inicializa el componente nuevamente
      ref.update(data).then(() => {
        this.setState((prevState, props) => {
          return {
            comment: {
              comment: "",
              rating: 1
            }
          };
        });
        this.setState({ loading: false });
        Toast.showWithGravity(
          "Comentario publicado",
          Toast.SHORT,
          Toast.CENTER
        );
      });
    }
  }

  onChange(comment) {
    this.setState({ comment });
  }

  render() {
    const { comment, loading } = this.state;
    if (loading) {
      return <PreLoader />;
    }
    return (
      <Card title="Opina sobre nosotros">
        <View>
          <Form
            ref="form"
            type={Comment}
            options={options}
            value={comment}
            onChange={v => this.onChange(v)}
          />
        </View>
        <AppButton
          bgColor="#3498db"
          title="Publicar opinión "
          action={this.addComment.bind(this)}
          iconName="md-text"
          iconSize={30}
          iconColor="#fff"
        />
      </Card>
    );
  }
}

export default CommentForm;
