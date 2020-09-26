import React, { Component } from 'react';

class NewUser extends Component {
    state = {nameInput : ''};

    async changeName(e){
        let name = e.target.value;
        await this.setState({nameInput : name});
    }

    addUser(event){
        event.preventDefault();
        this.props.clickHandler(this.state.nameInput);
    }

    render() { 
        return (
            <form onSubmit = {this.addUser.bind(this)}>
                <div className="input-group mt-5 mr-sm-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fa fa-user"></i>
                                </div>
                            </div>
                            <input type="text" className="form-control" name="name" id="user-name"
                                placeholder="Name" onChange ={this.changeName.bind(this)} value = {this.state.nameInput} required/>
                            
                            {/* <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fa fa-info-circle"></i>
                                </div>
                            </div>
                            <input type="text" className="form-control" name="age" id="user-age"
                                placeholder="Age" required/> */}

                <button type="submit" className="btn btn-primary">Add User</button>
                        </div>
            </form>
        );
    }
}
 
export default NewUser;