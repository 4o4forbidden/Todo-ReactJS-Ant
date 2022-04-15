import React, { Component } from 'react';
import { Button,Tooltip } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons';

import './animate.min.css';
import './App.css';


import Todo from './Todo';
import Overlay from './Overlay';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  render() {
    return (
      <div className="App">
        <Overlay/>
        <Todo />
        <Tooltip className='tooltipMonsieur' placement="topRight" title="Jarrar">
          <Button type="dashed"><UserSwitchOutlined /></Button>
        </Tooltip>
      </div>
    );
  }
}

export default App;
