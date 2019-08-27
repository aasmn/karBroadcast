import React, { Component } from 'react';
import echarts from 'echarts'
function formatNum(num) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
}
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
        xAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            }
        },
        yAxis: {
            name: '',
            type: 'category',
            ...window.axisSetting,
            splitLine: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                ...window.axisSetting.axisLabel,
                color: '#1b9fd1',
            },
            axisTick: {
                show: false
            }
        },
        series: [{
            type: 'bar',
            label: {
                normal: {
                    position: 'right',
                    show: true,
                    color(item) {
                        var colorMap = ['#ffff5a', '#f5f7ea', '#ffd978', '#fff', '#fff'].reverse()
                        return colorMap[item.dataIndex] || '#fff'
                    },
                    formatter: function (value, index) {
                        console.log('formatter', value)
                        return formatNum(value.data)
                    }
                }
            },
            barWidth: 15,
            itemStyle: {
                color(item) {
                    var colorMap = ['#ffff5a', '#f5f7ea', '#ffd978', new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            { offset: 0, color: '#5385ff' },
                            { offset: 0.5, color: '#30aaff' },
                            { offset: 1, color: '#00deff' }
                        ]
                    ), new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            { offset: 0, color: '#5385ff' },
                            { offset: 0.5, color: '#30aaff' },
                            { offset: 1, color: '#00deff' }
                        ]
                    )].reverse()
                    return colorMap[item.dataIndex] || '#e469ff'
                }
            }
        }]
    };
}
function getCityData(myChart) {
    const data = window.dataPool.rightCenter2
    if (!data) {
        setTimeout(getCityData, 500)
        return;
    };
    var option = getOption();
    option.series[0].data = data.xData.reverse()
    option.yAxis.data = data.yData.reverse()
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
                    <div className="chart-label">热门点播榜</div>
                </div>
                <div className="chart borders" style={{ height: 173, width: '100%', margin: '10px 0' }}>
                    <div style={{ width: 40, float: 'left' }}>
                        <ul className="ranking-list" style={{ marginTop: '12px' }}>
                            <li>
                                <i className="icon ranking_1"></i>
                            </li>
                            <li>
                                <i className="icon ranking_2"></i>
                            </li>
                            <li>
                                <i className="icon ranking_3"></i>
                            </li>
                            <li>
                                <i className="icon">4</i>
                            </li>
                            <li>
                                <i className="icon">5</i>
                            </li>
                        </ul>
                    </div>
                    <div ref={e => this.el = e} style={{ height: 175, width: 490, float: 'right' }}>

                    </div>
                </div>

            </div>
        );
    }
}

export default Main;
