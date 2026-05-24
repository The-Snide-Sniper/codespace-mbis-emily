module.exports = {isHit: function(point, target)
{
    var dx = point.x - target.x;
    var dy = point.y - target.y;
    return dx*dx + dy*dy <= target.radius * target.radius;
}};
