import {connect} from 'react-redux'
import ToDoApp from '../components/ToDoApp'

import {
    inputChange,
    inputSubmit,
    deleteListItem,
    listItemClick
  } from '../redux/modules/toDoApp';
  

//  connect 这个函数被调用两次, 第一次是两个回调函数: mapStateToProps and mapDispatchToProps。 
//  第二次是把state和dispatch传入组件的时候。


function mapStateToProps(state){
    return {
        toDoApp:state.toDoApp
    }
}

function mapDispatchToProps(){
    return {
        inputChange: (value) => dispatch(inputChange(value)),// we added this
        inputSubmit: () => dispatch(inputSubmit()),
        deleteListItem: (i) => dispatch(deleteListItem(i)),
        listItemClick: (i) => dispatch(listItemClick(i))
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ToDoApp);