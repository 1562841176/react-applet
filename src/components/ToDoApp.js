
import React from 'react'
import List from './List'
import Input from './Input'

class ToDoApp extends React.Component{
    componentWillMount(){ // run before the render method
        this.setState({ // add an array of strings to state.
          list: ['thing1', 'thing2', 'thing3']
        })
      };
    
    render(){
        return(
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <Input />
                            <h1>My To Do App</h1>
                            <hr/>
                            <List listItems={this.state.list} />
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

// 为了将这个组件注入到我们的APP中, 首先我们需要输出它
export default ToDoApp;