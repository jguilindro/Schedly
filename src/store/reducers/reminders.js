import * as actionTypes from "../actions/actionTypes";
import uniqueId from "uuid";

const initialState = {};

const createReminder = (prevState, action) => {
  const testId="0";
  let reminder;
  if(action.reminder.test){
    reminder = {
      id: testId,
      time: action.reminder.time,
      city: action.reminder.city,
      description: action.reminder.description,
      color: action.reminder.color
    };
  } else {
    reminder = {
      id: uniqueId(),
      time: action.reminder.time,
      city: action.reminder.city,
      description: action.reminder.description,
      color: action.reminder.color
    };
  }
  return {
    ...prevState,
    [action.reminder.date]: prevState[action.reminder.date]
      ? prevState[action.reminder.date].concat(reminder)
      : [reminder]
  };
};

const updateReminder = (prevState, action) => {
  const reminders = [];
  [...prevState[action.reminder.date]].forEach(reminder => {
    if (action.reminder.id === reminder.id) {
      reminder = {
        id: reminder.id,
        time: action.reminder.time,
        city: action.reminder.city,
        description: action.reminder.description,
        color: action.reminder.color
      };
    }
    reminders.push(reminder);
  });

  return {
    ...prevState,
    [action.reminder.date]: reminders
  };
};

const deleteReminder = (prevState, action) => {
  return {
    ...prevState,
    [action.date]: [...prevState[action.date]].filter(reminder => {
      return reminder.id !== action.id;
    })
  };
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REMINDER:
      return createReminder(prevState, action);
    case actionTypes.UPDATE_REMINDER:
      return updateReminder(prevState, action);
    case actionTypes.DELETE_REMINDER:
      return deleteReminder(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
