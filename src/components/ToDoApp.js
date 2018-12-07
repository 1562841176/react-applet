
import React from 'react'
import List from './List'
import Input from './Input'

class ToDoApp extends React.Component{
    componentWillMount(){ // run before the render method
        this.setState({ list: [], newToDo: ''});
         // state应该是immutable的
        onInputSubmit=(event) => {
            event.preventDefault();
            this.setState((previousState)=>({
                list:[...previousState.list, {item:previousState.newToDo,done:false }],
                newToDo: ''
            }));
         };
         
    onListItemClick = (i)=>{
        this.setState((previousState)=>({
            list:[
                ...previousState.list.slice(0,i),object.assign({},previousState.list[i],{done: !previousState.list[i].done}),
                ...previousState.list.slice(i+1)      
            ]
        }))
    };
    onInputChange = (event) => {
        this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
      };

    deleteListItem = (i) => {
        this.setState((previousState)=>({ // using previous state again
          list: [
            ...previousState.list.slice(0, i), // again with the slice method
            ...previousState.list.slice(i+1) // the only diffence here is we're leaving out the clicked element
          ]
        }))
      };
    };
   
    render(){
        return(
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            
                            <h1>My To Do App</h1>
                            <hr/>
                            <List 
                            onClick={this.onListItemClick}
                            listItems={this.state.list} 
                            deleteListItem={this.deleteListItem}/>
                             <Input
                                value={this.state.newToDo}
                                onChange={this.onInputChange}
                                onSubmit={this.onInputSubmit}
                            />
                        </div>
                    </div>
                </div>
          </div>
        )
    }
}

// 为了将这个组件注入到我们的APP中, 首先我们需要输出它
export default ToDoApp;