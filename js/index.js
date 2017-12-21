window.addEventListener('load',function(){
    let can = document.querySelector('canvas');
    let shape = document.querySelectorAll('.shape>li');
    let canvas = new Palette(can);
    shape.forEach(e=>{
        let type = e.id;
        e.onclick = function(){
            shape.forEach(obj=>{
                obj.classList.remove('hot');
            })
            e.classList.add('hot');
            if(type == 'poly' || type == 'polyj'){
                let ang = prompt('请输入边数或度数')
                canvas[type](ang);
            }else{
                canvas[type]();
            }
        }
    })
})