//队列操作实例
function Operator() {
	this.queue = new Array();
	this.ipt = document.getElementById('input');
	this.box = document.getElementById('queue-box');
	//将队列呈现在页面中
	this.show = function(queue) {
		var max = queue.length;
		var inner = '';
		for (var i = 0; i < max; i++) {
			var str = '<div data=' + queue[i] + '></div>';
			inner = inner + str;
		}
		this.box.innerHTML = inner;
		this.ipt.value = '';
		this.changeToH(this.box);
		//每次呈现后都重新绑定页面中各数据块
		this.addDeletEvent(this);
	}
	//将数据转换为实际高度,参数为DOM中，数据块的容器的方法
	this.changeToH = function(box) {
		var items = box.children;
		var length = items.length;
		for (var i = 0; i < length; i++) {
			var height = items[i].getAttribute('data');
			items[i].setAttribute('style', 'height: ' + height + 'px;');
		}
	}
	this.lIn = function() {
		if (this.queue.length >= 60) {
			alert('最多输入60个数据');
			return;
		}
		if (this.ipt.value && /^[0-9]*$/.test(this.ipt.value)) {
			if (this.ipt.value <= 100 && this.ipt.value >= 10) {
				this.queue.unshift(this.ipt.value);
				this.show(this.queue);
			} else {
				alert('请输入10-100的整数');
			}
		} else {
			alert('请输入数字');
		}
	}
	this.rIn = function() {
		if (this.queue.length >= 60) {
			alert('最多输入60个数据');
			return;
		}
		if (this.ipt.value && /^[0-9]*$/.test(this.ipt.value)) {
			if (this.ipt.value <= 100 && this.ipt.value >= 10) {
				this.queue.push(this.ipt.value);
				this.show(this.queue);
			} else {
				alert('请输入10-100的整数');
			}
		} else {
			alert('请输入数字');
		}
	}
	this.lOut = function() {
		alert('删除:' + this.queue.shift(this.ipt.value));
		this.show(this.queue);
	}
	this.rOut = function() {
		alert('删除:' + this.queue.pop(this.ipt.value));
		this.show(this.queue);
	}
	this.delet = function(i) {
		this.queue.splice(i,1);
		this.show(this.queue);
	}
	//绑定页面中各数据块的方法
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
	this.sort = function() {
		var state = this.bubbleSort(this.queue);
		var that = this;
		var timer = setInterval(function() {
			var one = state.shift();
			if (one !== undefined) {
				that.show(one);
				that.queue = one;
			} else {
				clearInterval(timer);
			}
		},200);
	}
	this.bubbleSort = function(queue) {
		var length = queue.length;
		var state = new Array();
		for (var i = length-1; i > 0; i--) {
			for (var j = 0; j < i; j++) {
				if (queue[j] > queue[j + 1]) {
					var temp = queue[j];
					queue[j] = queue[j + 1];
					queue[j + 1] = temp;
					//每次调换位置都保存状态
					state.push(JSON.parse(JSON.stringify(queue)));
				}
			}
		}
		return state;
	}
};

window.onload = function() {
	var lInBtn = document.getElementById('lIn');
	var rInBtn = document.getElementById('rIn');
	var lOutBtn = document.getElementById('lOut');
	var rOutBtn = document.getElementById('rOut');
	var sortBtn = document.getElementById('sort');
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
 	sortBtn.addEventListener('click', function() {
 		operator.sort();
 	})
}