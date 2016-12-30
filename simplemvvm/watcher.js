function Watcher(vm,exp,callback) {
    	this.callback = callback;
    	this.vm = vm;
    	this.exp = exp;
    	this.value = this.get();
}
Watcher.prototype = {

    get: function() {
           Dep.target = this;
           var val = this.getVMVal();
           Dep.target = null;
           return val;
    },
    getVMVal:function(){
    	 var val = this.vm._data;
    	 val = val[this.exp];
    	 return val;
    },
    update:function(){
    	this.run();
    },
    run:function(){
    	var value = this.get();
    	var oldVal = this.value;
    	if(value !== oldVal){
    		this.value = value;
    		this.callback(value);//回调渲染
    	}
    }

}
