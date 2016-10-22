//队列操作实例
function Operator() {
	this.queue = new Array();
	this.ipt = document.getElementById('input');
	this.box = document.getElementById('queue-box');
	//将队列呈现在页面中
	this.show = function() {
		var max = this.queue.length;
		var inner = '';
		for (var i = 0; i < max; i++) {
			var str = '<div>' + this.queue[i] + '</div>';
			inner = inner + str;
		}
		this.box.innerHTML = inner;
		this.ipt.value = '';
		//每次呈现后都重新绑定页面中各数据块
		this.addDeletEvent(this);
	}
	this.lIn = function() {
		if (this.ipt.value && /^[0-9]*$/.test(this.ipt.value)) {
			this.queue.unshift(this.ipt.value);
			this.show();
		} else {
			alert('请输入数字');
		}
	}
	this.rIn = function() {
		if (this.ipt.value && /^[0-9]*$/.test(this.ipt.value)) {
			this.queue.push(this.ipt.value);
			this.show();
		} else {
			alert('请输入数字');
		}
	}
	this.lOut = function() {
		alert('删除:' + this.queue.shift(this.ipt.value));
		this.show();
	}
	this.rOut = function() {
		alert('删除:' + this.queue.pop(this.ipt.value));
		this.show();
	}
	this.delet = function(i) {
		this.queue.splice(i,1);
		this.show();
	}
	//绑定页面中各数据块
	this.addDeletEvent = function(obj) {
		var box = document.getElementById('queue-box');
		var items = box.children;
		var length = items.length;
		for (var i = 0; i < length; i++) {
			//用闭包保存i状态
			items[i].addEventListener('click', (function(index) {
				return function() {
					obj.delet(index);
				}
			})(i));
		}
	}
};

window.onload = function() {
	var lInBtn = document.getElementById('lIn');
	var rInBtn = document.getElementById('rIn');
	var lOutBtn = document.getElementById('lOut');
	var rOutBtn = document.getElementById('rOut');
	//初始化一个队列操作实例
	var operator = new Operator();
	//为四个按钮绑定事件
 	lInBtn.addEventListener('click', function() {
 		operator.lIn();
 	});
 	rInBtn.addEventListener('click', function() {
 		operator.rIn();
 	});
 	lOutBtn.addEventListener('click', function() {
 		operator.lOut();
 	});
 	rOutBtn.addEventListener('click', function() {
 		operator.rOut();
 	});
}