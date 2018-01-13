/**
 * Created by Administrator on 2018/1/13 0013.
 */
(function (window,document) {
    function Slide() {
        this.initialize.apply(this,arguments);
    }
    Slide.prototype =  {
        constructor:Slide,

        initialize:function (option) {
            var selector = option.wrap;
            this.wrap = document.getElementsByClassName(selector)[0];
            this.ul = this.wrap.getElementsByTagName('ul')[0];
            this.lis = this.ul.getElementsByTagName('li');
            this.spa = -2;//方向
            this.ul.innerHTML = this.ul.innerHTML + this.ul.innerHTML;
            this.setStyle(this.ul,'width',this.lis[0].offsetWidth * this.lis.length);
            this.slide();
        },
        /*滑动*/
        slide:function () {
            var _this = this;
            this.timer = setInterval(function () {
                _this.move(_this)
            },30);
            this.mouseover(this.wrap,function () {
                clearInterval(_this.timer);
            });
            this.mouseout(this.wrap,function () {
                _this.timer = setInterval(function () {
                    _this.move(_this)
                },30);
            });
        },
        move:function (_this) {
            if(_this.ul.offsetLeft < - _this.ul.offsetWidth/2){
                _this.setStyle(_this.ul,'left',0);
            }
            _this.setStyle(_this.ul,'left',_this.ul.offsetLeft + _this.spa);
        },
        /*事件*/
        on:function (node, type, fn) {
            if (node.addEventListener){
                node.addEventListener(type,fn,false);
            }else {
                node.attachEvent('on' + type,fn);
            }
        },
        mouseover:function (node,fn) {
            this.on(node,'mouseover',fn)
        },
        mouseout:function (node,fn) {
            this.on(node,'mouseout',fn)
        },
        setStyle:function (node,attribute,style) {
            var float = parseFloat(style);
            if (float){
                node.style[attribute] = style + 'px';
            }else {
                node.style[attribute] = style;
            }
        }
    }
    new Slide({
        wrap:'wrap',
    });
})(window,document)