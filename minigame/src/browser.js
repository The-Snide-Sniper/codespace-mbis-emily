(function(){
  // Browser integration for the minigame. This file expects a CommonJS environment
  // when run under Node tests; in a real browser build step, bundle src/game.js.
  function startBrowser() {
    if (typeof window === 'undefined') return; // not running in browser
    // Attempt to load game via require if available (for dev with bundlers)
    var game = (typeof require === 'function') ? require('./game') : (window.game || null);
    if (!game) {
      console.warn('Game module not available in browser without bundling.');
      return;
    }
    var canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    game.reset();
    game.startSession();
    game.spawnCrosshair({ size: 30, startX: -100, startY: canvas.height/2, targetX: canvas.width/2, targetY: canvas.height/2 });

    var last = performance.now();
    function loop(now){
      var dt = (now - last) / 1000;
      last = now;
      game.tick(dt);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      game.render(ctx);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    canvas.addEventListener('mousemove', function(e){
      var r = canvas.getBoundingClientRect();
      game.setClickPoint({ x: e.clientX - r.left, y: e.clientY - r.top });
    });
    canvas.addEventListener('mousedown', function(){ game.click(); });
    canvas.addEventListener('touchstart', function(){ game.click(); });
  }

  if (typeof window !== 'undefined') {
    if (document.readyState === 'complete' || document.readyState === 'interactive') startBrowser();
    else document.addEventListener('DOMContentLoaded', startBrowser);
  }
})();