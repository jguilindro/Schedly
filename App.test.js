import reducer from './src/store/reducers/reminders'
import * as types from './src/store/actions/actionTypes'


const mockReminderInitial = {
  id: "0",
  date: new Date(2018, 11, 24),
  time: "15:20:53 GMT-0500 (EST)",
  city: "Quito",
  description: "Reminder1",
  color: "#000",
  test: true
};

const mockReminderAfter = {
  id: "0",
  date: new Date(2018, 11, 24),
  time: "14:19:52 GMT-0500 (EST)",
  city: "New York",
  description: "Reminder2",
  color: "#ff7518"
};


describe('Testing Edit Functionality', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
      }
    )
  })
  it('should handle CREATE_REMINDER', () => {
    expect(
      reducer([], {
        type: types.CREATE_REMINDER,
        reminder: mockReminderInitial
      })
    ).toEqual(
        {
        "Mon Dec 24 2018 00:00:00 GMT-0500 (Eastern Standard Time)": 
        [
          {
            "color": "#000",
            "description": "Reminder1",
            "city": "Quito",
            "id": "0",
            "time": "15:20:53 GMT-0500 (EST)"
          }
        ]
      }
    )
  })



  it('should handle UPDATE_REMINDER', () => {
    expect(
      reducer({
        "Mon Dec 24 2018 00:00:00 GMT-0500 (Eastern Standard Time)": 
        [
          {
            "color": "#000",
            "description": "Reminder1",
            "id": "0",
            "time": "15:20:53 GMT-0500 (EST)"
          }
        ]
      },{
        type: types.UPDATE_REMINDER,
        reminder: mockReminderAfter
      })
    ).toEqual(
      {
        "Mon Dec 24 2018 00:00:00 GMT-0500 (Eastern Standard Time)": 
        [
          {
            "color": "#ff7518",
            "description": "Reminder2",
            "city": "New York",
            "id": "0",
            "time": "14:19:52 GMT-0500 (EST)"
          }
        ]
      }
    )

  })
})

