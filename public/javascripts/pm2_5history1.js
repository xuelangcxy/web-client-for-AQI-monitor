//pm2.5 历史浓度变化图
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
        'echarts/chart/line',
        'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
    ],
    function(ec) {
        // 基于准备好的dom，初始化echarts图表
        var pm2_5historyChart = ec.init(document.getElementById('pm2_5historychart'));

        option = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            legend: {
                data: ['pm 2.5浓度', 'pm 10浓度', '气温']
            },
            xAxis: [{
                type: 'category',
                data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
            }],
            yAxis: [{
                type: 'value',
                name: '浓度',
                axisLabel: {
                    formatter: '{value} μg/m³'
                }
            }, {
                type: 'value',
                name: '温度',
                axisLabel: {
                    formatter: '{value} °C'
                }
            }],
            series: [

                {
                    name: 'pm 2.5浓度',
                    type: 'bar',
                    data: [24, 136, 79, 32, 256, 125, 335, 68, 189, 200, 64, 233]
                }, {
                    name: 'pm 10浓度',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                }, {
                    name: '气温',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };
        
        for (var i = 0; i < 12; i++) {
            option.series[0].data[0][i] = (Math.random() * 500).toFixed(0) - 0;
            //option.series[0].data[i].value = (Math.random() * 500).toFixed(0) - 0;
        };
        
        pm2_5historyChart.setOption(option, true);
    }
);