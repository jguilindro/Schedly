import React from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import PropTypes from 'prop-types';
import * as actions from "../store/actions";
import ReminderForm from "./ReminderFormComponent";
import Reminder from "./ReminderComponent";
import ReminderText from "./ReminderTextComponent";
import _sortBy from "lodash/sortBy";


const defaultColor = "#000";

class DayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
    this.state = {
      modalVisible: false,
      editReminder: {
        id: null,
        time: null,
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

  onDayPress() {
    if (this.props.state !== 'disabled') {
      this.setState({ modalVisible: true });
    }
    this.props.onPress(this.props.date);
  }

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
              <Text>{this.props.date.dateString}</Text>
              <ReminderForm
                reminder={this.state.editReminder}
                date={this.props.date}
                handleCreateUpdateReminder={this.handleCreateUpdateReminder}
                defaultColor={defaultColor}
              />
              <React.Fragment>
                {reminders.length
                  ? reminders.map((reminder, i) => {
                    return (
                      <Reminder
                        key={i}
                        reminder={reminder}
                        handleDeleteReminder={this.handleDeleteReminder}
                      />
                    );
                  })
                  : null}
              </React.Fragment>
            </View>
            <View style={styles.btnNewReminder}>
              <Button
                onPress={() => this.closeModal()}
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

