import React, { Component } from 'react';

class StudentList extends Component {
    state = {
        name : this.props.data.name,
        last : this.props.data.name,
        id : this.props.data._id
    }
    passData(userId){
        this.props.deleteUser(userId)
    }

    async updateUser(){
        let currentName = this.state.name;
        if(currentName.trim().length === 0){
            await this.setState({name : this.state.last});
            alert('Cannot update empty data');
        }
        else{
            let res = this.props.updateDetails(this.state.id, this.state.name);
            res && this.setState({last : this.state.name});
        }
    }

    async changeName(e){
        let name = e.target.value;
        await this.setState({name : name});
    }
    render() { 
        let details = this.props.data
        return ( 
            <tr>
                <th scope="row">{this.props.index}</th>
                <td id = {details._id}>
                    <input type="text" className="form-control" name="name" id={details._id}
                            placeholder="Name" onChange ={this.changeName.bind(this)} value = {this.state.name}/>
                    <button type="button" className ="form-control mb-1 btn btn-sm btn-success" onClick={this.updateUser.bind(this)}>Change</button>
                    <i className="ml-2 fa fa-trash" onClick = {() => this.passData(details._id)}></i>
                </td>
            </tr>
        );
    }
}
 
export default StudentList;