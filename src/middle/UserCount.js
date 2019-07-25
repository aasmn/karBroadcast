import React, { Component } from 'react';

function getRandom(min, max) {
    return min + Math.round(Math.random() * (max - min))
}
class UserNumberFq extends Component {
    state = {
        number: 1234567
    }
    componentDidMount() {
        setInterval(() => {
            this.setState((preState) => {
                return {
                    number: preState.number + getRandom(1, 10)
                }
            })
        }, 1000)
    }
    render() {
        const arr = this.state.number.toString().split('')
        return (
            <ul className="mildle-users-count">
                <li className="number borders">{arr[0]}</li>
                <li className="dot"></li>
                <li className="number borders">{arr[1]}</li>
                <li className="number borders">{arr[2]}</li>
                <li className="number borders">{arr[3]}</li>
                <li className="dot"></li>
                <li className="number borders">{arr[4]}</li>
                <li className="number borders">{arr[5]}</li>
                <li className="number borders">{arr[6]}</li>
            </ul>
        );
    }
}
function formatNum(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
}
class UserNumber extends Component {
    state = {
        number: 6177745
    }
    componentDidMount() {
        setInterval(() => {
            this.setState((preState) => {
                return {
                    number: preState.number + getRandom(1, 10)
                }
            })
        }, 5000)
    }
    render() {
        const numberStr = formatNum(this.state.number)
        return (
            <div className="device number borders" style={{ background: 'linear-gradient(#1b9fd1,transparent,#1b9fd1)' }}>{numberStr}</div>
        );
    }
}
class DeviceNumber extends Component {
    state = {
        number: 3978061615
    }
    componentDidMount() {
        setInterval(() => {
            this.setState((preState) => {
                return {
                    number: preState.number + getRandom(1, 9)
                }
            })
        }, 500)
    }
    render() {
        const numberStr = formatNum(this.state.number)
        return (
            <div className="device number borders" style={{ width: '235px', background: 'linear-gradient(#1b9fd1,transparent,#1b9fd1)' }}>{numberStr}</div>
        );
    }
}


class Main extends Component {
    render() {
        return (
            <div className="mildle-users">
                <div className="block">
                    <div className="title">总用户量</div>
                    <UserNumber />
                </div>
                <div className="block">
                    <div className="title">总交互量</div>
                    <DeviceNumber />
                </div>
            </div >
        );
    }
}

export default Main;
