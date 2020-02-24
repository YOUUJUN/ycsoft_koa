<template>

    <div class="panels">

        <div class="container panel-content">
            <div class="area cols-md-12 cols-sm-12">

                <div id="map-point"></div>

                <div class="ribbon">
                    <img class="ribbon-logo" src="images/contact.png">
                    <h3 class="ribbon-title">联系我们</h3>
                    <p class="ribboon-doc">平均24小时服务时效</p>
                    <p class="ribbon-tel">可咨询服务热线：888-888-888</p>
                </div>

            </div>
        </div>

    </div>
    
</template>

<script>
    import 'echarts/map/js/china.js'
    export default {
        name: "Panels",
        mounted() {
            this.drawLine();
        },
        methods : {
            drawLine (){
                var t = this.$echarts.init(document.getElementById("map-point"));

                var geoCoordMap = {"铜陵玉成软件":[117.826889,30.965973]};

                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        var geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };

                var u = {
                    backgroundColor: '#fff',
                    title: {
                        // text: '全国主要城市空气质量',
                        // subtext: 'data from PM25.in',
                        // sublink: 'http://www.pm25.in',
                        x:'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function (params) {
                            return params.name + ' : ' + params.value[2];
                        }
                    },

                    geo: {
                        map: 'china',
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#409eff',
                                borderColor: '#fff'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        },
                        left: '0%',
                        zoom : 1
                    },
                    series: [
                        {
                            name: 'pm2.5',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: convertData([{name: "铜陵玉成软件", value:"铜陵中科大创业园A207"}]),
                            symbolSize: 12,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    borderColor: '#fff',
                                    borderWidth: 1
                                }
                            }
                        }
                    ]
                };

                t.setOption(u);
                var myChart = this.$echarts.getInstanceByDom(document.getElementById("map-point"));
                window.onresize = function () {
                    myChart.resize();
                }
            }
        }
    }
</script>

<style scoped>

    .panel-content{
        background-color: #fff;
        padding:30px 0;
        box-shadow: 0 6px 18px 0 rgba(82,94,102,.15);
        border-radius: 5px;
        margin-top: -20px;
        margin-bottom: 20px;
    }

    .area{
        position: relative;
        overflow: hidden;
    }

    .ribbon {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 45px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        z-index: 3;
    }

    .ribbon-logo{
        width: 100%;
        height: auto;
        max-width: 160px;
    }

    .ribbon-title {
        font-size: 26px;
        font-weight: 500;
        margin: 10px 0 5px;
        color: #2188b6;
    }

    .ribboon-doc,.ribbon-tel {
        font-size: 18px;
        color: rgba(0,0,0,0.7);
    }


    #map-point{
        height: 500px;
        width: 100%;
        margin: 0 auto;
    }

    @media (max-width:767px) {
        .panel-content{
            padding:60px 0;
            margin-bottom: 90px;
        }

        #map-point{
            height: 200px;
            width: 750px;
            margin: 0 auto;
        }

        .ribbon{
            right: 10px;
        }

        .ribbon-logo{
            width: 100%;
            height: auto;
            max-width: 80px;
        }

        .ribbon-title {
            font-size: 20px;
            font-weight: 500;
            margin: 10px 0 5px;
            color: #2188b6;
        }

        .ribboon-doc,.ribbon-tel {
            font-size: 11px;
            color: rgba(0,0,0,0.7);
        }
    }

    @media (min-width: 768px) {
        #map-point{
            height: 200px;
            width: 100%;
            margin: 0 auto;
        }
    }
    @media (min-width: 992px) {
        #map-point{
            height: 300px;
            width: 100%;
            margin: 0 auto;
        }
    }
    @media (min-width: 1200px) {
        #map-point{
            height: 500px;
            width: 100%;
            margin: 0 auto;
        }
    }


</style>