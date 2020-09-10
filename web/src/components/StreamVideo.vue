<template>
    <div id="stream-video">

        <video id="my-video" controls width="100%" poster="/images/template/njbf/login.png" ref="video"></video>

    </div>
</template>
<script>
    export default {
        name : "StreamVideo",
        data() {

            return {
                rangeStart : 0,
                rangeEnd : 0,
            }

        },
        methods : {
            getVideo (){
                const vm = this;

                // var assetURL = 'frag_bunny.mp4';
                var video = this.$refs["video"];
                var assetURL = 'http://localhost:3000/pullVideoStream';
                var mimeCodec = 'audio/mp4; codecs="mp4a.40.5"';

                if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
                    var mediaSource = new MediaSource();
                    video.src = URL.createObjectURL(mediaSource);
                    mediaSource.addEventListener('sourceopen', sourceOpen);
                } else {
                    console.error('Unsupported MIME type or codec: ', mimeCodec);
                }

                function sourceOpen (_) {
                    var mediaSource = this;
                    var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
                    console.log("sourceOpen------------------>");
                    fetchAB(assetURL, function loop(buf) {
                        console.log("start fetching....");
                        var handle = sourceBuffer.addEventListener('updateend', function (_) {
                            // console.log("stop?....");
                            // mediaSource.endOfStream();
                            // video.play();
                            if(vm.rangeStart < vm.rangeTotal){
                                setTimeout(() =>{
                                    fetchAB(assetURL,function (buff) {
                                        sourceBuffer.appendBuffer(buff);
                                    })
                                },500);
                            }
                        });
                        sourceBuffer.appendBuffer(buf);


                    });
                }

                function fetchAB (url, cb) {
                    console.log(url);
                    var xhr = new XMLHttpRequest;
                    xhr.open('get', url,true);
                    let range = "bytes=" + vm.rangeStart + '-' + parseInt(vm.rangeStart + 1000000);
                    xhr.setRequestHeader("range",range);
                    xhr.responseType = 'arraybuffer';
                    xhr.onload = function () {
                        let contentRange = xhr.getResponseHeader("content-range");
                        var rangeData = contentRange.replace(/bytes/, "").trim().split("-")[1].split('/');
                        console.log("bytes===>",contentRange,rangeData[0]);
                        vm.rangeStart = rangeData[0] - 1;
                        vm.rangeTotal = rangeData[1];
                        cb(xhr.response);
                    };
                    xhr.send();
                }

                // https://www.cnblogs.com/1995hxt/p/5692050.html   last-modified etag
                //https://blog.csdn.net/liulangdeyue/article/details/38944679  webm
            }
        },

        mounted() {
            this.getVideo();
        }
    };
</script>
<style>

</style>
