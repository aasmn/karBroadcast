import React, { Component } from 'react';
import echarts from 'echarts'
import _ from 'lodash'
function getOption() {
    return {
        title: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 10,
            bottom: 10,
            left: 10,
            containLabel: true
        },
        series: [{
            name: '面积模式',
            type: 'pie',
            radius: [40, 60],
            center: ['50%', '50%'],
            startAngle: 135,
            itemStyle: {
                color(item) {
                    var colorMap = ['#56a1f2', '#33b192', '#e66d69', '#ec9540', '#fb403b']
                    return colorMap[item.dataIndex] || '#0177fd'
                },
                borderColor: '#001124',
                borderWidth: 2,
                borderType: 'solid'
            },
            label: {
                normal: {
                    formatter: '{per|{d}%}\n{hr|}\n{b|{b}}',
                    rich: {
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            color: '#1b9fd1',
                            lineHeight: 16
                        },
                        per: {
                            color: '#eee',
                            padding: [2, 4]
                        }
                    }
                }
            },
            labelLine: {
                lineStyle: {
                    color: '#aaa'
                }
            }
        }]
    };
}
function getRandom(min, max) {
    return min + Math.round(Math.random() * (max - min))
}
function getCityData(myChart) {
    const data = window.dataPool.yyjhData
    if (!data) {
        setTimeout(getCityData, 500)
        return;
    };
    var option = getOption();
    option.series[0].data = data;
    const orgData = _.cloneDeep(data)
    myChart.setOption(option);
    setInterval(() => {
        let index = getRandom(0, data.length - 1)
        data[index].value = data[index].value * getRandom(95, 105) / 100
        if (Math.abs(orgData[index].value - data[index].value) > 5) {
            data[index].value = data[index].value + (orgData[index].value > data[index].value ? 5 : -5)
        }
        myChart.setOption(option);

    }, 10000)
}

class Frag extends Component {
    render() {
        const { label, number } = this.props
        return (
            <div className="frag">
                <div className="label">{label}</div>
                <div className="number">{number}</div>
            </div>
        )
    }
}

class Main extends Component {
    componentDidMount() {
        var myChart = echarts.init(this.el);
        getCityData(myChart)
    }
    render() {

        const fragData = [{
            label: '问答次数',
            number: 7117495
        }, {
            label: '平均交互轮数',
            number: 8.23
        }]
        return (
            <div className="yyjh">
                <div className="chart-title">
                    <div className="chart-label">语音声纹情绪分析</div>
                </div>
                <div className="chart borders" style={{ height: 182, width: '100%', margin: '10px 0' }}>
                    <div className="inner-left" >
                        {fragData.map(frag => {
                            return (<Frag key={frag.label} {...frag} />)
                        })}
                    </div>
                    <div className="inner-right" ref={e => this.el = e}>

                    </div>
                </div>

            </div>
        );
    }
}

export default Main;
