import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import PropTypes from 'prop-types';


class DayComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
    this.state = {
      modalVisible: false,
    };
  }

  getContentStyle() {
    const { state, date } = this.props;
    const style= {
      content: {},
      text: {
        color: '#181c26'
      }
    };

  if (state === 'disabled') {
    style.text.color = '#c1c2c1';
  } else if (state === 'today') {
      style.text.color = '#fff';
      style.text.backgroundColor= '#216bc9';
      style.content.borderColor = '#216bc9';
      style.content.borderWidth = 2;
      style.content.borderRadius = 5;
    }

    return style;
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }


  onDayPress() {
    if(this.props.state !== 'disabled'){
      this.setState({modalVisible: true});
    }
    this.props.onPress(this.props.date);
  }

  render() {
    const contentStyle = this.getContentStyle();

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
                <Button
                    onPress={() => this.closeModal()}
                    title="Close modal"
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
    flexDirection: 'row',
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
});

export default DayComponent;
