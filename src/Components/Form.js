import React, { Component } from 'react';

export default class Form extends Component {

    constructor(props) {
        super(props);
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        return nextProps;
    }

    state = {
        user: {
            id: null,
            name: '',
        }
    };

    handleInputChange = event => {
        const { user } = this.state;

        user[event.target.name] = event.target.value;
        this.setState({ user: user });
    };


    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.user);

    };

    render() {
        return (
            <form name="person" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="person">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="person_name">Full name</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="person_name"
                                   name="name"
                                   required="required"
                                   value={this.state.user.name}
                                   onChange={this.handleInputChange.bind(this)}
                                   className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-10">
                            <button type="submit"
                                    id="person_submit"
                                    className="btn-default btn">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
};
