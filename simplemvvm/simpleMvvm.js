function Simplemvvm(options){
	this.options = options;
	var data = this._data = this.options.data;
	observer(data);
	this.$compile = new Compile(options.el,this);
}