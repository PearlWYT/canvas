function Game(){
	this.f = 0
	this.init()
	this.pipeArr = [];
	
}
Game.prototype.init = function(){
	this.canvas = document.getElementById('canvas')
	this.ctx = this.canvas.getContext('2d')
	this.res = {
		'bg_day' : './images/bg_day.png',
		'land' : './images/land.png',
		'pipe_down' : './images/pipe_down.png',
		'pipe_up' : './images/pipe_up.png',
		'bird0_0' : './images/bird0_0.png',
		'bird0_1' : './images/bird0_1.png',
		'bird0_2' : './images/bird0_2.png',
		'title' : './images/title.png',
		'button_play' : './images/button_play.png',
		'text_ready' : './images/text_ready.png',
		'tutorial' : './images/tutorial.png',
		'b0' : './images/b0.png',
		'b1' : './images/b1.png',
		'b2' : './images/b2.png',
		'b3' : './images/b3.png',
		'b4' : './images/b4.png',
		'b5' : './images/b5.png',
		'b6' : './images/b6.png',
		'b7' : './images/b7.png',
		'b8' : './images/b8.png',
		'b9' : './images/b9.png',
		'b10' : './images/b10.png',
		'b11' : './images/b11.png',
	}
	var length = Object.keys(this.res).length;
	var count = 0;
	var self = this;
	for(var k in this.res){
		var image = new Image();
		image.src = this.res[k]
		this.res[k] = image;
		image.onload = function(){
			count++
			self.clear()
			self.ctx.save();
			self.ctx.textAlign = 'center'
			self.ctx.font = '16px 微软雅黑'
			self.ctx.fillText(`加载中${count} / ${length}`,self.canvas.width / 2 , 100);
			self.ctx.restore();
			if(count == length){
				self.start()
			}
		}
	}
};
Game.prototype.clear = function(){
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
}
Game.prototype.start = function(){
	var self = this;
	/*this.background = new Background()
	this.land = new Land()
	this.bird = new Bird()*/
	this.scene = new Scene()
	this.timer = setInterval(function(){
		self.f++
		self.clear()
		/*self.background.render()
		self.background.update()
		self.land.render()
		self.land.update()
		self.f % 100 == 0 && new Pipe()
		for (var i = 0; i < self.pipeArr.length; i++) {
			self.pipeArr[i].render()
			self.pipeArr[i].update()
		}
		self.bird.render()
		self.bird.update()*/
		self.scene.render()
		self.ctx.font = '12px 微软雅黑'
		self.ctx.fillText(`帧编号：${self.f}`,10,20)
		self.ctx.fillText(`场景：${self.scene.sceneNumber}`,10,40)
		self.ctx.fillText(`分数：${self.scene.score}`,10,60)
	}, 20)
}