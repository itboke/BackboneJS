function observer(data){
    if(!data || typeof data !== 'object'){
        return false;
    }
    Object.keys(data).forEach(function(key){
        defineReactive(data,key,data[key]);
    })
}
function defineReactive(data,key,val){
    var dep = new Dep(); //订阅者
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: false,
        get: function(){
            if(Dep.target){
                dep.addSub(Dep.target);
            }
            return val;
        },
        set: function(newVal){
            if(val === newVal){
                return false;
            }
            val = newVal;
            dep.notify();
        }
    })
}