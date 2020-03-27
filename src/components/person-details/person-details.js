import React, { Component } from "react";
import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

export default class PersonDetails extends Component {
    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if(this.props.personId !== prevProps.personId) {
            this.setState({
                loading: true
            });
            this.updatePerson();
        }
    }

    updatePerson() {
        const { personId } = this.props;
        if(!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({
                    person,
                    loading: false
                })
            })
    }

    render() {
        const { person, loading } = this.state;

        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? <Person person={person}/> : null;

        return (
            <div className="person-details card">
                { spinner }
                { content }
            </div>
        )
    }
}

const Person = ({ person }) => {
    const { id, name, gender, height, weight, birthYear, eyeColor } = person;

    return (
        <React.Fragment>
            <img src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                 alt="character"
                 className="person-image"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul>
                    <li className="list-group-item">
                        <span className="term">Gender: </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Height: </span>
                        <span>{height}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Weight: </span>
                        <span>{weight}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth year: </span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color: </span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};
