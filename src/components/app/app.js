import React, { Component } from "react";
import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import './app.css';
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {
    swapiService = new SwapiService();

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

                    <div className="row">
                        <div className="col-md-6">
                            <ItemList onPersonSelected={this.onPersonSelected}
                                      getData={this.swapiService.getAllPlanets}
                                      renderItem={(item) => item.name} />
                        </div>
                        <div className="col-md-6">
                            <PersonDetails personId={this.state.selectedPerson}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <ItemList onPersonSelected={this.onPersonSelected}
                                      getData={this.swapiService.getAllStarships}
                                      renderItem={(item) => item.name} />
                        </div>
                        <div className="col-md-6">
                            <PersonDetails personId={this.state.selectedPerson}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};