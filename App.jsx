// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react';
import Header from './src/components/Header';
import {ChatComponent} from './src/components/Chat';

const App = () => {
  return (
    <>
      <Header />
      <ChatComponent />
    </>
  );
};

export default App;
