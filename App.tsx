// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Header from './src/components/Header';
import { ChatComponent } from './src/components/Chat';
import { Amplify } from 'aws-amplify';
import outputs from './amplify_outputs.json';

Amplify.configure(outputs);
const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: outputs.custom.API,
  },
});

const App = () => {
  return (
    <>
      <Header title='Amazon Bedrock Chat App' />
      <ChatComponent />
    </>
  );
};

export default App;