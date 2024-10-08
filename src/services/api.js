// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { post } from 'aws-amplify/api';

const fetchChatAPI = async message => {
  try {
    const restOperation = post({
      apiName: 'myRestApi',
      path: 'chat',
      options: {
        body: {
          message: message
        }
      }
    });

    const { body } = await restOperation.response;
    const response = await body.json();
    const cleanedText = response.completions[0]?.data?.text?.replace(/[\r\n]/gm, '') || '';
    return cleanedText

  } catch (error) {
    console.log('POST call failed :', JSON.parse(error.response.body));
  }
}

export { fetchChatAPI };
