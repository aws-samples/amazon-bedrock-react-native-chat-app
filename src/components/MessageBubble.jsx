// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {UserAvatar, ChatBotAvatar} from './Avatar';

const MessageBubble = ({item}) => {
  const isUser = item.sender === 'user';
  const avatarComponent = isUser ? <UserAvatar /> : <ChatBotAvatar />;
  const messageContainerStyle = isUser
    ? styles.userMessageContainer
    : styles.receiverMessageContainer;
  const messageTextStyle = isUser
    ? styles.userMessageText
    : styles.receiverMessageText;

  return (
    <View
      style={[
        styles.bubbleContainer,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
          marginTop: 8,
        },
      ]}>
      {item.sender === 'bot' && avatarComponent}
      {item.sender === 'user' && avatarComponent}
      <View style={messageContainerStyle}>
        <Text style={messageTextStyle}>{item.message}</Text>
      </View>
    </View>
  );
};

MessageBubble.propTypes = {
  item: PropTypes.shape({
    sender: PropTypes.oneOf(['user', 'bot']).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  bubbleContainer: {},
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(188,73,129, 0.1)',
    borderRadius: 8,
    marginRight: 0,
    borderBottomRightRadius: 0,
    padding: 10,
    maxWidth: '70%',
  },
  receiverMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(37,73,192, 0.1)',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    padding: 10,
    marginRight: 80,
    maxWidth: '70%',
  },
  userMessageText: {
    color: '#000000',
  },
  receiverMessageText: {
    color: '#000000',
  },
});

export default MessageBubble;
