module.exports = {
  // draw crosshair and target using a canvas-like ctx object
  draw: function(state, ctx) {
    const target = (state && state.target) || {x:0,y:0,radius:10};
    const cross = (state && state.crosshair) || {x:0,y:0};

    // draw target circle
    if (ctx && typeof ctx.beginPath === 'function') ctx.beginPath();
    if (ctx && typeof ctx.arc === 'function') ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
    if (ctx && typeof ctx.fill === 'function') ctx.fill();
    if (ctx && typeof ctx.stroke === 'function') ctx.stroke();

    // draw crosshair (simple +)
    if (ctx && typeof ctx.beginPath === 'function') ctx.beginPath();
    if (ctx && typeof ctx.moveTo === 'function') ctx.moveTo(cross.x - 10, cross.y);
    if (ctx && typeof ctx.lineTo === 'function') ctx.lineTo(cross.x + 10, cross.y);
    if (ctx && typeof ctx.moveTo === 'function') ctx.moveTo(cross.x, cross.y - 10);
    if (ctx && typeof ctx.lineTo === 'function') ctx.lineTo(cross.x, cross.y + 10);
    if (ctx && typeof ctx.stroke === 'function') ctx.stroke();
  }
};