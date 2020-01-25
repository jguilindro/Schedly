import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import DayComponent from './DayComponent';

let calendarDate = moment();

class CalendarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calendarDate: calendarDate.format('YYYY-MM-DD'),
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Calendar
          current={this.state.calendarDate}
          dayComponent= {DayComponent}
          headerData={{
            calendarDate: calendarDate.format('MMM, YYYY')
          }}
          style={{
              paddingLeft: 0, 
              paddingRight: 0
          }}
        />
      </View>
    );
  }
}

export default CalendarComponent;
