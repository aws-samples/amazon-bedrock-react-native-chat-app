// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { post } from 'aws-amplify/api';

const fetchChatAPI = async message => {
  console.log("message", message)
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
    console.log("restOperation", restOperation)

    const { body } = await restOperation.response;
    console.log("body", body)
    const response = await body.json();
    return response.completions[0]['data']['text']
  } catch (error) {
    console.log('POST call failed :', JSON.parse(error.response.body));
  }
}

export { fetchChatAPI };
