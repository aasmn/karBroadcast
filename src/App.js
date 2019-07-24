import React, { Component } from 'react';
import MiddleHeader from './middle/Header'
import MiddleCenter from './middle/Center'
import LeftTop from './left/Top'
import LeftCenter from './left/Center'
import LeftRMF from './left/RMF'
import LeftBottom from './left/Bottom'
import MiddleBottom from './middle/WordCloud'
import RightTop from './right/top'
import RightCenter from './right/Center'
import RightCenter2 from './right/Center2'
import Yyjh from './left/Yyjh'  // 语用交互

import './App.less';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="left">
          <LeftTop />
          <Yyjh />
          <LeftCenter />
          <LeftBottom />
        </div>
        <div className="center">
          <MiddleHeader />
          <MiddleCenter />
          <MiddleBottom />
        </div>
        <div className="right">
          <RightTop />
          <RightCenter />
          <LeftRMF />
          <RightCenter2 />
          
        </div>
      </div>
    );
  }
}

export default App;
