function Compile(el,vm){
	this.$vm = vm;
	this.$el = document.querySelector(el);
	if(this.$el){
		this.$fragment = this.node2Fragment(this.$el);
		this.compileElement(this.$fragment);
		this.$el.appendChild(this.$fragment);
	}
}
Compile.prototype = {

	node2Fragment: function(el){
	        var fragment = document.createDocumentFragment(), child;
	        // 将原生节点拷贝到fragment
	        while (child = el.firstChild) {
	            fragment.appendChild(child);
	        }
	        return fragment;
	},
	compileElement: function(el){
	        var childNodes  = el.childNodes;
	        var _this = this;
	        [].slice.call(childNodes).forEach(function(node){
	        	     var text = node.textContent;
	        	     var reg  = /\{\{(.*)\}\}/i;
	        	     if(node.nodeType == 1){
	        	     	_this.compile(node);
	        	     }else if(node.nodeType == 3 && reg.test(text)){
	        	     	_this.compileText(node,RegExp.$1);
	        	     }
	        })
	},
	compile: function(node){
	        var nodeAttrs  =  node.attributes;
	        var _this = this;
	        [].slice.call(nodeAttrs).forEach(function(attr){
	        	     var attrName = attr.name;
	        	     if(attrName.indexOf('v-') === 0){
	        	     	 var exp = attr.value;
	        	     	 var dir = attrName.substring(2);
	        	     	 if(dir.indexOf('on') === 0){
	        	     	 	compileUtil.eventHandler(node, _this.$vm, exp, dir);
	        	     	 }
	        	     }
	        	     node.removeAttribute(attrName);
	        })
	},
	compileText: function(node,exp){
	         compileUtil.text(node, this.$vm, exp);
	}

}
compileUtil = {
	eventHandler:function(node, vm, exp, dir){
		var eventType = dir.split(':')[1];
		var fn = vm.options.methods && vm.options.methods[exp];
		if(eventType && fn){
			node.addEventListener(eventType,fn.bind(vm),false);
		}
	},
	text: function(node, vm, exp){
		this.bind(node, vm, exp, 'text');
	},
	bind: function(node, vm, exp, dir){
		node.textContent = this._getVMVal(vm,exp);
		new Watcher(vm,exp,function(value){
			node.textContent = value;
		});
	},
	_getVMVal: function(vm,exp){
		var val = vm._data;
		val = val[exp];
		return val;
	}
}