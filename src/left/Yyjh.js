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
                lineStyle:{
                    color: '#aaa'
                }
            }
        }]
    };
}
function getCityData(myChart) {
    const data = window.dataPool.yyjhData
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
        const percents = [61.82, 31.73, 6.45]
        const labels = ['一般', '心情开心', '心情难过']
        const fragData = [ {
            label: '问答次数',
            number: 5784670
        },  {
            label: '平均交互轮数',
            number: 9.56
        }]
        return (
            <div className="yyjh">
                <div className="chart-title">
                    <div className="chart-label">语用交互模型</div>
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