import React, { Component } from 'react';
import male from '../static/male.svg'
import female from '../static/female.svg'
import childboy from '../static/childboy.svg'
import childgirl from '../static/childgirl.svg'
import Progress from '../common/Progress'


class AgePercent extends Component {
    render() {
        const { age, percent } = this.props.data
        const className = "age-row " + (this.props.className || '')
        return (
            <div className={className}>
                <div className="age">{age}</div>
                <Progress percent={parseFloat(percent)} />
                <div className="percent">{percent}</div>
            </div>
        )
    }
}
class Body extends Component {
    render() {
        const { mpercent, fpercent, data, left, ischild } = this.props
        const imgFemale = ischild ? childgirl : female
        const imgMale = ischild ? childboy : male
        const className = data.length === 3 ? 'more-margin' : ''
        return (
            <div className="body" style={{ height: '100%',left }}>
                <div className="inner-left">
                    <div className="title">性别占比</div>
                    <div className="person">
                        <img src={imgFemale} />
                        <img src={imgMale} />
                    </div>
                    <div className="progress">
                        <div className="clearfix">
                            <div className="female">{fpercent}%</div>
                            <div className="male">{mpercent}%</div>
                        </div>
                        <Progress percent={fpercent} bgColor="#1f61cf" />
                    </div>
                </div>
                <div className="inner-right">
                    <div className="title">用户年龄分布</div>
                    {data.map((item, index) => {
                        if (index === 0)
                            return (<AgePercent key={item.age} data={item} />)
                        else
                            return (<AgePercent className={className} key={item.age} data={item} />)
                    })}
                </div>
            </div>
        )
    }
}

class Main extends Component {
    state = {
        left1: 0,
        left2: 600,
        title: '家长'
    }
    componentDidMount() {
        setInterval(() => {
            this.setState(preState => {
                return {
                    left1: preState.left1 === 0 ? -555 : 0,
                    left2: preState.left2 === 0 ? 600 : 0,
                    title: preState.title === '家长' ? '宝宝' : '家长'
                }
            })
        }, 5000)
    }
    render() {
        const ageData = ["23-29岁", "30-34岁", "35-39岁", "40-49岁", "50岁以上"]
        const percent = ["37.97%", "29.69%", "19.81%", "9.06%", "3.47%"]
        const data = ageData.map((age, index) => {
            return {
                age,
                percent: percent[index]
            }
        })
        const babyAageData = ["0-6岁", "7岁-14岁", "14岁以上"]
        const babyPercent = ["64.41%", "29.75%", "5.83%"]
        const babyData = babyAageData.map((age, index) => {
            return {
                age,
                percent: babyPercent[index]
            }
        })

        return (
            <div className="right-top">
                <div className="chart-title">
                    <div className="chart-label">声纹用户画像-<span style={{ color: '#ffff00', fontSize: '0.9em' }}>{this.state.title}</span></div>
                </div>
                <div className="chart borders" ref={e => this.el = e} style={{ height: 195, width: '100%', margin: '10px 0' }}>
                    <div style={{ overflow: 'hidden', width: '100%', height: '100%', position: 'relative' }}>
                        <Body mpercent="38.78" fpercent="61.22" data={data} left={this.state.left1} />
                        <Body ischild={true} mpercent="56.39" fpercent="43.61" data={babyData} left={this.state.left2} />
                    </div>
                </div>
            </div >
        );
    }
}

export default Main;
