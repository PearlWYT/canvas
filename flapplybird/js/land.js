function Land() {
    this.image = game.res['land']
    this.x = 0
}
Land.prototype.render = function(argument) {
    game.ctx.drawImage(this.image, this.x, game.canvas.height - 112)
    game.ctx.drawImage(this.image, this.x + 336, game.canvas.height - 112)
    game.ctx.drawImage(this.image, this.x + 336 * 2, game.canvas.height - 112)
};
Land.prototype.update = function(argument) {
    this.x -= 2;
    if (this.x < -336) {
        this.x = 0
    }
    if (game.scene.sceneNumber == 3) {
        if (game.scene.bird.y2 > game.canvas.height - 112) {
            game.scene.sceneNumber = 4
            game.scene.init(4)
            document.getElementById('die').play()
        }
    }

};