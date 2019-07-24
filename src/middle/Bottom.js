import React, { Component } from 'react';
import echarts from 'echarts'
import 'echarts-wordcloud'
import _ from 'lodash'
const intervalNum = 10000000
const WORDCOUNT = 25
let el1, el2
function getOption() {
    return {
        title: {
            show: false,
            text: '城市实时调用量排名',
            ...window.titleSetting
        },
        legend: {
            show: true,
            ...window.legendSetting
        },
        series: [{
            animation: true,
            animationDuration: 3000,
            name: '',
            type: 'wordCloud',
            sizeRange: [20, 40],
            rotationRange: [-90, 90],
            rotationStep: 22.5,
            gridSize: 15,
            width: '90%',
            height: '80%',
            autoSize: {
                enable: true,
                minSize: 6
            },
            textStyle: {
                normal: {
                    color: '#1b9fd1'
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: []
        }]
    }
}
function getRandom(min, max) {
    return min + Math.round(Math.random() * (max - min))
}

function getRandomWord(wordList, count) {
    const selected = [], result = []
    let cnt = 0
    while (cnt < count) {
        let index = getRandom(0, wordList.length)
        if (selected.indexOf(index) < 0) {
            selected.push(index)
            result.push(wordList[index])
            cnt++;
        }
    }
    return result;
}

function renderChart1(myChart, nextChart) {
    const cityPv = window.dataPool.centerBottom
    if (!(cityPv && cityPv.length > 0)) {
        setTimeout(() => {
            renderChart1(myChart, nextChart)
        }, 1000)
        return;
    } else if (nextChart) {
        setTimeout(() => {
            renderChart2(nextChart)
        }, intervalNum / 2)
    }
    el2.style.opacity = 0
    el1.style.opacity = 1
    var option = getOption()
    var JosnList = [];
    const data = getRandomWord(cityPv, WORDCOUNT)

    _.each(data, (item, index) => {
        JosnList.push({
            name: item,
            value: index % 5
        })
    })
    // option.title.text= "调用量排名1"
    option.series[0].data = JosnList;
    myChart.setOption(option);
    setTimeout(() => {
        renderChart1(myChart)
    }, intervalNum)
}
function renderChart2(myChart) {
    const cityPv = window.dataPool.centerBottom
    if (!(cityPv && cityPv.length > 0)) {
        setTimeout(() => {
            // renderChart2(myChart)
        }, 1000)
        return;
    }
    el2.style.opacity = 1
    el1.style.opacity = 0

    var option = getOption()
    // option.title.text= "调用量排名2"
    var JosnList = [];
    const data = getRandomWord(cityPv, WORDCOUNT)

    _.each(data, (item, index) => {
        JosnList.push({
            name: item,
            value: index % 5
        })
    })
    option.series[0].data = JosnList;
    myChart.setOption(option);
    setTimeout(() => {
        renderChart2(myChart)
    }, intervalNum)
}

class Main extends Component {
    componentDidMount() {
        var myChart1 = echarts.init(el1);
        var myChart2 = echarts.init(el2);
        renderChart1(myChart1, myChart2)
    }
    render() {
        return (
            <div className="middle-bottom">
                <div className="chart-title">
                    <div className="chart-label">实时语音交互</div>
                </div>
                <div className="chart borders" ref={e => this.el = e} style={{ height: 245, width: '100%', margin: '10px 0' }}>
                    <div className="wordcloud" ref={e => el1 = e}></div>
                    <div className="wordcloud" ref={e => el2 = e} style={{ opacity: 0 }}></div>
                </div>
            </div>
        );
    }
}

export default Main;
