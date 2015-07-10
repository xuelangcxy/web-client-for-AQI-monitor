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
                data: ['pm 2.5浓度']
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
            }],
            series: [

                {
                    name: 'pm 2.5浓度',
                    type: 'line',
                    data: [24, 136, 79, 32, 256, 125, 335, 68, 189, 200, 64, 233]
                },{
                    name: 'pm 2.5浓度',
                    type: 'bar',
                    data: [24, 136, 79, 32, 256, 125, 335, 68, 189, 200, 64, 233]
                },
            ]
        };
        
        /*clearInterval(timeTicket);
        var timeTicket = setInterval(function() {*/
            for (var i = 0; i < 12; i++) {
            option.series[0].data[i] = option.series[1].data[i] = (Math.random() * 500).toFixed(0) - 0;
        };
            pm2_5historyChart.setOption(option, true);
        /*}, 2000)*/
    }
);