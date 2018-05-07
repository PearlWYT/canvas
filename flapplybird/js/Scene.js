function Scene() {
    // 初始化场景编号 和 初始化第几号场景
    this.sceneNumber = 1
    this.init(1);
    this.bindEvent();
    this.score = 0
}
Scene.prototype.init = function(number) {
    switch (number) {
        case 1:
            this.background = new Background()
            this.land = new Land();
            // 初始化 title 和按钮的位置信息
            this.titleY = -48;
            this.buttonY = game.canvas.height + 70;
            this.birdY = 170;
            this.birdDirection = 'down'
            break;
        case 2:
            this.background = new Background()
            this.land = new Land();
            this.readyY = -62;
            this.tutorialOpacity = 1
            this.tutorialOpacityDirection = 'down'
            // 鸟的翅膀拍打
            this.image = [game.res['bird0_0'], game.res['bird0_1'], game.res['bird0_2']];
            this.wind = 0;
            // 鸟的透明度
            this.birdOpacity = 0
            this.birdOpacityDirection = 'down'
            break;
        case 3:
       		var self = this;
            this.background = new Background()
            this.land = new Land()
            this.bird = new Bird()
            // 添加键盘监听
            canvas.addEventListener('keydown', doKeyDown, true);
            canvas.focus();
            function doKeyDown(ev){
            	self.bird.fly()
            }
            break;
        case 4:
            this.boom = 0
            break;
    }
};
Scene.prototype.render = function() {
    switch (this.sceneNumber) {
        case 1:
            this.background.render()
            this.background.update()
            this.land.render()
            this.land.update()
            this.titleY += 2
            game.ctx.drawImage(game.res['title'], (game.canvas.width - 178) / 2, this.titleY)
            game.ctx.drawImage(game.res['button_play'], (game.canvas.width - 116) / 2, this.buttonY)
            game.ctx.drawImage(game.res['bird0_0'], (game.canvas.width - 48) / 2, this.birdY)
            if (this.titleY > 120) {
                this.titleY = 120
            }
            this.buttonY -= 5
            if (this.buttonY < 330) {
                this.buttonY = 330
            }
            if (this.birdDirection == 'down') {
                this.birdY++
                    if (this.birdY > 260) {
                        this.birdDirection = 'up'
                    }
            } else if (this.birdDirection == 'up') {
                this.birdY--
                    if (this.birdY < 170) {
                        this.birdDirection = 'down'
                    }
            }
            break;
        case 2:
            this.background.render()
            this.background.update()
            this.land.render()
            this.land.update()
            this.readyY += 2
            if (this.readyY > 140) {
                this.readyY = 140
                // 这是 鸟的淡出效果
                if (this.birdOpacityDirection == 'down') {
                    this.birdOpacity += 0.01
                    if (this.birdOpacity > 0.98) {
                        this.birdOpacity = 1
                    }
                }
                game.f % 4 == 0 && this.wind++;
                if (this.wind > 2) {
                    this.wind = 0
                }
                game.ctx.save()
                game.ctx.globalAlpha = this.birdOpacity
                game.ctx.drawImage(this.image[this.wind], 100, 100);
                game.ctx.restore()
            }

            game.ctx.drawImage(game.res['text_ready'], (game.canvas.width - 192) / 2, this.readyY);
            if (this.tutorialOpacityDirection == 'down') {
                this.tutorialOpacity -= 0.01;
                if (this.tutorialOpacity < 0.1) {
                    this.tutorialOpacityDirection = 'up'
                }
            } else if (this.tutorialOpacityDirection == 'up') {
                this.tutorialOpacity += 0.01;
                if (this.tutorialOpacity > 0.98) {
                    this.tutorialOpacityDirection = 'down'
                }
            }
            game.ctx.save()
            game.ctx.globalAlpha = this.tutorialOpacity
            game.ctx.drawImage(game.res['tutorial'], (game.canvas.width - 114) / 2, 220);
            game.ctx.restore()

            break;
        case 3:
            this.background.render()
            this.background.update()
            this.land.render()
            this.land.update()
            game.f % 100 == 0 && new Pipe()
            for (var i = 0; i < game.pipeArr.length; i++) {
                game.pipeArr[i].render()
                game.pipeArr[i].update()
            }
            this.bird.render()
            this.bird.update()
            break;
        case 4:
            this.bird.y += 20
            this.background.render()
            this.land.render()
            this.bird.render()
            for (var i = 0; i < game.pipeArr.length; i++) {
                game.pipeArr[i].render()
            }
            this.bird.deg += 0.5
            document.getElementById('down').play()
            if (this.bird.deg > 1.57) {
                this.bird.deg = 1.57
            }
            if (this.bird.y > game.canvas.height - 112) {
                this.bird.y = game.canvas.height - 112
                game.f % 2 == 0 && this.boom++
                    if (this.boom >= 11) {
                        game.pipeArr = [];
                        // 回场景1 清0分数
                        this.sceneNumber = 1;
                        this.init(1);
                        this.score = 0;
                    }
                game.ctx.drawImage(game.res['b' + this.boom], this.bird.x - 50, this.bird.y - 110);
            }

            break;
    }
}
Scene.prototype.bindEvent = function() {
    var self = this;
    game.canvas.onmousedown = function(e) {
        switch (self.sceneNumber) {
            case 1:
                var shang, xia, zuo, you;
                shang = 330;
                xia = 390;
                zuo = (game.canvas.width - 116) / 2
                you = (game.canvas.width - 116) / 2 + 116
                if (e.offsetY > shang && e.offsetY < xia && e.offsetX > zuo && e.offsetX < you) {
                    self.sceneNumber = 2
                    self.init(2);
                }
                break;
            case 2:
                var shang, xia, zuo, you;
                shang = 220;
                xia = 300;
                zuo = (game.canvas.width - 114) / 2
                you = (game.canvas.width - 114) / 2 + 114
                if (e.offsetY > shang && e.offsetY < xia && e.offsetX > zuo && e.offsetX < you) {
                    self.sceneNumber = 3
                    self.init(3);
                }
                break;
            case 3:
                self.bird.fly()
                break;
            case 4:

                break;
        }
    }
} 