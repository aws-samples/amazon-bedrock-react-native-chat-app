// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ChatInput = ({value, onChangeText, onSend}) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Type your message..."
      value={value}
      onChangeText={onChangeText}
    />
    <Button title="Send" onPress={onSend} />
  </View>
);

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
    height: 40,
    borderColor: '#EFEFEF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});

export default ChatInput;
