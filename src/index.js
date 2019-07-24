import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import './server'
window.fontSize_title = 18
window.fontSize_legend = 12
window.fontSize_axis = 12
window.titleSetting = {
    textStyle: { 
        color: "#fff", 
        fontSize: window.fontSize_title,
        fontFamily: 'Microsoft YaHei'
    },
    left: 'center',
    top: 'top'
}
window.titleSetting = {
    textStyle: { color: "#fff", fontSize: window.fontSize_title },
    left: 'center',
    top: 10
}
window.legendSetting = {
    textStyle: {
        color: '#1b9ed0',
        fontSize: window.fontSize_legend
    },
    bottom: 0
}
window.axisSetting = {
    axisLine: {
        lineStyle: {
            color: 'rgba(255,255,255,.2)',
            width :1
        }
    },
    axisLabel: {
        show: true,
        fontSize: window.fontSize_axis,
        color: '#1b9ed0'
    }
}
window.splitLineSetting = {
    lineStyle: {
        color: 'rgba(255,255,255,.2)'
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
