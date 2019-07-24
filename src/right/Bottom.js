import React, { Component } from 'react';

class Circle extends Component {
    render() {
        const { percents } = this.props
        const colors = ['#00dfb2', '#fff523', '#f82a6d']
        const styles = percents.map((p, index) => {
            const cl = 3.14 * 2 * (50 - 10 * index) * p / 100;
            console.log('percents:', p, cl)
            return {
                stroke: colors[index],
                strokeDasharray: `${cl} 300`
            }
        })
        const strokeWidth = 8
        const d = percents.map((p, index) => {
            const pos1 = 50 - 10 * index - strokeWidth / 2
            return `M 50,50 m 0,${pos1} a ${pos1},${pos1} 0 1 1 0,-${pos1 * 2} a ${pos1},${pos1} 0 1 1 0,${pos1 * 2}`
        })

        return (<svg className="circle" viewBox="0 0 100 100">
            {percents.map((p, i) => {
                return <path key={p} d={d[i]} strokeLinecap="round" strokeWidth={strokeWidth} fillOpacity="0" style={styles[i]}></path>
            })}
        </svg>)
    }
}

class ChartLabel extends Component {
    render() {
        let { percents, labels } = this.props
        percents = [].concat(percents)
        percents.reverse()
        labels = [].concat(labels)
        labels.reverse()
        return (
            <div className="labels">
                {labels.map((l, i) => {
                    return <div key={l} className="label-row">
                        <span className="label">{l}</span>
                        <span className="percent">{percents[i]}%</span>
                    </div>
                })}
            </div>
        )
    }
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
    render() {
        const percents = [61.82, 31.73, 6.45]
        const labels = ['一般', '心情开心', '心情难过']
        const fragData = [{
            label: '总使用时长',
            number: 141877617
        }, {
            label: '问答次数',
            number: 5784670
        }, {
            label: '每天人均会话次数',
            number: 3.37
        }, {
            label: '每次会话平均交互轮数',
            number: 9.56
        }]
        return (
            <div className="right-bottom">
                <div className="chart-title">
                    <div className="chart-label">语用交互模型</div>
                </div>
                <div className="chart borders" style={{ height: 175, width: '100%', margin: '10px 0' }}>
                    <div className="inner-left" style={{ width: 320, float: 'left' }}>
                        {fragData.map(frag => {
                            return (<Frag key={frag.label} {...frag} />)
                        })}
                    </div>
                    <div className="inner-right">
                        <Circle percents={percents} />
                        <ChartLabel percents={percents} labels={labels} />
                    </div>
                </div>

            </div>
        );
    }
}

export default Main;
