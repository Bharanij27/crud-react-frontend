import React, { Component } from 'react';
import NewUser from './NewUser';
import StudentList from './StudentList';

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            students : []
         }
    }

    componentDidMount(){
        this.getDetails()
    }

    async getDetails(){
        let fetchData = await fetch('https://bhraranj27-server.herokuapp.com/users/');
        let students = await fetchData.json();
        await this.setState({students : students.users});
    }

    async updateDetails(id, name){
        let fetchData = await fetch('https://bhraranj27-server.herokuapp.com/users/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                name
            })
        });
        let result = await fetchData.json();
        if(result.status !== 200){
            alert(result.message);
            return false
        }
        alert('Data updated');
        return true
    }

    async deleteUser(index, userId){
        let fetchData = await fetch('https://bhraranj27-server.herokuapp.com/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id : userId})
        });
        
        await fetchData.json();
        let allUser = this.state.students;
        allUser.splice(index, 1);
        await this.setState({students : allUser})
    }

    async addUser(name){
        try {
            debugger
            if(name.trim().length === 0) return false
            
            let addData = await fetch('https://bhraranj27-server.herokuapp.com/users/user', {
                method : 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({name})
            });

            let student = await addData.json();
            if(student.status === 200){
                alert(student.message);
                this.getDetails();
            }
        } catch (error) {
            console.log(error);    
        }
    }


    render() { 
        return ( 
            <div className="container">
                <NewUser clickHandler = {this.addUser.bind(this)}/>
                <table className="table table-striped text-center mt-5">
                    <thead>
                        <tr>
                        <th scope="col">No </th>
                        <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((student, index) => 
                        <StudentList key ={student._id} 
                            deleteUser = {this.deleteUser.bind(this, index)} 
                            updateDetails = {this.updateDetails}
                            index = {index + 1} data = {student}
                        ></StudentList>
                        )}
                    </tbody>
                </table>
            </div> 
        );
    }
}
 
export default Student;