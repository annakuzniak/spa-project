import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Table extends Component {

    constructor(props) {
        super(props);
    };

    deleteHandler(i, e) {
        e.preventDefault();
        this.props.onDelete(this.props.persons[i].id);
    };

    render() {
        return (
            <div>
                <table className="table table-hover table-responsive">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.persons && this.props.persons.map((person, i) => {
                        return (
                            <tr key={person.id}>
                                <td>{person.id}</td>
                                <td>{person.name}</td>
                                <td>
                                    <Link to={`/persons/update/${person.id}`} className="btn btn-default btn-sm">Edit</Link>
                                    <button onClick={this.deleteHandler.bind(this, i)} className="btn btn-danger btn-sm">Delete</button>
                                </td>
                            </tr>);
                    })}
                    </tbody>
                </table>

                <Link to="/persons/create" className="btn btn-lg btn-success">Create</Link>
            </div>
        );
    }

}


