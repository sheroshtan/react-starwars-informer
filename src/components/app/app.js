import React, { Component } from "react";
import Header from "../header/header";
import ItemDetails, { Record } from "../item-details/item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry/error-boundry";
import Row from "../row/row";

import './app.css';

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
                getImageUrl={getPersonImage}>

                <Record field="gender" label="Gender"/>
                <Record field="birthYear" label="Birth Year"/>
                <Record field="height" label="Height"/>
                <Record field="weight" label="Weight"/>
                <Record field="eyeColor" label="Eye Color"/>

            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={12}
                getData={getStarship}
                getImageUrl={getStarshipImage}>

                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="passengers" label="Passengers"/>
                <Record field="manufacturer" label="Manufacturer"/>

            </ItemDetails>
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