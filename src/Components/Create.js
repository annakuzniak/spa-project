import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import axios from "axios/index";
import { Redirect } from 'react-router'


export default class Create extends Component {
    state = {
        redirect: false
    }

    handleSubmit(user) {
        const { store } = this.context;

        axios.post(`http://jsonplaceholder.typicode.com/users`, user )
            .then(res => {
                store.persons.push(res.data);
                this.setState({ redirect: true });
            })
            .catch((err) => {
                console.error('err', err);
            });

    }

    render() {
        const { redirect } = this.state;

        if (redirect)
            return <Redirect to="/" />;

        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}></Form>
            </div>
        );
    }
}

Create.contextTypes = {
    store: PropTypes.object
};