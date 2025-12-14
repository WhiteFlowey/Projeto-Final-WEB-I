// ==========================================
// 1. CONTROLE DA PÁGINA (NAVEGAÇÃO)
// ==========================================
// ==========================================
// 1. CONTROLE DA PÁGINA (NAVEGAÇÃO) - CORRIGIDO
// ==========================================
// ==========================================
// 1. CONTROLE DA PÁGINA (NAVEGAÇÃO)
// ==========================================
const app = {
    goToGame: function(gameId) {
        // 1. Esconde APENAS a área de espera (o quadrado com a interrogação)
        // Isso garante que o MENU, CONTATO e CURIOSIDADES continuem na tela
        const placeSec = document.getElementById('placeholder-area');
        if(placeSec) placeSec.classList.add('d-none');

        // 2. Esconde os jogos que NÃO são o atual
        // (Para não ficar dois jogos abertos ao mesmo tempo)
        const allGames = ['snake', 'asteroids', 'tetris'];
        allGames.forEach(id => {
            if (id !== gameId) {
                const el = document.getElementById(id);
                if(el) el.classList.add('d-none');
            }
        });

        // 3. Limpa os timers de TODOS os jogos (segurança)
        if(typeof snakeGame !== 'undefined') clearInterval(snakeGame.intervalId);
        if(typeof asteroidsGame !== 'undefined') clearInterval(asteroidsGame.intervalId);
        if(typeof tetrisGame !== 'undefined' && tetrisGame.animationId) cancelAnimationFrame(tetrisGame.animationId);

        // 4. Mostra o jogo escolhido
        const gameSection = document.getElementById(gameId);
        if (gameSection) {
            gameSection.classList.remove('d-none');
            
            // Faz a tela rolar suavemente até o jogo
            gameSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Inicia o jogo
            if (gameId === 'snake') snakeGame.init();
            else if (gameId === 'asteroids') asteroidsGame.init();
            else if (gameId === 'tetris') tetrisGame.init();
        }
    },

    scrollToTop: function() {
        // Para os jogos ativos
        if(typeof snakeGame !== 'undefined') clearInterval(snakeGame.intervalId);
        if(typeof asteroidsGame !== 'undefined') clearInterval(asteroidsGame.intervalId);
        if(typeof tetrisGame !== 'undefined' && tetrisGame.animationId) cancelAnimationFrame(tetrisGame.animationId);
        
        // 1. Traz de volta a Área de Espera
        const placeSec = document.getElementById('placeholder-area');
        if(placeSec) placeSec.classList.remove('d-none');
        
        // 2. Esconde apenas as TELAS DOS JOGOS
        ['snake', 'asteroids', 'tetris'].forEach(id => {
            const el = document.getElementById(id);
            if(el) el.classList.add('d-none');
        });

        // Rola para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// ==========================================
// 2. SNAKE
// ==========================================
const snakeGame = {
    canvas: null, ctx: null, 
    scoreElement: null, gameOverScreen: null, finalScoreElement: null,
    gridSize: 20, tileCount: 20, gameSpeed: 100,
    px: 10, py: 10, ax: 15, ay: 15, xv: 0, yv: 0, 
    trail: [], tail: 5, score: 0, intervalId: null, isGameOver: false,

    init: function() {
        this.canvas = document.getElementById('gameCanvas');
        this.scoreElement = document.getElementById('score');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.finalScoreElement = document.getElementById('finalScore');
        this.ctx = this.canvas.getContext('2d');
        if(this.gameOverScreen) this.gameOverScreen.classList.add('d-none');
        
        this.px = 10; this.py = 10; this.tail = 5; this.trail = []; this.score = 0;
        this.xv = 0; this.yv = 0; this.isGameOver = false;
        this.ax = Math.floor(Math.random() * this.tileCount);
        this.ay = Math.floor(Math.random() * this.tileCount);
        this.scoreElement.innerText = "0";

        if(this.intervalId) clearInterval(this.intervalId);
        this.setupControls();
        this.intervalId = setInterval(() => this.update(), this.gameSpeed);
    },

    update: function() {
        if (this.isGameOver) return;
        this.px += this.xv; this.py += this.yv;
        if(this.px < 0) this.px = this.tileCount - 1;
        if(this.px > this.tileCount - 1) this.px = 0;
        if(this.py < 0) this.py = this.tileCount - 1;
        if(this.py > this.tileCount - 1) this.py = 0;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = "#0f0";
        for(let i = 0; i < this.trail.length; i++) {
            this.ctx.fillRect(this.trail[i].x * this.gridSize, this.trail[i].y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            if(this.trail[i].x === this.px && this.trail[i].y === this.py && (this.xv !== 0 || this.yv !== 0)) {
                this.gameOver(); return;
            }
        }
        this.trail.push({x: this.px, y: this.py});
        while(this.trail.length > this.tail) this.trail.shift();

        if(this.ax === this.px && this.ay === this.py) {
            this.tail++; this.score += 10;
            this.scoreElement.innerText = this.score;
            this.ax = Math.floor(Math.random() * this.tileCount);
            this.ay = Math.floor(Math.random() * this.tileCount);
        }
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.ax * this.gridSize, this.ay * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    },

    gameOver: function() {
        this.isGameOver = true;
        clearInterval(this.intervalId);
        if(this.finalScoreElement) this.finalScoreElement.innerText = this.score;
        if(this.gameOverScreen) this.gameOverScreen.classList.remove('d-none');
    },

    setupControls: function() {
        document.onkeydown = null; document.onkeyup = null;
        document.addEventListener('keydown', (e) => this.handleInput(e.key));
        const ids = ['btn-up','btn-down','btn-left','btn-right'];
        const keys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
        ids.forEach((id, i) => {
            const el = document.getElementById(id);
            if(el) el.onclick = () => this.handleInput(keys[i]);
        });
    },

    handleInput: function(key) {
        if (this.isGameOver) return;
        const k = key.toLowerCase();
        if(k==='a' || k==='arrowleft') if(this.xv !== 1) { this.xv = -1; this.yv = 0; }
        if(k==='w' || k==='arrowup') if(this.yv !== 1) { this.xv = 0; this.yv = -1; }
        if(k==='d' || k==='arrowright') if(this.xv !== -1) { this.xv = 1; this.yv = 0; }
        if(k==='s' || k==='arrowdown') if(this.yv !== -1) { this.xv = 0; this.yv = 1; }
    }
};

// ==========================================
// 3. ASTEROIDS
// ==========================================

const asteroidsGame = {
    canvas: null, ctx: null, 
    scoreElement: null, gameOverScreen: null, finalScoreElement: null,
    
    // Configuração da Nave e do Jogo
    ship: { x: 200, y: 200, r: 10, a: -Math.PI/2, rot: 0, thrust: false, xv: 0, yv: 0 },
    asteroids: [], bullets: [], score: 0, isGameOver: false, intervalId: null,
    
    // NOVA VARIÁVEL: Controla o tempo de nascimento dos asteroides
    spawnTimer: 0, 

    init: function() {
        this.canvas = document.getElementById('astCanvas');
        this.scoreElement = document.getElementById('astScore');
        this.gameOverScreen = document.getElementById('astGameOverScreen');
        this.finalScoreElement = document.getElementById('astFinalScore');
        this.ctx = this.canvas.getContext('2d');
        if(this.gameOverScreen) this.gameOverScreen.classList.add('d-none');

        // Centraliza a nave e define raio 10 (pequeno)
        this.ship = { x: this.canvas.width / 2, y: this.canvas.height / 2, r: 10, a: -Math.PI/2, rot: 0, thrust: false, xv: 0, yv: 0 };
        
        // COMEÇA VAZIO (Sem asteroides iniciais)
        this.asteroids = []; 
        this.bullets = []; 
        this.score = 0;
        this.scoreElement.innerText = "0"; 
        this.isGameOver = false;
        
        // Zera o cronômetro de spawn
        this.spawnTimer = 0;

        if(this.intervalId) clearInterval(this.intervalId);
        this.setupControls();
        this.intervalId = setInterval(() => this.update(), 1000 / 30);
    },

    createAsteroids: function(num) {
        for(let i=0; i<num; i++) {
            // Cria asteroide nas bordas para não nascer em cima do jogador
            let x, y;
            if (Math.random() < 0.5) {
                x = Math.random() < 0.5 ? 0 : this.canvas.width;
                y = Math.random() * this.canvas.height;
            } else {
                x = Math.random() * this.canvas.width;
                y = Math.random() < 0.5 ? 0 : this.canvas.height;
            }

            this.asteroids.push({
                x: x, 
                y: y,
                r: 20 + Math.random() * 20, 
                xv: Math.random() * 4 - 2, 
                yv: Math.random() * 4 - 2
            });
        }
    },

    update: function() {
        if(this.isGameOver) return;
        
        // ======================================================
        // LÓGICA DE SPAWN GRADUAL (O Segredo está aqui)
        // ======================================================
        // Adiciona ~33ms ao timer a cada frame (já que rodamos a 30fps)
        this.spawnTimer += 33; 

        // Se passar de 1500ms (1.5 segundos), cria UM novo asteroide
        if (this.spawnTimer > 1500) {
            this.createAsteroids(1);
            this.spawnTimer = 0; // Reseta o timer
            
            // Opcional: Se quiser que fique mais difícil com o tempo, 
            // você poderia diminuir esse limite de 1500 gradualmente.
        }
        // ======================================================

        // 1. Física da Nave
        this.ship.a += this.ship.rot;
        if(this.ship.thrust) {
            this.ship.xv += Math.cos(this.ship.a) * 0.5; 
            this.ship.yv -= Math.sin(this.ship.a) * 0.5; 
        } else {
            this.ship.xv *= 0.96; 
            this.ship.yv *= 0.96;
        }
        this.ship.x += this.ship.xv; 
        this.ship.y += this.ship.yv;

        // Tela Infinita Nave
        if(this.ship.x < -this.ship.r) this.ship.x = this.canvas.width + this.ship.r;
        else if(this.ship.x > this.canvas.width + this.ship.r) this.ship.x = -this.ship.r;
        if(this.ship.y < -this.ship.r) this.ship.y = this.canvas.height + this.ship.r;
        else if(this.ship.y > this.canvas.height + this.ship.r) this.ship.y = -this.ship.r;

        // Limpa Tela
        this.ctx.fillStyle = "black"; 
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Desenha Nave
        this.drawShip(this.ship.x, this.ship.y, this.ship.a);

        // 2. Balas
        for(let i = this.bullets.length - 1; i >= 0; i--) {
            let b = this.bullets[i]; 
            b.x += b.xv; 
            b.y += b.yv; 
            b.dist -= Math.hypot(b.xv, b.yv);
            
            this.ctx.fillStyle = "#fff"; 
            this.ctx.fillRect(b.x-1, b.y-1, 3, 3);
            
            if(b.dist < 0) { this.bullets.splice(i, 1); continue; }
            
            for(let j = this.asteroids.length - 1; j >= 0; j--) {
                let a = this.asteroids[j];
                if(Math.hypot(b.x - a.x, b.y - a.y) < a.r) {
                    this.score += 20; 
                    this.scoreElement.innerText = this.score;
                    if(a.r > 15) { 
                        this.asteroids.push({x: a.x, y: a.y, r: a.r/2, xv: Math.random()*4-2, yv: Math.random()*4-2});
                        this.asteroids.push({x: a.x, y: a.y, r: a.r/2, xv: Math.random()*4-2, yv: Math.random()*4-2});
                    }
                    this.asteroids.splice(j, 1); 
                    this.bullets.splice(i, 1); 
                    break;
                }
            }
        }

        // 3. Asteroides
        this.ctx.strokeStyle = "#0d6efd"; 
        this.ctx.lineWidth = 2;
        
        for(let i=0; i < this.asteroids.length; i++) {
            let a = this.asteroids[i];
            a.x += a.xv;
            a.y += a.yv;

            if(a.x < -a.r) a.x = this.canvas.width + a.r;
            else if(a.x > this.canvas.width + a.r) a.x = -a.r;
            if(a.y < -a.r) a.y = this.canvas.height + a.r;
            else if(a.y > this.canvas.height + a.r) a.y = -a.r;

            this.ctx.beginPath();
            this.ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
            this.ctx.stroke();

            let dist = Math.hypot(this.ship.x - a.x, this.ship.y - a.y);
            if(dist < this.ship.r + a.r) {
                this.gameOver();
            }
        }
        
        // REMOVIDO: O bloco que checava "if asteroids.length == 0" para criar nova onda
    },

    drawShip: function(x, y, a) {
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        
        this.ctx.moveTo(
            x + 4/3 * this.ship.r * Math.cos(a),
            y - 4/3 * this.ship.r * Math.sin(a)
        );
        this.ctx.lineTo(
            x - this.ship.r * (2/3 * Math.cos(a) + Math.sin(a)),
            y + this.ship.r * (2/3 * Math.sin(a) - Math.cos(a))
        );
        this.ctx.lineTo(
            x - this.ship.r * (2/3 * Math.cos(a) - Math.sin(a)),
            y + this.ship.r * (2/3 * Math.sin(a) + Math.cos(a))
        );
        this.ctx.closePath();
        this.ctx.stroke();

        if(this.ship.thrust) {
            this.ctx.fillStyle = "orange";
            this.ctx.strokeStyle = "yellow";
            this.ctx.beginPath();
            this.ctx.moveTo(
                x - this.ship.r * (2/3 * Math.cos(a) + 0.5 * Math.sin(a)),
                y + this.ship.r * (2/3 * Math.sin(a) - 0.5 * Math.cos(a))
            );
            this.ctx.lineTo(
                x - this.ship.r * 5/3 * Math.cos(a),
                y + this.ship.r * 5/3 * Math.sin(a)
            );
            this.ctx.lineTo(
                x - this.ship.r * (2/3 * Math.cos(a) - 0.5 * Math.sin(a)),
                y + this.ship.r * (2/3 * Math.sin(a) + 0.5 * Math.cos(a))
            );
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        }
    },

    shoot: function() {
        if(this.bullets.length > 5) return; 

        this.bullets.push({
            x: this.ship.x + 4/3 * this.ship.r * Math.cos(this.ship.a),
            y: this.ship.y - 4/3 * this.ship.r * Math.sin(this.ship.a),
            xv: 5 * Math.cos(this.ship.a), 
            yv: -5 * Math.sin(this.ship.a),
            dist: 400 
        });
    },

    gameOver: function() {
        this.isGameOver = true;
        clearInterval(this.intervalId);
        if(this.finalScoreElement) this.finalScoreElement.innerText = this.score;
        if(this.gameOverScreen) this.gameOverScreen.classList.remove('d-none');
    },

    setupControls: function() {
        document.onkeydown = null; document.onkeyup = null;
        document.addEventListener('keydown', (e) => this.handleKey(e, true));
        document.addEventListener('keyup', (e) => this.handleKey(e, false));
        
        const bindBtn = (id, start, end) => {
            const btn = document.getElementById(id);
            if(btn) {
                btn.onmousedown = btn.ontouchstart = (e) => { e.preventDefault(); start(); };
                btn.onmouseup = btn.ontouchend = (e) => { e.preventDefault(); end(); };
                btn.onmouseleave = (e) => { e.preventDefault(); end(); };
            }
        };
        bindBtn('ast-btn-up', () => this.ship.thrust = true, () => this.ship.thrust = false);
        bindBtn('ast-btn-left', () => this.ship.rot = 0.1, () => this.ship.rot = 0);
        bindBtn('ast-btn-right', () => this.ship.rot = -0.1, () => this.ship.rot = 0);
        const btnShoot = document.getElementById('ast-btn-shoot');
        if(btnShoot) btnShoot.onmousedown = btnShoot.ontouchstart = (e) => { e.preventDefault(); this.shoot(); };
    },

    handleKey: function(e, isKeyDown) {
        if(this.isGameOver) return;
        const k = e.key.toLowerCase();
        if((k === ' ' || k === 'k') && isKeyDown) { this.shoot(); return; }
        if(k === 'w' || k === 'arrowup') this.ship.thrust = isKeyDown;
        if(k === 'a' || k === 'arrowleft') this.ship.rot = isKeyDown ? 0.1 : 0;
        if(k === 'd' || k === 'arrowright') this.ship.rot = isKeyDown ? -0.1 : 0;
    }
};

// ==========================================
// 4. TETRIS (CORRIGIDO)
// ==========================================
const tetrisGame = {
    canvas: null, ctx: null,
    scoreEl: null, goScreen: null, finalScoreEl: null,
    cols: 12, rows: 20, blockSize: 20, 
    board: [], score: 0, 
    dropCounter: 0, dropInterval: 1000, lastTime: 0,
    isGameOver: false, animationId: null,
    colors: [null, '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF', '#FF8E0D', '#FFE138', '#3877FF'],
    player: { pos: {x: 0, y: 0}, matrix: null, score: 0 },

    init: function() {
        this.canvas = document.getElementById('tetCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreEl = document.getElementById('tetScore');
        this.goScreen = document.getElementById('tetGameOverScreen');
        this.finalScoreEl = document.getElementById('tetFinalScore');

        // Reseta o canvas e escala
        this.ctx.setTransform(1, 0, 0, 1, 0, 0); 
        this.ctx.scale(20, 20); 

        // Esconde Game Over e Reseta flags
        if(this.goScreen) this.goScreen.classList.add('d-none');
        this.isGameOver = false;

        // Reinicia Tabuleiro e Score
        this.board = this.createMatrix(12, 20);
        this.player.score = 0;
        this.updateScore();
        this.resetPlayer();

        this.setupControls();
        
        // CORREÇÃO CRÍTICA DO RESTART:
        // Cancela loop anterior se existir
        if(this.animationId) cancelAnimationFrame(this.animationId);
        
        // Reseta contadores de tempo para não pular frames
        this.dropCounter = 0;
        this.lastTime = 0; 

        // Inicia novo loop
        this.update();
    },

    createMatrix: function(w, h) {
        const matrix = [];
        while (h--) matrix.push(new Array(w).fill(0));
        return matrix;
    },

    createPiece: function(type) {
        if (type === 'I') return [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
        if (type === 'L') return [[0, 2, 0], [0, 2, 0], [0, 2, 2]];
        if (type === 'J') return [[0, 3, 0], [0, 3, 0], [3, 3, 0]];
        if (type === 'O') return [[4, 4], [4, 4]];
        if (type === 'Z') return [[5, 5, 0], [0, 5, 5], [0, 0, 0]];
        if (type === 'S') return [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
        if (type === 'T') return [[0, 7, 0], [7, 7, 7], [0, 0, 0]];
    },

    draw: function() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMatrix(this.board, {x: 0, y: 0});
        this.drawMatrix(this.player.matrix, this.player.pos);
    },

    drawMatrix: function(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.ctx.fillStyle = this.colors[value];
                    this.ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
                    this.ctx.lineWidth = 0.05;
                    this.ctx.strokeStyle = 'white';
                    this.ctx.strokeRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    },

    merge: function(board, player) {
        player.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    board[y + player.pos.y][x + player.pos.x] = value;
                }
            });
        });
    },

    rotate: function(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
            }
        }
        if (dir > 0) matrix.forEach(row => row.reverse());
        else matrix.reverse();
    },

    playerRotate: function(dir) {
        const pos = this.player.pos.x;
        let offset = 1;
        this.rotate(this.player.matrix, dir);
        while (this.collide(this.board, this.player)) {
            this.player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.player.matrix[0].length) {
                this.rotate(this.player.matrix, -dir);
                this.player.pos.x = pos;
                return;
            }
        }
    },

    collide: function(board, player) {
        const m = player.matrix;
        const o = player.pos;
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 && (board[y + o.y] && board[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    },

    resetPlayer: function() {
        const pieces = 'ILJOTSZ';
        this.player.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        this.player.pos.y = 0;
        this.player.pos.x = (this.board[0].length / 2 | 0) - (this.player.matrix[0].length / 2 | 0);
        
        if (this.collide(this.board, this.player)) {
            this.gameOver();
        }
    },

    playerDrop: function() {
        this.player.pos.y++;
        if (this.collide(this.board, this.player)) {
            this.player.pos.y--;
            this.merge(this.board, this.player);
            this.arenaSweep();
            this.resetPlayer();
        }
        this.dropCounter = 0;
    },

    playerMove: function(dir) {
        this.player.pos.x += dir;
        if (this.collide(this.board, this.player)) {
            this.player.pos.x -= dir;
        }
    },

    arenaSweep: function() {
        let rowCount = 1;
        outer: for (let y = this.board.length - 1; y > 0; --y) {
            for (let x = 0; x < this.board[y].length; ++x) {
                if (this.board[y][x] === 0) continue outer;
            }
            const row = this.board.splice(y, 1)[0].fill(0);
            this.board.unshift(row);
            ++y;
            this.player.score += rowCount * 10;
            rowCount *= 2;
        }
        this.updateScore();
    },

    updateScore: function() {
        if(this.scoreEl) this.scoreEl.innerText = this.player.score;
    },

    update: function(time = 0) {
        if(this.isGameOver) return;
        
        // CORREÇÃO: Inicializa lastTime no primeiro frame para evitar pulo
        if (!this.lastTime) {
            this.lastTime = time;
        }

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.playerDrop();
        }

        this.draw();
        this.animationId = requestAnimationFrame(this.update.bind(this));
    },

    gameOver: function() {
        this.isGameOver = true;
        cancelAnimationFrame(this.animationId);
        if(this.finalScoreEl) this.finalScoreEl.innerText = this.player.score;
        if(this.goScreen) this.goScreen.classList.remove('d-none');
    },

    setupControls: function() {
        document.onkeydown = null; document.onkeyup = null;
        document.addEventListener('keydown', (e) => this.handleKey(e));
        
        const bind = (id, action) => {
            const el = document.getElementById(id);
            if(el) el.onclick = (e) => { e.preventDefault(); action(); };
        };
        bind('tet-btn-left', () => this.playerMove(-1));
        bind('tet-btn-right', () => this.playerMove(1));
        bind('tet-btn-down', () => this.playerDrop());
        bind('tet-btn-rotate', () => this.playerRotate(1));
    },

    handleKey: function(e) {
        if(this.isGameOver) return;
        const k = e.key.toLowerCase();
        
        if (k === 'a' || k === 'arrowleft') this.playerMove(-1);
        else if (k === 'd' || k === 'arrowright') this.playerMove(1);
        else if (k === 's' || k === 'arrowdown') this.playerDrop();
        else if (k === 'w' || k === 'arrowup') this.playerRotate(1);
    }
};