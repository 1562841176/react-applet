// react app 的根组件

import React from 'react'
import ReactDOM from 'react-dom'

import ToDoApp from './components/ToDoApp'
 
class App extends React.Component{
   
    render(){
        return(
            <div>
                hello world
            </div>
        )      
    }
}
// 写好的组件render给DOM，用到ReactDOM.render方法
ReactDOM.render(<ToDoApp />,document.getElementById('app'))
