import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Table from './Table';

export default class ListOfUsers extends React.Component {
    state = {
        persons: [],
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.persons !== prevState.persons)
            return nextProps;

        return null;
    }

    deletePerson(id) {
        return axios.delete('http://jsonplaceholder.typicode.com/users/' + id, {
            mode: 'CORS'
        }).then(res => res)
            .catch(err => err);
    }

    onDelete(id) {
        const { store } = this.context;

        this.deletePerson(id)
            .then(() => {
                let persons = this.props.persons.filter((person) => {
                    return id !== person.id;
                });

                store.persons = persons;
                this.setState(state => {
                    state.persons = persons;
                    return state;
                });

                this.props.onDelete();
            })
            .catch((err) => {
                console.error('err', err);
            });
    }

    render() {
        return (
            <div>
                <Table persons={this.state.persons}
                       onDelete={this.onDelete.bind(this)}
                />
            </div>
        );
    }
}

ListOfUsers.contextTypes = {
    store: PropTypes.object
};