import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';


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
          
          headerData={{
            calendarDate: calendarDate.format('DD MMM, YYYY')
          }}
          style={{
              marginTop: 200,
              paddingLeft: 0, 
              paddingRight: 0
          }}
        />
      </View>
    );
  }
}

export default CalendarComponent;
