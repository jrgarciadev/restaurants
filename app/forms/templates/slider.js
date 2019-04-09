import React, { Component } from "react";
import { View, Slider, Text } from "react-native";

const sliderTemplate = locals => {
  const help = <Text style={{ marginBottom: 8 }}>{locals.help}</Text>;

  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
        {locals.label} ({parseInt(locals.value)})
      </Text>
      <Slider
        ref="input"
        step={locals.config.step}
        minimumValue={locals.config.min}
        maximumValue={locals.config.max}
        value={parseInt(locals.value)}
        onValueChange={value => locals.onChange(value)}
      />
      {help}
    </View>
  );
};

export default sliderTemplate;
