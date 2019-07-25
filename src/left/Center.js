import React, { Component } from 'react';
import echarts from 'echarts'
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
            top: 5,
            bottom: 5,
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
                    color: '#fff'
                }
            },
            barWidth: 15,
            itemStyle: {
                color(item) {
                    var colorMap = ['#017aff', '#06d2c6', '#ffbb32', '#2dcd47', '#e469ff'].reverse()
                    return colorMap[item.dataIndex] || '#e469ff'
                }
            }
        }]
    };
}
function getCityData(myChart) {
    const data = window.dataPool.leftCenter
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
                    <div className="chart-label">Skill访问排行</div>
                </div>
                <div className="chart borders" ref={e => this.el = e} style={{ height: 185, width: '100%', margin: '10px 0' }}>

                </div>
            </div>
        );
    }
}

export default Main;
