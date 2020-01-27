
import React from "react";
import TimePicker from '@react-native-community/datetimepicker';
import ColorPalette from 'react-native-color-palette';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, TextInput, TouchableHighlight } from 'react-native';
import * as actions from "../store/actions";

const defaultColor = "#000";
class ReminderFormComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reminders: props.reminders,
      date: new Date('2020-06-12T14:42:42'),
      mode: 'time',
      show: false,
      showColorPicker: false,
      editReminder: {
        id: null,
        time: null,
        description: null,
        color: defaultColor
      }

    }
  };

  setDate = (event, date) => {
    date = date || this.state.date;
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date: date,
      editReminder: {
        ...this.state.editReminder,
        time: date.toTimeString()
      }
    });
  }

  setColor = (color) => {
    this.setState({
      editReminder: {
        ...this.state.editReminder,
        color: color
      }
    });
  }

  setDescription(text) {
    this.setState({
      editReminder: {
        ...this.state.editReminder,
        description: text
      }
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
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

  handleCreateUpdateReminder = (update) => {
    const description = this.state.editReminder.description;
    if (description.length) {
      const payload = {
        date: this.props.date.dateString,
        time: this.state.editReminder.time,
        description: description,
        color: this.state.editReminder.color || defaultColor
      };

      if (update.id) {
        payload["id"] = update.id;
        this.props.updateReminder(payload);
      } else {
        this.props.createReminder(payload);
      }
      //this.props.handleSetEditDay(null);
      this.setState({ editReminder: {} });
      this.props.hideReminderModal();
    }
  };

  render() {
    const { show, date, mode, showColorPicker } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Reminder"
          maxLength={30}
          value={this.props.reminder.description}
          onChangeText={text => this.setDescription(text)}
        />
        <TouchableOpacity
          onPress={this.timepicker}
        >
          <Text>Time: {this.state.date.toTimeString()}</Text>
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
          <Text>Color: {this.state.editReminder.color}</Text>
        </TouchableOpacity>
        {showColorPicker && <ColorPalette
          onChange={color => this.setColor(color)}
          value={this.state.color}
          colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
        />
        }
        <TouchableHighlight
        style= {{alignItems: 'center', backgroundColor: '#DDDDDD'}}
          onPress={e => this.handleCreateUpdateReminder(this.props.reminder)}
        >
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Save</Text>
        </TouchableHighlight>
      </View >
    );
  }

};
const mapStateToProps = state => {
  return {
    reminders: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReminder: payload => dispatch(actions.createReminder(payload)),
    updateReminder: payload => dispatch(actions.updateReminder(payload)),
    deleteReminder: (date, id) => dispatch(actions.deleteReminder(date, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReminderFormComponent);

