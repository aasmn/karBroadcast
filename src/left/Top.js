import React, { Component } from 'react';
import echarts from 'echarts'
const seriesData = []
const xAxisData = []
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
            left: 65,
            right: 75,
            bottom: 50
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
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
        yAxis: [{
            name: '',
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
        }, {
            name: '',
            type: 'value',
            scale: true,
            position: 'right',
            nameTextStyle: {
                color: '#fff'
            },
            ...window.axisSetting,
            splitLine: {
                show: false
            },
            axisLabel: {
                color: '#fff'
            }
        }],
        series: [{
            name: '日活跃数',
            data: seriesData,
            type: 'line',

            yAxisIndex: 0,
            itemStyle: {
                normal: {
                    color: "#14eea9",
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            areaStyle: {
                normal: {
                    opacity: 0.1
                }
            }
        }, {
            name: '日调用量',
            data: seriesData,
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: "#2553b5",
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
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
    const data = window.dataPool.leftTop
    if (!data) {
        setTimeout(getCityData, 500)
        return;
    };
    var option = getOption();
    option.series[0].data = data.dayData
    option.series[1].data = data.callData
    option.xAxis.data = data.dateData
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
                    <div className="chart-label">近一周日活和调用量</div>
                </div>
                <div className="chart borders" ref={e => this.el = e} style={{ height: 225, width: '100%', margin: '10px 0' }}>

                </div>
            </div>
        );
    }
}

export default Main;
