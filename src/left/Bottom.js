import React, { Component } from 'react';
import echarts from 'echarts'
function getOption() {
    const itemStyle = {
        color: ({ dataIndex }) => {
            const hour = new Date().getHours()
            if (dataIndex <= hour) {
                return '#f3f402'
            } else {
                return '#1c2e27'
            }

        }
    }
    return {
        title: {
            show: false
        },
        tooltip: {
            show: true
        },
        grid: {
            top: 20,
            bottom: 30,
            left: 50,
            right: 10
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                color: '#1b9fd1',
            },
            axisLine: {
                lineStyle: {
                    color: '#1b9fd1'
                }
            },
        },
        yAxis: {
            type: 'value',
            name: '',
            axisLabel: {
                color: '#fff',
                formatter: function (value, index) {
                    console.log(value, Math.round(value / 1000) / 10 + '万')
                    return Math.round(value / 1000) / 10 + '万';
                }
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#02344c'
                }
            }
        },
        series: [{
            name: '',
            type: 'bar',
            barWidth: 6,
            itemStyle: {
                color: '#093770'
            }
        },
        {
            name: '',
            type: 'line',
            itemStyle: {
                color: '#f3f402'
            },
            lineStyle: {
                color: '#f3f402'
            }
        }]
    };
}
function getCityData(myChart) {
    const data = window.dataPool.leftBottom
    if (!data) {
        setTimeout(getCityData, 500)
        return;
    };
    const now = new Date()
    const hour = now.getHours() + 1
    var option = getOption();
    option.series[0].data = data.barData
    option.series[1].data = data.lineData.slice(0, hour)
    option.xAxis.data = data.timeData
    myChart.setOption(option);
    const leftMinutes = 60 - now.getMinutes()
    setTimeout(() => {
        getCityData(myChart)
    }, leftMinutes * 60 * 1000)
}

class Main extends Component {
    componentDidMount() {
        var myChart = echarts.init(this.el);
        getCityData(myChart)
    }
    render() {
        return (
            <div className="left-top">
                <div className="chart-title">
                    <div className="chart-label">用户活跃时间段分布</div>
                </div>
                <div className="chart borders" ref={e => this.el = e} style={{ height: 165, width: '100%', margin: '10px 0' }}>

                </div>
            </div>
        );
    }
}

export default Main;
