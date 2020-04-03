import React, { Component } from "react";
import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorButton from "../error-button/error-button";

const Record = ({ item, field, label }) => {

    return (
        <li className="list-group-item">
            <span className="term">{ label }: </span>
            <span>{ item[field] }</span>
        </li>
    )
};

export { Record };

export default class ItemDetails extends Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        /*loading: true*/
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId) {
            /*this.setState({
                loading: true
            });*/
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if(!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    /*loading: false*/
                })
            })
    }

    render() {
        const { item, image } = this.state;

        if(!item) {
            return <span>No item in item-details</span>
        }

        console.log(item);

       /* const spinner = loading ? <Spinner/> : null;
        const content = !loading ? <Person item={item} image={image}/> : null;*/

        return (
            <div className="person-details card">
                {/*{ spinner }
                { content }*/}
                <img src={image}
                     alt="character"
                     className="person-image"/>

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul>
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, { item });
                            })
                        }
                    </ul>
                    <ErrorButton/>
                </div>
            </div>
        )
    }
}

/*
const Person = (item, image) => {
    const { id, name, gender, height, weight, birthYear, eyeColor } = item;

    return (
        <React.Fragment>
            <img src={image}
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
                <ErrorButton/>
            </div>
        </React.Fragment>
    )
};
*/
