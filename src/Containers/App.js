import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import Searchbox from '../Components/Searchbox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
//import { robots } from './robots';
import './App.css'
import { setSearchField, requestRobots } from '../actions';

//Reducers
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

// Actions
const mapsDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots : () => dispatch(requestRobots())
    }
}

class App extends Component {

    componentDidMount() {
        this.props.onRequestRobots();

    }

    render() {
        const { searchField, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if (isPending) {
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