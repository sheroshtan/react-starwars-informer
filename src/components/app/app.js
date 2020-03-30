import React, { Component } from "react";
import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import './app.css';
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";

export default class App extends Component {
    state = {
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true });
    }

    render() {

        if(this.state.hasError) return <ErrorIndicator/>;

        return (
            <div>
                <Header />
                <div className="container">
                    <RandomPlanet />

                    <div className="row">
                        <div className="btn-group">
                            <ErrorButton/>
                        </div>
                    </div>

                    <PeoplePage/>
                    <PeoplePage/>
                    <PeoplePage/>

                </div>
            </div>
        )
    }
};