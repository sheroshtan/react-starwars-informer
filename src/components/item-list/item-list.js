import React, { Component } from "react";
import './item-list.css';
import Spinner from "../spinner/spinner";

export default class ItemList extends Component {

    state = {
        itemList: null
    };

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.children(item);

            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onPersonSelected(id)}>
                    { label }
                </li>
            )
        })
    }

    render() {
        const { itemList } = this.state;

        const items = itemList ? this.renderItems(itemList) : null;
        const spinner = !itemList ? <Spinner/> : null;

        return (
            <ul className="item-list list-group">
                { spinner }
                { items }
            </ul>
        )
    }
}