// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import {fetchChatAPI} from '../services/api';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`;
  };

  const fetchAPI = async message => {
    try {
      const newText = await fetchChatAPI(message);
      const newMessageObj = {
        id: generateUniqueId(),
        sender: 'bot',
        message: newText,
      };
      setMessages(prevMessages => [...prevMessages, newMessageObj]);
    } catch (error) {
      // Handle error if needed
      Alert.alert('Error', 'Failed to send message');
    }
  };

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        id: generateUniqueId(),
        sender: 'user',
        message: newMessage,
      };
      setMessages(prevMessages => [...prevMessages, newMessageObj]);
      fetchAPI(newMessage);
      setNewMessage('');
    }
  };

  const renderMessage = ({item}) => <MessageBubble item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMessage}
      />
      <ChatInput
        value={newMessage}
        onChangeText={setNewMessage}
        onSend={handleSend}
      />
    </View>
  );
};

ChatComponent.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
});

export {ChatComponent};
