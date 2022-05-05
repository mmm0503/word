<template>
    <div>
        <button @click="MakeWord">word</button>

        <div id="wordWarp">

            <h1>123</h1>
            <div id="echartWarp" class="warp"></div>
        </div>
    </div>
</template>

<script>
import * as $ from 'jquery'
import * as echarts from 'echarts'
export default {
    data() {
        return {
            each1: null
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let each1 = echarts.init(document.getElementById('echartWarp'))
            this.each1 = each1
            each1.setOption({
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [150, 230, 224, 218, 135, 147, 260],
                        type: 'line'
                    }
                ]
            })
            this.base64 = each1.getDataURL({
                pixelRatio: 1,
                backgroundColor: '#fff'
            })

        },
        MakeWord() {
            //img类推
            var imgs = [], canvasArr = [this.each1];
            // need dataurl
            for (var i = 0; i < canvasArr.length; i++) {
                var canvasIndex = canvasArr[i].getRenderedCanvas({
                    pixelRatio: 1,
                    backgroundColor: '#FFFFFF'
                });
                imgs.push(canvasIndex.toDataURL('image/jpeg'));
            }

            //虚拟创建各种需要的DOM内容，不加入文档流，但使用, style需要在节点中添加
            var $div = $('<div id="myDoc"></div>');
            // var $homeTitle = $('<p class="homeTitle" style="font-size: 30px; font-weight: 600; text-align: center; margin: 140px 300px 270px 300px;">' + '首页头部' + '</p>');
            // var $firstPointFirImg = $('<div style="text-align: center;">' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;" />' + '\n' + '<img class="pointImg" style="width: 350px; margin-top: 20px; margin-bottom: 10px;"/>' + '<p style="font-size: 20px; font-weight: 600;">图 1 危害等级分布柱状图、饼图</p>' + '</div>');
            var $homeTitle = $(`<p>titleTIo</p>`)
            var $img1 = $(`<img style="width:200px;height:200px" />`)
            $div.append($homeTitle, $img1);

            //主体函数，即将内容加入到word中
            $.fn.wordExport = function (fileName) {
                fileName = typeof fileName !== 'undefined' ? fileName : "导出";
                var static2 = {
                    mhtml: {
                        top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                        head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n+ '_styles_' + \n</style>\n</head>\n",
                        body: "<body>_body_</body>"
                    }
                };
                var options = {
                    maxWidth: 624
                };
                // Clone selected element before manipulating it
                var markup = $(this).clone();

                // Remove hidden elements from the output
                markup.each(function () {
                    var self = $(this);
                    if (self.is(':hidden'))
                        self.remove();
                });

                // Embed all images using Data URLs
                // img如果再文档流中，上面可以不用处理，使用这儿的内容先去创建canvas 然后toDataURL获取uri再进行使用，这里注释是因为上面我们已经将内容转为uri，故不需要做无用功
                var images = Array();
                var img = markup.find('img');

                for (var i = 0; i < imgs.length; i++) {
                    // Calculate dimensions of output image
                    //				var w = Math.min(img[i].width, options.maxWidth);
                    //				var h = img[i].height * (w / img[i].width);
                    // Create canvas for converting image to data URL
                    //				var canvas = document.createElement("CANVAS");
                    //				canvas.width = w;
                    //				canvas.height = h;
                    // Draw image to canvas
                    //				var context = canvas.getContext('2d');
                    //				context.drawImage(img[i], 0, 0, w, h);
                    // Get data URL encoding of image
                    var uri = imgs[i];
                    $(img[i]).attr("src", imgs[i]);
                    //				img[i].width = w;
                    //				img[i].height = h;
                    // Save encoded image to array
                    images[i] = {
                        type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                        encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                        location: $(img[i]).attr("src"),
                        data: uri.substring(uri.indexOf(",") + 1)
                    };
                }
                // Prepare bottom of mhtml file with image data
                var mhtmlBottom = "\n";
                for (var i = 0; i < images.length; i++) {
                    mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                    mhtmlBottom += "Content-Location: " + images[i].location + "\n";
                    mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                    mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                    mhtmlBottom += images[i].data + "\n\n";
                }
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

                //			 TODO: load css from included stylesheet
                //			 styles如果再文档流中可用，否则通过这种方式，无法查找到元素，无法添加样式，故上面将样式内联在dom结构中
                var styles = 'table {border-collapse:collapse; border: 1px solid #000;} td { border: 1px solid #000;} h1 { font-size: 30px; color: red; }'
                // Aggregate parts of the file together
                var fileContent = static2.mhtml.top.replace("_html_", static2.mhtml.head.replace("_styles_", styles) + static2.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

                // Create a Blob with the file contents
                var blob = new Blob([fileContent], {
                    type: "application/msword;charset=utf-8"
                });
                window.saveAs(blob, fileName + ".doc");
            }

            $div.wordExport('docName');
        }
    }
}
</script>

<style lang="less">
.warp {
    width: 200px;
    height: 200px;
}
</style>
