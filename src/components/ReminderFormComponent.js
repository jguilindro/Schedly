
import React from "react";
import TimePicker from '@react-native-community/datetimepicker';
import ColorPalette from 'react-native-color-palette';
import { View, TouchableOpacity, Text, TextInput, TouchableHighlight } from 'react-native';

class ReminderFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reminders: props.reminders,
      date: new Date('2020-06-12T14:42:42'),
      mode: 'time',
      show: false,
      showColorPicker: false
    }
  };

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date: date
    });
    this.props.setTime(date.toTimeString());
  }

  showColorPicker = () => {
    this.setState({
      showColorPicker: true,
    });
  }

  timepicker = () => {
    this.show('time');
  }

  colorpicker = () => {
    this.showColorPicker();
  }

  render() {
    const { show, date, mode, showColorPicker } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Reminder"
          maxLength={30}
          value={this.props.reminder.description}
          onChangeText={text => this.props.setDescription(text)}
        />
        <TextInput
          placeholder="City"
          maxLength={30}
          value={this.props.reminder.city}
          onChangeText={text => this.props.setCity(text)}
        />
        <TouchableOpacity
          onPress={this.timepicker}
        >
          <Text>Time: {this.props.reminder.time}</Text>
        </TouchableOpacity>
        {show && <TimePicker value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={this.setDate} />
        }

        <TouchableOpacity
          onPress={this.colorpicker}
        >
          <Text>Color: {this.props.reminder.color}</Text>
        </TouchableOpacity>
        {showColorPicker && <ColorPalette
          onChange={color => this.props.setColor(color)}
          value={this.state.color}
          colors={['#C0392B', '#8E44AD', '#2980B9', '#009a00', '#ff7518', '#fbd01e']}
        />
        }
        <TouchableHighlight
          style={{ alignItems: 'center', backgroundColor: '#DDDDDD' }}
          onPress={e => this.props.handleCreateUpdateReminder(this.props.reminder)}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Save</Text>
        </TouchableHighlight>
      </View >
    );
  }

};

export default ReminderFormComponent;

