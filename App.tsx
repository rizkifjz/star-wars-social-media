import {NativeBaseProvider} from 'native-base';
import React from 'react';
import ScreenNavigation from './src/presentation/utils/ScreenNavigation';
import {Theme} from './src/presentation/utils/Theme';

const App = () => {
  return (
    <NativeBaseProvider theme={Theme}>
      <ScreenNavigation initial={'login'} />
    </NativeBaseProvider>
  );
};

export default App;
