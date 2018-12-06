
import React from "react"


class Input extends React.Component{
    render(){
        return(
            <form>
                <div className="form-group">
                <label htmlFor="listInput">Email address</label>
                <inpt type="text" className="form-control" id="listInput" placeholder="add New todo"></inpt>
                <button className="btn btn-primary">Add Item</button>
                </div>
            </form>
        )

    }
}

export default Input