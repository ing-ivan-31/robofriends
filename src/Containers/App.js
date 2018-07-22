import React, { Component } from 'react';
import CardList from '../Components/CardList';
import Searchbox from '../Components/Searchbox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
//import { robots } from './robots';
import './App.css'



class App extends Component {

    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
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

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        if (robots.length === 0) {
            return ( <h1> Loading... </h1>);
            }
        else {
            return ( 
            <div className = 'tc'>
                <h1 className = 'h2' > Robofriends </h1>  
                <Searchbox searchChange = { this.onSearchChange }/>  
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

export default App;