function draw(){
    buffer.clearRect(
      0,
      0,
      width,
      height
    );

    var loop_counter = ripples.length - 1;
    if(loop_counter >= 0){
        for(loop_counter = 0; loop_counter < ripples.length - 1; loop_counter++){
            // Draw ripple.
            buffer.fillStyle = ripples[loop_counter][3];
            buffer.fillRect(
              ripples[loop_counter][0] - ripples[loop_counter][2],
              ripples[loop_counter][1] - ripples[loop_counter][2],
              ripples[loop_counter][2] * 2,
              ripples[loop_counter][2] * 2
            );
        }
    }

    canvas.clearRect(
      0,
      0,
      width,
      height
    );
    canvas.drawImage(
      document.getElementById('buffer'),
      0,
      0
    );

    window.requestAnimationFrame(draw);
}

function init(){
    window.onresize = resize;
    resize();

    drop_x = x;
    drop_y = y;

    window.requestAnimationFrame(draw);
    setInterval(
      'logic()',
      30
    );
}

function logic(){
    ripple_timer += 1;
    if(ripple_timer > 23){
        ripple_timer = 0;

        // Create new ripple.
        ripples.push([
          drop_x,
          drop_y,
          0,
          ripple_color
            ? random_hex()
            : '#000',
        ]);

        // Alternate between color ripple and #000 ripple.
        ripple_color = !ripple_color;
    }

    var loop_counter = ripples.length - 1;
    if(loop_counter >= 0){
        do{
            if(ripples[loop_counter][2] > x){
                ripples.splice(
                  loop_counter,
                  1
                );
            }
        }while(loop_counter--);

        for(loop_counter = 0; loop_counter < ripples.length - 1; loop_counter++){
            // Increase size of ripple.
            ripples[loop_counter][2] += 1;
        }
    }
}

function random_hex(){
    var choices = '0123456789abcdef';
    return '#'
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16))
      + choices.charAt(Math.floor(Math.random() * 16));
}

function resize(){
    height = window.innerHeight;
    document.getElementById('buffer').height = height;
    document.getElementById('canvas').height = height;
    y = height / 2;

    width = window.innerWidth;
    document.getElementById('buffer').width = width;
    document.getElementById('canvas').width = width;
    x = width / 2;
}

var buffer = document.getElementById('buffer').getContext('2d');
var canvas = document.getElementById('canvas').getContext('2d');
var drop_x = 0;
var drop_y = 0;
var height = 0;
var ripple_color = false;
var ripples = [];
var ripple_timer = 99;
var width = 0;
var x = 0;
var y = 0;

window.onkeydown = function(e){
    // Clear and reset.
    ripples.length = 0;
    drop_x = x;
    drop_y = y;
};

window.onload = init;

window.onmousedown = 
  window.ontouchstart = function(e){
    ripple_color = false;

    // Change ripple origin.
    drop_x = e.pageX;
    drop_y = e.pageY;
};
