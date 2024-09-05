// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from 'axios';

const apiUrl =
  'https://z53eybhjah.execute-api.us-east-1.amazonaws.com/dev/chat';

const fetchChatAPI = async message => {
  try {
    const response = await axios.post(apiUrl, {
      message: message,
    });
    if (response.status === 200) {
      const newText =
        response.data.completions[0]?.data?.text?.replace(/[\r\n]/gm, '') || '';
      return newText;
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    handleFetchError(error);
    throw error;
  }
};
const handleFetchError = error => {
  console.error(error);
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  } else if (error.request) {
    console.error('Request data:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
};
export {fetchChatAPI};
