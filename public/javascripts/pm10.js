//pm10 浓度图
require.config({
    paths: {
        //echarts: 'http://echarts.baidu.com/build/dist'
        echarts: 'dist'
    }
});

// 使用
require(
    [
        'echarts',
        //'echarts/chart/line'
        'echarts/chart/gauge' // 使用柱状图就加载bar模块，按需加载
    ],
    function(ec) {
        // 基于准备好的dom，初始化echarts图表
        var pm10Chart = ec.init(document.getElementById('pm10'));

        option = {
            tooltip: {
                formatter: "{a} <br/>{b} : {c}"
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            series: [{
                name: 'pm10 浓度示意图',
                type: 'gauge',
                center: ['50%', '50%'], // 默认全局居中
                radius: [0, '100%'],
                startAngle: 230,
                endAngle: -50,
                min: 0, // 最小值
                max: 500, // 最大值
                precision: 0, // 小数精度，默认为0，无小数点
                splitNumber: 10, // 分割段数，默认为5
                axisLine: { // 坐标轴线
                    show: true, // 默认显示，属性show控制显示与否
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [0.2, 'lightgreen'],
                            [0.4, 'yellow'],
                            [0.6, 'orange'],
                            [0.8, 'pink'],
                            [1, 'red']
                        ],
                        width: 30
                    }
                },
                axisTick: { // 坐标轴小标记
                    show: true, // 属性show控制显示与否，默认不显示
                    splitNumber: 5, // 每份split细分多少段
                    length: 8, // 属性length控制线长
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: '#eee',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
                    show: true,
                    formatter: function(v) {
                        switch (v + '') {
                            case '50':
                                return '很低';
                            case '150':
                                return '较低';
                            case '250':
                                return '中等';
                            case '350':
                                return '较高';
                            case '450':
                                return '很高';
                            default:
                                return '';
                        }
                    },
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#333'
                    }
                },
                splitLine: { // 分隔线
                    show: true, // 默认显示，属性show控制显示与否
                    length: 30, // 属性length控制线长
                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                        color: '#eee',
                        width: 2,
                        type: 'solid'
                    }
                },
                pointer: {
                    length: '80%',
                    width: 8,
                    color: 'auto'
                },
                title: {
                    show: true,
                    offsetCenter: ['0%', 60], // x, y，单位px
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#333',
                        fontSize: 15
                    }
                },
                detail: {
                    show: true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 100,
                    height: 40,
                    offsetCenter: ['0%', 70], // x, y，单位px
                    formatter: '{value}μg/m³',
                    textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: 'auto',
                        fontSize: 30
                    }
                },
                data: [{
                    value: 50,
                    name: 'pm10 浓度'
                }]
            }]
        };

       /* clearInterval(timeTicket);
        var timeTicket = setInterval(function() {
            option.series[0].data[0].value = (Math.random() * 500).toFixed(0) - 0;*/
            pm10Chart.setOption(option, true);
        /*}, 2000)*/

    }
);