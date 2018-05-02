import React, { Component } from 'react';
import axios from "axios/index";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListOfUsers from './Components/ListOfUsers';
import Create from './Components/Create';
import Update from './Components/Update';
import PropTypes from 'prop-types';


export default class App extends Component {

    state = {
        persons: []
    };

    componentDidMount() {

        const { store } = this.context;

        if (store.persons && store.persons.length) {
            this.setState({ persons: store.persons });
            return;
        }

        axios.get('http://jsonplaceholder.typicode.com/users').then(res => {
            store.persons = res.data;
            this.setState({ persons: res.data});
        });
    };

    handlePersonsChange() {
        const { store } = this.context;

        if (store.persons)
            this.setState({persons: store.persons});
    }

    renderList() {
        return <ListOfUsers persons={ this.state.persons } onDelete={ this.handlePersonsChange.bind(this) }  />;
    }

    renderUpdate({match}) {
        const { store } = this.context;
        return <Update personId={match.params.personId} personsLoaded={ !!this.state.persons.length }/>;
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Route exact path="/" render={ this.renderList.bind(this) }/>
                    <Route path="/persons/create" component={Create}/>
                    <Route path="/persons/update/:personId" render={ this.renderUpdate.bind(this) }/>
                </div>

            </Router>
        );
    }
}

App.contextTypes = {
    store: PropTypes.object
};