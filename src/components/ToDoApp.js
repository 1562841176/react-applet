
import React from 'react'

class ToDoApp extends React.Component{
    render(){
        return(
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <h1>My To Do App</h1>
                            <hr/>
                            List goes here.
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

// 为了将这个组件注入到我们的APP中, 首先我们需要输出它
export default ToDoApp;