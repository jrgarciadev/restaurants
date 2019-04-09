import React from "react";
import t from "tcomb-form-native";
const Form = t.form.Form;
import sliderTemplate from "./templates/slider";

export const Comment = t.struct({
  rating: t.Number,
  comment: t.maybe(t.String) //Opcional
});

export const options = {
  fields: {
    rating: {
      label: "Puntucación",
      help: "¿Qué puntuación le das del 1 al 5?",
      template: sliderTemplate,
      config: {
        step: 1,
        min: 1,
        max: 5
      }
    },
    comment: {
      label: "Comentario",
      placeholder: "Comentario",
      multiline: true,
      stylesheet: {
        ...Form.stylesheet,
        textbox: {
          ...Form.stylesheet.textbox,
          normal: {
            ...Form.stylesheet.textbox.normal.textbox,
            height: 50
          },
          error: {
            ...Form.stylesheet.textbox.error,
            height: 50
          }
        }
      }
    }
  }
};
