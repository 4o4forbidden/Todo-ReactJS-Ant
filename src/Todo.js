import React, { Component } from 'react';
import { Button,Card,Input,Divider } from 'antd';
import { UndoOutlined,CheckOutlined,DeleteOutlined,EditOutlined,EnterOutlined} from '@ant-design/icons';

import 'antd/dist/antd.css';
import './animate.min.css';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      id: null,
      mockData: []
    }
  }


  componentDidMount(){
    this.genererLesTodos();
  }

  corrigerLheure(n){
    return (String(n).length == 1 ? '0'+n : n);
  }

  genererLesTodos() {
    if(localStorage.getItem('todos') != undefined){
      this.setState({mockData: JSON.parse(localStorage.getItem('todos'))})
    }else{
      this.setState({mockData: [{
        id: '1',
        title: 'Manger du lablebi. 🇹🇳',
        done: false,
        date: '12:00'
      }]})
    }
  }

  sauvegarderLesTodos(){
      localStorage.setItem('todos',JSON.stringify(this.state.mockData));  
  }

  onSubmitHandle(event) {
    event.preventDefault();
    let tvalue = String(event.target.item.value);
    event.target.item.value = '';
    
    if(tvalue.length > 0){
      this.setState({
        mockData: [...this.state.mockData, {
          id: Date.now(),
          title: tvalue,
          done: false,
          date: this.corrigerLheure(new Date().getHours())+':'+ this.corrigerLheure(new Date().getMinutes())
        }]
      },()=>{
        localStorage.setItem('todos',JSON.stringify(this.state.mockData));  
        document.getElementsByClassName('todoChamp')[0].children[0].value = '';
      })
    }
  }


  onDeleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    },()=>{
      localStorage.setItem('todos',JSON.stringify(this.state.mockData));  
    });
  }

  onEditHandle(event) {
    this.setState({
      edit: false,
      id: null,
    },()=>{
      this.setState({
        edit: true,
        id: arguments[0],
        title: arguments[1]
      },()=>{
        localStorage.setItem('todos',JSON.stringify(this.state.mockData));  
      });
    });
  
  }

  onUpdateHandle(event) {
    event.preventDefault();

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }

        return item;
      })
    },()=>{
      localStorage.setItem('todos',JSON.stringify(this.state.mockData));  
    });

    this.setState({
      edit: false
    });
  }

  onCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }

        return item;
      })
    },()=>{
      localStorage.setItem('todos',JSON.stringify(this.state.mockData));  
    });
  }

 
  onUnCompleteHandle() {
    let id = arguments[0];

    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = false;
          return item;
        }

        return item;
      })
    },()=>{
      localStorage.setItem('todos',JSON.stringify(this.state.mockData));  
    });
  }


  render() {
    return (
      <div className="site-card-border-less-wrapper container">
        <Card title={<img src="https://cdn-icons-png.flaticon.com/512/3248/3248209.png" width={90} style={{position: 'absolute', top: '-60px', left: '10px'}}/>} bordered={false} style={{ width: 300 }}>
          
        <form onSubmit={this.onSubmitHandle.bind(this)}>

          <Input size="large" placeholder="Ecrivez votre Todo ici" name="item" className="item todoChamp" suffix={<EnterOutlined twoToneColor="#52c41a"/>} />
        </form>

        <div style={{display : this.state.mockData.length > 0 ? 'block' : 'none', overflow:'hidden'}}>

        <Divider />
        {this.renderEditForm()}

        <ul>
          {this.state.mockData.map(item => (
            <li key={item.id} className={ (item.done ? 'done' : 'hidden') + ' animated bounceIn' } style={{display:'block'}}>
              <span>{item.date}</span> <Button shape='circle' onClick={item.done ? this.onUnCompleteHandle.bind(this, item.id) : this.onCompleteHandle.bind(this, item.id)} style={{display:'inline',textAlign:'center'}}> <CheckOutlined style={{'marginLeft':0}}/></Button><b>{item.title}</b>
              <div style={{float:'right'}}>
              <Button onClick={this.onDeleteHandle.bind(this, item.id)}><DeleteOutlined twoToneColor="#52c41a"/></Button>
              <Button onClick={this.onEditHandle.bind(this, item.id, item.title)}><EditOutlined twoToneColor="#52c41a"/></Button>
              </div>
            </li>
          ))}
        </ul>
        </div>
        </Card>
      </div>
    );
  }

  renderEditForm() {
    if (this.state.edit) {
      return <form onSubmit={this.onUpdateHandle.bind(this)}>
        <Input size="large" type="text" name="updatedItem" className="item animated slideInDown" style={{animationDuration: '.5s'}} defaultValue={this.state.title} suffix={<UndoOutlined />} />
      </form>
    }
  }

}

export default Todo;