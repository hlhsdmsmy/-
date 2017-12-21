class Palette{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.cw = this.canvas.width;
        this.ch = this.canvas.height;
        this.history = [];
        this.style = 'fill';
    }
    line(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let cx = e.offsetX, cy = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                that.ctx.beginPath();
                that.ctx.moveTo(ox,oy);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.lineTo(cx,cy);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.z();
    }
    circle(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                that.ctx.clearRect(0,0,that.cw,that.ch)
                let mx = e.offsetX, my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                that.ctx.beginPath();
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.arc(ox,oy,r,0,Math.PI*2);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.z();
    }
    pencil(){
        let that = this;
        that.canvas.onmousedown = function(){
            that.ctx.beginPath()
            that.canvas.onmousemove = function (e) {
                let cx = e.offsetX;
                let cy = e.offsetY;
                that.ctx.lineTo(cx,cy);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function () {
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.z();
    }
    rect(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                hua(r,ox,oy);
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
            }
        }
        function hua(r,ox,oy,num=4){
            that.ctx.clearRect(0,0,that.cw,that.ch)
            let a = 2 * Math.PI / num;
            that.ctx.beginPath();
            that.ctx.moveTo(ox+r,oy);
            for(let i = 0;i < num;i++){
                let x = ox + r * Math.cos(a * i);
                let y = oy + r * Math.sin(a * i);
                that.ctx.lineTo(x,y);
            }
            that.ctx.closePath();
            that.ctx.stroke();
        }
        that.z();
    }
    poly(ang){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let r = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                hua(r,ox,oy);
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
            }
        }
        function hua(r,ox,oy,num=ang){
            that.ctx.clearRect(0,0,that.cw,that.ch)
            let a = 2 * Math.PI / num;
            that.ctx.beginPath();
            that.ctx.moveTo(ox+r,oy);
            for(let i = 0;i < num;i++){
                let x = ox + r * Math.cos(a * i);
                let y = oy + r * Math.sin(a * i);
                that.ctx.lineTo(x,y);
            }
            that.ctx.closePath();
            that.ctx.stroke();
        }
        that.z();
    }
    polyj(ang){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let R = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                let r = (Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2)))/3;
                jiao(R,r,ox,oy);
            }
            that.canvas.onmouseup = function(){
                that.canvas.onmousemove = null;
            }
        }
        function jiao(r,R,ox,oy,num=ang){
            that.ctx.clearRect(0,0,that.cw,that.ch)
            let a = Math.PI / num;
            that.ctx.beginPath();
            that.ctx.moveTo(ox+R,oy);
            let x,y;
            for(let i = 0;i < num*2;i++){
                if(i%2==0){
                    x = ox + R * Math.cos(a * i);
                    y = oy + R * Math.sin(a * i);
                }else{
                    x = ox + r * Math.cos(a * i);
                    y = oy + r * Math.sin(a * i);
                }
                that.ctx.lineTo(x,y);
            }
            that.ctx.closePath();
            that.ctx.stroke();
        }
        that.z();
    }
    z(){
        let that = this;
        window.onkeydown = function(e){
            if(e.ctrlKey && e.key == 'z'){
                let data = that.history.pop();
                that.ctx.putImageData(data,0,0);
            }
        }
    }
    dash(){
        let that = this;
        that.canvas.onmousedown = function(e){
            let ox = e.offsetX, oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let cx = e.offsetX, cy = e.offsetY;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.setLineDash([5,15]);
                that.ctx.beginPath();
                that.ctx.moveTo(ox,oy);

                that.ctx.lineTo(cx,cy);
                that.ctx.stroke();
            }
            that.canvas.onmouseup = function(){
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        that.z();
    }
}