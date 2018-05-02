import React from 'react';
import axios from "axios/index";
import PropTypes from 'prop-types';
import Form from './Form';
import { Redirect } from 'react-router'


export default class Update extends React.Component {
    state = {
        person: {},
        personId: null,
        index: null,
        redirect: false,
        ready: false
    };

    constructor(props) {
        super(props);
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.personsLoaded && nextProps.personId)
        {
            prevState.ready = true;
            prevState.personId = nextProps.personId;
            return prevState;
        }

        return null;
    }

    updatePerson(user) {

        const { store } = this.context;

        axios.patch(`http://jsonplaceholder.typicode.com/users/` + user.id, user )
            .then(res => {
                store.persons[this.state.index] = res.data;
                this.setState({ redirect: true });
            })
            .catch((err) => {
                console.error('err', err);
            });

    }

    getPersonIndex(personId) {

        const { store } = this.context;

        var index = store.persons.findIndex(person => {
            return person.id == personId;
        });

        return index;
    }

    handleSubmit(user) {
        this.updatePerson(user);
    };

    render() {
        const { redirect } = this.state;
        const { store } = this.context;

        if (redirect)
            return <Redirect to="/" />;

        if (!this.state.ready)
            return null;

        let index = this.getPersonIndex(this.state.personId);
        let person = store.persons[index];

        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}
                      user={ person }
                >

                </Form>
            </div>
        );
    }
}

Update.contextTypes = {
    store: PropTypes.object
};