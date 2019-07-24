import React, { Component } from 'react';
import moment from 'moment'
import 'moment/locale/zh-cn'

class Main extends Component {
    state = { date: '' }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                date: moment().format('YYYY年MM月DD日 HH:mm dddd')
            })
        }, 1000)
    }
    render() {
        return (
            <div className="middle-header">
                <div className="title">云知声KEROS 产品交互数据</div>
                <div className="date">{this.state.date}</div>
            </div>
        );
    }
}

export default Main;
