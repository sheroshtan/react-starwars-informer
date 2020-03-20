import React, { Component } from "react";
import './person-details.css';

export default class PersonDetails extends Component {
    render() {
        return (
            <div className="person-details card">
                <img src="" alt="" className="person-image" />

                <div className="card-body">
                    <h4>R2-D2</h4>
                    <ul>
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>Male</span>
                        </li>
                        <li>
                            <span className="term">Birth year</span>
                            <span>43</span>
                        </li>
                        <li>
                            <span className="term">Eye Color</span>
                            <span>Red</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}