function Bird(){
	this.image = [game.res['bird0_0'],game.res['bird0_1'],game.res['bird0_2']]
	this.x = 100;
	this.y = 100;
	this.dy = 0.2
	this.deg = 0;
	this.wind = 0;
}
Bird.prototype.render = function(){
	game.ctx.save()
	game.ctx.translate(this.x ,this.y)
	game.ctx.rotate(this.deg)
	game.ctx.drawImage(this.image[this.wind],-24,-24)
	game.ctx.restore()
	// game.ctx.fillText(this.x1,this.x1 - 10,this.y+10 )
	// game.ctx.fillText(this.x2,this.x1 + 30,this.y+10 )
	// game.ctx.fillText(this.y1,this.x1,this.y-30 )
	// game.ctx.fillText(this.y2,this.x1,this.y+30 )
};
Bird.prototype.update = function(){
	this.dy += 0.88;
	this.y += this.dy;
	this.deg += 0.06;
	game.f % 2 == 0 && this.wind++
	if(this.wind > 2){
 		this.wind = 0
	}
	this.x1 = ~~(this.x - 14)
	this.x2 = ~~(this.x + 14)
	this.y1 = ~~(this.y - 12)
	this.y2 = ~~(this.y + 12)
};
Bird.prototype.fly = function(){
	this.dy = -10;
	this.deg = -1.28;
	document.getElementById('fly').play()
};