/**
 * Created by t on 2019/3/11.
 */
// 自动填充点阵元素
var matrix = document.querySelector('#matrix');
for(var i=1;i<=5;i++){
    for(var j=1;j<=5;j++){
        if(i==1&&j==2){
            var vac =document.createElement('div')
            vac.classList.add('vac')

            matrix.appendChild(vac)
            continue
        }

        var point =  document.createElement('div')
        point.innerHTML =
            '<span class="left"></span> <span  class="top"></span>'+
            ' <span  class="right"></span> <span  class="bottom"></span>'

        point.classList.add('unlinked')
        point.classList.add('point')
        point.dataset.x = i
        point.dataset.y = j
        matrix.appendChild(point)
    }
}
// 路径上的点集
var linkedList=[]

// 圆点点击事件函数
function judge( ){
    if(this.classList.contains('linked')){
        return
    }
    var x = parseInt(this.dataset.x)
    var y = parseInt(this.dataset.y)
    if(0 == linkedList.length){
        linkedList.push([x,y])
      
        refresh()
        return
    }
    var lastLinked = linkedList[linkedList.length-1]
    var diffX = lastLinked[0]-x
    var diffY = lastLinked[1]-y

    if(Math.abs(diffX)+Math.abs(diffY) == 1){
        linkedList.push([x,y])
        refresh()
    }


}
// 渲染路径
function refresh() {
    points.forEach(function(item){
        item.className='unlinked point'
    })

    for(var i=0; i<linkedList.length;i++){
        var x = linkedList[i][0]
        var y = linkedList[i][1]
        // 这行代码IE不能使用
        // var point =points.find(
        //     function(item){if (item.dataset.x==x && item.dataset.y == y){return true} }
        // )
        var point =document.querySelector('[data-x=\"'+x+'\"][data-y=\"'+y+'\"]')

        point.classList.remove('unlinked')
        point.classList.add('linked')
        if(linkedList.length-1 == i){return}
        var nextX = linkedList[i+1][0]
        var nextY = linkedList[i+1][1]
        // 这行代码IE不能使用
        // var nextPoint=points.find(
        //     function(item){if (item.dataset.x==nextX && item.dataset.y == nextY){return true} }
        // )
        var nextPoint =document.querySelector('[data-x=\"'+nextX+'\"][data-y=\"'+nextY+'\"]')


        var diffX = linkedList[i+1][0] -x;
        var diffY = linkedList[i+1][1] -y;
        if(diffY == 1){
            point.classList.add('right')
            nextPoint.classList.add('left')
        }
        else if(diffY == -1){
            point.classList.add('left')
            nextPoint.classList.add('right')
        }
        else if(diffX == 1 ){
            point.classList.add('bottom')
            nextPoint.classList.add('top')
        }
        else if(diffX == -1){
            point.classList.add('top')
            nextPoint.classList.add('bottom')
        }
    }

}


// 上一步函数
function prev() {
    linkedList.pop()
    refresh()
}

// 清空重置函数
function reset(){
    linkedList=[]
    refresh()
}


// 注册点击事件
var points = document.querySelectorAll('.point')
// points参数会常用
points = [].slice.call(points)
points.forEach(function (item) {item.onclick=judge})

// 给按钮注册事件
document.querySelector('button.prev').addEventListener('click',prev,false)
document.querySelector('button.reset').addEventListener('click',reset,false)