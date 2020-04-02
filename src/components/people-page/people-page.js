import React, { Component } from "react";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details/item-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";

import './people-page.css';


export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 16
    };

    onPersonSelected = (selectedPerson) => {
        this.setState({
            selectedPerson
        })
    };

    render() {

        if(this.state.hasError) return <ErrorIndicator/>;

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails itemId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );
        const itemList = (
            <ItemList
                onPersonSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>

                {(i) => (
                    `${i.name} (${i.birthYear})`
                )}

            </ItemList>
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundry>
        )
    }
}