import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import PropTypes from 'prop-types';
import * as actions from "../store/actions";
import ReminderForm from "./ReminderFormComponent";
import ReminderComponent from "./ReminderComponent";
import ReminderText from "./ReminderTextComponent";
import _sortBy from "lodash/sortBy";

const defaultColor = "#000";

class DayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setTime = this.setTime.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setColor = this.setColor.bind(this);
    this.onDayPress = this.onDayPress.bind(this);
    this.state = {
      modalVisible: false,
      modalAddReminderVisible: false,
      editReminder: {
        id: null,
        time: null,
        city: null,
        description: null,
        color: defaultColor
      }
    };
  }

  getContentStyle() {
    const { state, date } = this.props;
    const style = {
      content: {},
      text: {
        color: '#181c26'
      }
    };

    if (state === 'disabled') {
      style.text.color = '#c1c2c1';
    } else if (state === 'today') {
      style.text.color = '#fff';
      style.text.backgroundColor = '#216bc9';
      style.content.borderColor = '#216bc9';
      style.content.borderWidth = 2;
      style.content.borderRadius = 5;
    }
    return style;
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  openModalReminder() {
    this.setState({ modalAddReminderVisible: true });
  }

  closeModalReminder() {
    this.setState({ modalAddReminderVisible: false });
  }

  onDayPress() {
    if (this.props.state !== 'disabled') {
      this.setState({ modalVisible: true });
    }
    this.props.onPress(this.props.date);
  }

  setTime = (time) => {
    this.setState({
      editReminder: {
        ...this.state.editReminder,
        time: time
      }
    })
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

  setCity(text) {
    this.setState({
      editReminder: {
        ...this.state.editReminder,
        city: text
      }
    });
  }

  handleCreateUpdateReminder = (update) => {
    const description = this.state.editReminder.description;
    if (description.length) {
      const payload = {
        date: this.props.date.dateString,
        time: this.state.editReminder.time,
        city: this.state.editReminder.city,
        description: description,
        color: this.state.editReminder.color || defaultColor
      };

      if (update.id) {
        payload["id"] = update.id;
        this.props.updateReminder(payload);
      } else {
        this.props.createReminder(payload);
      }
      this.setState({ editReminder: {} });
      this.closeModalReminder();
    }
  };

  handleEditReminder = reminder => {
    this.setState({
      editReminder: {
        ...this.state.editReminder,
        ...reminder
      }
    });
    this.openModalReminder();
  };

  handleDeleteReminder = id => {
    this.props.deleteReminder(this.props.date.dateString, id);
  };

  render() {
    const contentStyle = this.getContentStyle();
    const reminders = _sortBy(this.props.reminders[this.props.date.dateString], "time") || [];
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.dayText}>{this.props.date.dateString}</Text>

              {!reminders.length ? (
                <ReminderForm
                  reminder={this.state.editReminder}
                  date={this.props.date}
                  setTime={this.setTime}
                  setCity={this.setCity}
                  setDescription={this.setDescription}
                  setColor={this.setColor}
                  handleCreateUpdateReminder={this.handleCreateUpdateReminder}
                  defaultColor={defaultColor}
                />
              ) : (
                  <React.Fragment>
                    {reminders.map((reminder, i) => {
                      return (
                        <ReminderComponent
                          key={i}
                          reminder={reminder}
                          handleEditReminder={this.handleEditReminder}
                          handleDeleteReminder={this.handleDeleteReminder}
                        />
                      );
                    })
                    }
                  </React.Fragment>

                )}

            </View>
            <View style={styles.btnClose}>
              <Button
                onPress={() => this.closeModal()}
                title="Close"
              >
              </Button>
            </View>
            {reminders.length ? (
              <View style={styles.btnNewReminder}>
                <Button
                  onPress={() => this.openModalReminder()}
                  title="Add Reminder"
                >
                </Button>
              </View>)
              : null}
          </View>
        </Modal>

        <Modal
          visible={this.state.modalAddReminderVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModalReminder()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>{this.props.date.dateString}</Text>
              <ReminderForm
                reminder={this.state.editReminder}
                date={this.props.date}
                setTime={this.setTime}
                setCity={this.setCity}
                setDescription={this.setDescription}
                setColor={this.setColor}
                handleCreateUpdateReminder={this.handleCreateUpdateReminder}
                defaultColor={defaultColor}
              />
            </View>
            <View style={styles.btnClose}>
              <Button
                onPress={() => this.closeModalReminder()}
                title="Close"
              >
              </Button>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.content, contentStyle.content]}
          onPress={this.onDayPress}
        >
          <Text style={[styles.contentText, contentStyle.text]}>
            {String(this.props.children)}
          </Text>
          <View style={{ flex: 0, flexDirection: 'column', }}>
            <React.Fragment>
              {reminders.length
                ? reminders.map((reminder, i) => {
                  return (
                    <ReminderText
                      key={i}
                      reminder={reminder}
                    />
                  );
                })
                : null}
            </React.Fragment>
          </View>
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
    flexDirection: 'column',
  },
  content: {
    width: 50,
    height: 105,
  },
  dayText:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  contentText: {
    fontSize: 12,
    marginRight: 30
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    alignItems: 'center',
  },
  btnNewReminder: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
  btnClose: {
    position: 'absolute',
    left: 50,
    bottom: 50,
  }
});

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
)(DayComponent);

