import React, { Component } from 'react';
import 'echarts-gl';
import echarts from 'echarts'
import '../map/china'

import cityGps from '../gps'
import _ from 'lodash'
function getRandom(min, max) {
    return min + Math.round(Math.random() * (max - min))
}

const option = {
    geo: {
        map: 'china',
        roam: false,
        zoom: 1.1,
        label: {
            emphasis: {
                show: false
            }
        },
        silent: true,
        itemStyle: {
            normal: {
                areaColor: 'rgba(11,69,82,.4)',
                borderColor: '#17a9a4'
            }
        }
    },
    series: [
        {
            animation: false,
            name: '强',
            type: 'effectScatter',
            showEffectOn: 'render',
            rippleEffect: {
                period: 4,
                scale: 6,
                brushType: 'stroke'
            },
            coordinateSystem: 'geo',
            symbolSize(dataArr) {
                if (dataArr[3] < 20) {
                    return 8
                }
                return 3
            },
            itemStyle: {
                color: '#ffff00'
            },
            data: new Array(),
            zlevel: 1
        }
    ]
}

function pushRandomData(source, target, cityName, pv) {
    target.push([source[0][0], source[0][1], cityName, pv])
}

function createMockData() {
    return ["深圳", "重庆", "广州", "成都", "长沙", "郑州", "北京", "杭州", "哈尔滨", "佛山", "武汉", "东莞", "济南", "石家庄", "合肥", "临沂", "长春", "潍坊", "苏州", "泉州", "南京", "青岛", "福州", "上海", "西安", "南宁", "徐州", "温州", "济宁", "烟台", "天津", "南阳", "拉萨", "西宁", "菏泽", "惠州", "昆明", "宁波", "大连", "商丘", "常德", "赣州", "无锡", "宜春", "沈阳", "齐齐哈尔", "南通", "茂名", "湛江", "廊坊", "金华", "唐山", "保定", "海口", "常州", "厦门", "衡阳", "岳阳", "衡水", "太原", "龙岩", "连云港", "邵阳", "中山", "枣庄", "佳木斯", "盐城", "玉林", "周口", "聊城", "株洲", "安庆", "娄底", "梅州", "台州", "南昌", "永州", "九江", "怀化", "邢台", "柳州", "焦作", "漳州", "贵阳", "阜阳", "淄博", "绍兴", "信阳", "绥化", "新乡", "兰州", "丽水", "河源", "乌鲁木齐", "淮安", "邯郸", "呼和浩特", "许昌", "清远", "沧州", "江门", "达州", "宿迁", "平顶山", "桂林", "吉安", "泰安", "益阳", "揭阳", "南充", "安阳", "嘉兴", "东营", "宁德", "吉林", "梧州", "襄阳", "滨州", "黄冈", "绵阳", "牡丹江", "呼伦贝尔", "德州", "荆州", "汕头", "大庆", "扬州", "淮南", "威海", "钦州", "驻马店", "阳江", "银川", "漯河", "遵义", "日照", "泰州", "河池", "郴州", "德阳", "咸阳", "宜宾", "贵港", "韶关", "宿州", "亳州", "莆田", "渭南", "淮北", "三明", "泸州"].map((t, idx) => ({ city: t, pv: idx }))
}
let mapData = [];
function renderData(myChart) {
    // const data = isMock ? createMockData() : window.dataPool.cityPv
    let data = createMockData()
    if (!data) return;
    const cities = _.keys(cityGps)
    data = data.slice(0, 150)
    var chartData = [];
    _.each(data, (d => {
        const cityName = _.find(cities, t => t.indexOf(d.city) === 0)
        // console.log('cityName:', cityName)
        if (cityName) {
            pushRandomData(cityGps[cityName], chartData, cityName, d.pv)
        }

    }))
    pushData()
    function pushData() {
        if (chartData.length > 0) {
            let count = 0
            while (chartData.length > 0 && count < 10) {
                mapData.push(chartData.shift())
                option.series[0].data = mapData
                myChart.setOption(option)
                count++
            }
            setInterval(pushData, 100)
        }
    }

}


class App extends Component {
    componentDidMount() {
        var myChart = echarts.init(this.el);
        myChart.setOption(option);
        renderData(myChart)
    }
    render() {
        return (
            <div className="middle-map" ref={e => this.el = e}>
            </div>
        );
    }
}

export default App;
