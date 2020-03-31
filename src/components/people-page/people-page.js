import React, { Component } from "react";
import './people-page.css';
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";



export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    };

    render() {

        if(this.state.hasError) return <ErrorIndicator/>;

        const personDetails = <PersonDetails personId={this.state.selectedPerson}/>;
        const itemList = (
            <ItemList
                onPersonSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`} />
        );

        return(
            <ErrorBoundry>
                <Row left={itemList} right={personDetails} />
            </ErrorBoundry>
        )
    }
}