import React, { Component } from 'react';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import './random-planet.css';
import ErrorIndicator from "../error-indicator/error-indicator";

export default class RandomPlanet extends Component {
    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, 5000);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        });
    };

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updatePlanet = () => {
        console.log('update');
        const id = Math.floor(Math.random()*17 + 2);
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError);
    };

    render() {
        console.log('render');
        const { planet, loading, error } = this.state;
        const hasData = !(loading || error);
        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet">
                { errorMessage }
                { spinner }
                { content }
            </div>
        )
    }
}

const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 alt="planet"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div className="planet-description">
                <h4>{name}</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="term">Population: </span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period: </span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter: </span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
};