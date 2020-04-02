import React, { Component } from "react";
import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details/item-details";
import './app.css';
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry/error-boundry";
import Row from "../row/row";

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

        const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}/>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={12}
                getData={getStarship}
                getImageUrl={getStarshipImage}/>
        );

        return (
            <ErrorBoundry>
                <div>
                    <Header />
                    <div className="container">

                        <Row
                            left={personDetails}
                            right={starshipDetails}/>

                    </div>
                </div>
            </ErrorBoundry>
        )
    }
};