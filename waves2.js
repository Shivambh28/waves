(function () {

    /**
     * Global 
     * 
     */
    var canvas, context, canvas2, context2, height, width, xAxis, yAxis, draw, vStrt, increment, pause;

    /**
     * Init function.
     * 
     * Initialize variables and begin the animation.
     */
    function init() {
        canvas = document.getElementById("canvas");
        
        canvas.width = window.innerWidth;
        canvas.height =  window.innerHeight;
        
        context = canvas.getContext("2d");
        context.font = '18px sans-serif';
        context.strokeStyle = '#000';
        context.lineJoin = 'round';
        
        height = canvas.height;
        width = canvas.width;
          
        vStrt = 0.1;
        increment = true; 
        
        yAxis = Math.floor(0);
        draw.seconds = 0;
        draw.t = 0;
        pause = false;
        
        draw();
    }

    /**
     * Resize function.
     * 
     * Initialize variables and begin the animation.
     */
    
    var rtime;
    var timeout = false;
    var delta = 200;

    $(window).on('resize', onResize);   

    function onResize() {
      rtime = new Date();

      // Clear the canvas
      pause = true;

      // Update Canvas width and height
      // canvas.width = window.innerWidth;
      // canvas.height =  window.innerHeight;

      // Check if resizing ended
      if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
      }
    }

    function resizeend() {
        if (new Date() - rtime < delta) {
            setTimeout(resizeend, delta);
        } else {
            timeout = false;
            // alert('Done resizing');
            pause = false;
        }               
    }

    /**
     * Draw animation function.
     * 
     */
    var draw = function () {
        // Pause animation frame
        if(pause) return;

        // Clear the canvas
        context.clearRect(0, 0, width, height);
        
        // Set styles for animated graphics
        context.save();

        // draw curves
        drawCurves();
        
        // Restore original styles
        context.restore();

        // Update the time and draw again
        draw.seconds = draw.seconds - 0.005;
        draw.t = draw.seconds * Math.PI;

        requestAnimationFrame(draw);
    };

    /**
     * Draw multiple sine curve lines.
     * 
     */
    function drawCurves() {
      for( var i = 0; i < 2; i += 0.3) {
        var unit = 100;
            unit += i;
            unit = unit.toFixed(1);

        context.beginPath();
        drawSine({ t: draw.t, unit : unit, yStart: 2.0001, strokeColor : '#008a85', lineWidth : 0.5});
        context.stroke();
      }

      for( var i = 0; i < 30; i += 1) {
        var unit = 100;
            unit += i;
            unit = unit.toFixed(1);
       
        context.beginPath();
        drawSine({ t: draw.t, unit : unit, yStart: 2, strokeColor : '#03ABA5', lineWidth : 0.5 });
        context.stroke();
      }
    }

    /**
     * Draw Single sine curve lines.
     * 
     */
    function drawSine(arg) {
        // Set the initial x and y, starting at 0,0 and translating to the origin on the canvas.
        context.lineWidth   = arg.lineWidth;
        context.strokeStyle = arg.strokeColor;

        var x = arg.t;
        var y = Math.sin(x);

        // start from 0 and expand 
        if(increment) {
          vStrt += 0.00004;
        } else {
           //vStrt -= 0.00001;
        }
         
        // stop at specified value 
        if(vStrt > 0.6) {
          increment = false;
        }

        // start again from specified value
        // if(vStrt < 0.3) {
        //   increment = true;
        // }

        // Techinically Y position of sin curve
        xAxis = Math.floor( height / arg.yStart );  
        
        // Loop to draw segments
        for (i = yAxis; i <= width + 100; i += 100) {
            x = arg.t + ( -yAxis + i) / (arg.unit += 1);
            y = Math.sin(x) * vStrt;

            context.lineTo(i, arg.unit * y + xAxis);
        }
    }

    init();
    
})();