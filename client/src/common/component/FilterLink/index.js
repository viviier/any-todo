import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFilter } from 'src/actions/todoActions';
import './index.less';

@connect((store, ownProps) => {
    return {
        active: store.todoReducer.filter === ownProps.filter
    }
})
export default class FilterLink extends Component {

    handleClick() {
        this.props.dispatch(setFilter(this.props.filter));
    }

    render() {
        return (
            <a 
                className={'section-filter' + (this.props.active ? ' active' : '')}
                onClick={() => this.handleClick()}
            >
                {this.props.children}
            </a>
        );
    }
}