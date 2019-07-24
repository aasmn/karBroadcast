import React, { Component } from 'react';
import UserCount from './UserCount'
import ChinaMap from './ChinaMap'
import Ranking from './Ranking'
class Main extends Component {
    render() {
        return (
            <div className="middle-center borders">
                <UserCount />
                <ChinaMap />
                <Ranking />
            </div>
        );
    }
}

export default Main;
