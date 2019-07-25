import React, { Component } from 'react';
import _ from 'lodash'

const showList = {}

function getRandom(min, max) {
    return min + Math.round(Math.random() * (max - min))
}
function insertWord(el, word) {
    var that = document.createElement('div')
    that.className = 'word';
    let top = getRandom(5, 220)
    let left = getRandom(0, 7)
    let fontSize = getRandom(14, 32)
    that.style.top = top + 'px'
    that.style.fontSize = fontSize + 'px'
    that.style.animation = 'word-bullet-' + left + ' 5s'
    that.innerHTML = word
    const pos = _.find(showList, (val, key) => {
        return val.left === left && Math.abs(val.top - top) < 30
    })
    if (pos) return;
    el.appendChild(that)
    showList[word] = {
        top,
        left,
        timestamp: new Date()
    }
    setTimeout(() => {
        el.removeChild(that)
        delete showList[word]
    }, 5000)

}
function pushWord(el, wordList) {
    let word = wordList[getRandom(0, wordList.length - 1)]
    if (!showList[word]) {
        insertWord(el, word)
    }
    setTimeout(() => {
        pushWord(el, wordList)
    }, getRandom(10, 100))
}

function renderChart1(el) {
    const wordList = window.dataPool.centerBottom
    if (!(wordList && wordList.length > 0)) {
        setTimeout(() => {
            renderChart1(el)
        }, 1000)
        return;
    }
    pushWord(el, wordList)
}
class Main extends Component {
    componentDidMount() {
        renderChart1(this.el)
    }
    render() {
        return (
            <div className="middle-bottom">
                <div className="chart-title">
                    <div className="chart-label">实时语音交互</div>
                </div>
                <div className="chart borders" style={{ height: 245, width: '100%', margin: '10px 0' }}>
                    <div className="word-run" ref={e => this.el = e} style={{ height: 245, width: '100%', overflow: 'hidden', position:'relative' }}></div>
                </div>
            </div>
        );
    }
}

export default Main;
