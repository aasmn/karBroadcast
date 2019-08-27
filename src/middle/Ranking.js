import React, { Component } from 'react';
function formatNum(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
}
class Main extends Component {
    render() {
        const list = [{ label: '广东', number: 107412, change: 'up' },
        { label: '山东', number: 79607, change: 'up' },
        { label: '湖南', number: 63429, change: 'up' },
        { label: '河南', number: 57233, change: 'up' },
        { label: '江苏', number: 54008, change: 'up' }]
        return (
            <div className="middle-ranking">
                <div className="ranking-title">省份活跃 TOP5</div>
                <ul className="ranking-list">
                    <li>
                        <i className="icon ranking_1"></i>
                        <span className="label">{list[0].label}</span>
                        <span className="number">{formatNum(list[0].number)}</span>
                        <i className={list[0].change}></i>
                    </li>
                    <li>
                        <i className="icon ranking_2"></i>
                        <span className="label">{list[1].label}</span>
                        <span className="number">{formatNum(list[1].number)}</span>
                        <i className={list[1].change}></i>
                    </li>
                    <li>
                        <i className="icon ranking_3"></i>
                        <span className="label">{list[2].label}</span>
                        <span className="number">{formatNum(list[2].number)}</span>
                        <i className={list[2].change}></i>
                    </li>
                    <li>
                        <i className="icon">4</i>
                        <span className="label">{list[3].label}</span>
                        <span className="number">{formatNum(list[3].number)}</span>
                        <i className={list[3].change}></i>
                    </li>
                    <li>
                        <i className="icon">5</i>
                        <span className="label">{list[4].label}</span>
                        <span className="number">{formatNum(list[4].number)}</span>
                        <i className={list[4].change}></i>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Main;
