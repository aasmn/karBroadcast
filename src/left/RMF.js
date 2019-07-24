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
            top: 10,
            bottom: 10,
            left: 10,
            containLabel: true
        },
        series: [{
            name: '面积模式',
            type: 'pie',
            radius: [20, 50],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                color(item) {
                    var colorMap = ['#0177fd', '#d613ff', '#feb827', '#2dcd47'].reverse()
                    return colorMap[item.dataIndex] || '#0177fd'
                }
            },
            label: {
                normal: {
                    show: true,
                    color: '#1b9fd1'
                }
            },
        }]
    };
}
function getCityData(myChart) {
    const data = window.dataPool.RMFData
    if (!data) {
        setTimeout(getCityData, 500)
        return;
    };
    var option = getOption();
    option.series[0].data = data
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
                    <div className="chart-label">用户价值分析-RFM模型</div>
                </div>
                <div className="chart borders" ref={e => this.el = e} style={{ height: 160, width: '100%', margin: '10px 0' }}>

                </div>
            </div>
        );
    }
}

export default Main;
