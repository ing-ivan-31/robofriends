import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import Searchbox from '../Components/Searchbox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
//import { robots } from './robots';
import './App.css'
import { setSearchField } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapsDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = {
            robots: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({ robots: users })
            });

    }

    render() {
        const { robots } = this.state;
        const {searchField, onSearchChange} = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if (robots.length === 0) {
            return ( <h1> Loading... </h1>);
        }
        else {
            return ( 
            <div className = 'tc'>
                <h1 className = 'h2' > Robofriends </h1>  
                <Searchbox searchChange = { onSearchChange }/>  
                <Scroll >
                <ErrorBoundry >
                    <CardList robots = { filteredRobots }/>  
                </ErrorBoundry> 
                </Scroll>  
            </div>
            );
        }


    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(App);

//Connect subscribe to redux and mapState tells the state that cares to App and mapsDispatch tells the actions that cares to App