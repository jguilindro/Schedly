import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';


class ReminderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ backgroundColor: this.props.reminder.color }}>
        <Text style={{ color: "#fff" }}>{this.props.reminder.description}</Text>
        <Text style={{ color: "#fff" }}>{this.props.reminder.city}</Text>
        <Text style={{ color: "#fff" }}>{this.props.reminder.time}</Text>
        <TouchableOpacity
          onPress={() => this.props.handleDeleteReminder(this.props.reminder.id)}
        >
          <Text>{"Delete"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.props.handleEditReminder(this.props.reminder)}
        >
          <Text>{"Edit"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reminder: {
    position: 'relative',
    fontSize: 12,
    paddingLeft: 3,
    marginBottom: 3,
  }
});

export default ReminderComponent;
