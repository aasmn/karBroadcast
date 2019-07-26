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

class Frag extends Component {
    render() {
        const { label, number } = this.props
        return (
            <div className="frag">
                <div className="label">{label}:</div>
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
            label: '活跃度',
            number: "32.71%"
        }, {
            label: '日均使用时长',
            number: "53min"
        }, {
            label: '日均对话次数',
            number: '3.2次'
        }, {
            label: '平均交互轮数',
            number: '8.82轮'
        }]
        return (
            <div className="rmf">
                <div className="chart-title">
                    <div className="chart-label">用户价值分析-RFM模型</div>
                </div>
                <div className="chart borders" style={{ height: 160, width: '100%', margin: '10px 0', display: 'flex' }}>
                    <div className="inner-left" ref={e => this.el = e} style={{ width: 355, height: 160 }}>

                    </div>
                    <div className="inner-right" style={{ flex: 1, position: 'relative' }}>
                        <div className="fragbox">
                            {fragData.map(frag => {
                                return (<Frag key={frag.label} {...frag} />)
                            })}
                        </div>
                    </div>
                    <div className="arrow">>>></div>
                </div>
            </div >
        );
    }
}

export default Main;
