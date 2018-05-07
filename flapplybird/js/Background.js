function Background(){
	this.image = game.res['bg_day'];
	this.x = 0
}
Background.prototype.render = function(){
	game.ctx.save()
	// 写背景渲染
	game.ctx.drawImage(this.image,this.x,game.canvas.height - 512,288,512)
	game.ctx.drawImage(this.image,this.x+288,game.canvas.height - 512,288,512)
	game.ctx.drawImage(this.image,this.x+288*2,game.canvas.height - 512,288,512);
	// 画一个矩形遮挡天空的白色
	game.ctx.fillStyle = '#4ec0ca'
	game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height - 512);
	game.ctx.restore()
};
Background.prototype.update = function(){
	// 写背景更新
	this.x--
	if(this.x < -288){
		this.x = 0
	}
};