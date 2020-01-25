import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class DayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

  getContentStyle() {
    const { state, date } = this.props;
    const style= {
      content: {},
      text: {
        color: '#181c26'
      }
    };

  if (state === 'disabled') {
    style.text.color = '#c1c2c1';
  } else if (state === 'today') {
      style.text.color = '#fff';
      style.text.backgroundColor= '#216bc9';
      style.content.borderColor = '#216bc9';
      style.content.borderWidth = 2;
      style.content.borderRadius = 5;
    }

    return style;
  }

  

  onDayPress() {
    this.props.onPress(this.props.date);
  }

  render() {
    const contentStyle = this.getContentStyle();

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.content, contentStyle.content]}
          onPress={this.onDayPress}
        >
          <Text style={[styles.contentText, contentStyle.text]}>
            {String(this.props.children)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

DayComponent.propTypes = {
  children: PropTypes.any,
  state: PropTypes.string,
  date: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  current: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
  },
  content: {
    width: 50,
    height: 105,
  },
  contentText: {
    fontSize: 12,
    marginRight: 30
  }
});

export default DayComponent;
