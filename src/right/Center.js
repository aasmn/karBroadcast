import React, { Component } from 'react';
import echarts from 'echarts'

function getOption() {
    return {
        title: {
            show: false
        },
        tooltip: {
            show: true,
        },
        legend: {
            show: true,
            ...window.legendSetting,
            top: 'top',
            left: 'center'
        },
        grid: {
            top: 20,
            left: 65,
            right: 30,
            bottom: 60
        },
        xAxis: {
            name: '分钟',
            type: 'category',
            nameTextStyle: {
                color: '#1b9fd1',
                fontSize: window.fontSize_axis
            },
            ...window.axisSetting,
            axisLine: {
                lineStyle: {
                    color: '#1b9fd1'
                }
            },
            axisLabel: {
                ...window.axisSetting.axisLabel,
                color: '#1b9fd1',
                rotate: 55
            }
        },
        yAxis: {
            name: '用户数量',
            type: 'value',
            scale: true,
            ...window.axisSetting,
            splitLine: {
                ...window.splitLineSetting,
                lineStyle: {
                    color: '#02344c'
                }
            },
            axisLine: { show: false },
            axisLabel: {
                color: '#fff'
            }
        },
        series: [{
            type: 'bar',
            yAxisIndex: 0,
            barWidth: 30,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: '#00deff' },
                        { offset: 0.5, color: '#30aaff' },
                        { offset: 1, color: '#5385ff' }
                    ]
                )
            },
            areaStyle: {
                normal: {
                    opacity: 0.1
                }
            }
        }]
    };
}
function getCityData(myChart) {
    const data = window.dataPool.rightCenter
    if (!data) {
        setTimeout(getCityData, 500)
        return;
    };
    var option = getOption();
    option.series[0].data = data.yData
    option.xAxis.data = data.xData
    myChart.setOption(option);
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
                    <div className="chart-label">机器人使用时长分布</div>
                </div>
                <div className="chart borders" ref={e => this.el = e} style={{ height: 230, width: '100%', margin: '10px 0' }}>

                </div>
            </div>
        );
    }
}

export default Main;
