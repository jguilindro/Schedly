import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


class ReminderTextComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ ...styles.reminder, backgroundColor: this.props.reminder.color }}>
        <Text style={styles.reminderText}>{this.props.reminder.description}</Text>
        <Text style={styles.reminderText}>{this.props.reminder.city}</Text>
        <Text style={styles.reminderText}>{this.props.reminder.time.substring(0, this.props.reminder.time.indexOf('G'))}</Text>
        <View style={{ whiteSpace: "pre-line" }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reminder: {
    position: 'relative'
  },
  reminderText: {
    color: "#fff",
    fontSize: 10
  }
});

export default ReminderTextComponent;
