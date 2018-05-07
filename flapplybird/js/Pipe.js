function Pipe(){
	this.x = game.canvas.width;
	this.pipe_down = game.res['pipe_down']
	this.pipe_up = game.res['pipe_up']
	// 使用underscore 随机一个50-300的整数
	this.Pipe_downHeight = _.random(60,280)
	this.kongge = 120
	this.Pipe_upHeight = game.canvas.height - 112 - this.Pipe_downHeight - this.kongge
	game.pipeArr.push(this)
}
Pipe.prototype.render = function(){
	game.ctx.drawImage(
		this.pipe_down,
		0,
		400 - this.Pipe_downHeight,
		52,
		this.Pipe_downHeight,
		this.x,
		0,
		52,
		this.Pipe_downHeight
	)
	game.ctx.drawImage(
		this.pipe_up,
		0,
		0,
		52,
		this.Pipe_upHeight,
		this.x,
		this.Pipe_downHeight + this.kongge,
		52,
		this.Pipe_upHeight,
	)
	// game.ctx.fillText(this.x1,this.x - 20 , this.Pipe_downHeight + this.Pipe_downHeight /2)
	// game.ctx.fillText(this.x2,this.x + 72 , this.Pipe_downHeight + this.Pipe_downHeight /2)
	// game.ctx.fillText(this.y1,this.x + 26 , this.Pipe_downHeight)
	// game.ctx.fillText(this.y2,this.x + 26 , this.Pipe_downHeight + this.kongge)
};
Pipe.prototype.update = function(){
	this.x -= 2
	if(this.x < - 300){
		this.remove()
	}
	this.x1 = ~~(this.x)
	this.x2 = ~~(this.x + 52)
	this.y1 = ~~(this.Pipe_downHeight)
	this.y2 = ~~(this.Pipe_downHeight + this.kongge)
	if(game.scene.bird.x2 > this.x1 && (game.scene.bird.y2 > this.y2 || game.scene.bird.y1 < this.y1) && game.scene.bird.x1 < this.x2){
		game.scene.sceneNumber = 4
		game.scene.init(4)
		document.getElementById('die').play()
	}else if(!this.isScore && game.scene.bird.x1 > this.x2){
		this.isScore = true
		game.scene.score++
		document.getElementById('score').play()
	}

};
Pipe.prototype.remove = function(){
	// game.pipeArr = _.without(game.pipeArr,this)
	// 删除管子的 ES6 方式
	game.pipeArr = game.pipeArr.filter(item => item !== this)
};