const crosshair = $("#crosshair");
const gun = $("#gun");
//move gun & crosshair with mousemove
$(window).mousemove(function (event) {
    let yAxis = event.pageY;
    let xAxis = event.pageX;

    if (yAxis > 36 && yAxis < 514) {
        crosshair.css("top", yAxis);
    }
    if (xAxis > 230) {
        crosshair.css("left", xAxis);
    }

    if (1250 > xAxis && xAxis > 232) {
        gun.css("left", xAxis);
    }
});