nfcRing.heatmap = {
  coOrds: {}, // The Co-Ordinates we have stored for this phone
  coOrdData: {
    data: []
  },

  init: function(){
    nfcRing.heatmap.loadFromRemote(function(){
      if($('#heatMap canvas').length >= 1){
        console.log("Heatmap already drawn");
        return;
      }

      // Initialize the heatmap
      nfcRing.heatmap.config = { // Our heatmap config
        element: document.getElementById("heatMap"),
        radius: 30,
        opacity: 100,
        gradient: {
          '.85':'white',
          '.1':'black'
        }
      }

      nfcRing.heatmap.coOrdData = {};
      nfcRing.heatmap.coOrdData.max = 30;
      nfcRing.heatmap.coOrdData.data = [];

      $.each(nfcRing.heatmap.coOrds, function(k,v){
        var x = k.split(":")[0];
        var y = k.split(":")[1];
        x = Number(x);
        y = Number(y);
        if(x >= 0 && y >= 0){
          var coOrd = {
            x: x,
            y: y,
            count: v
          };
          nfcRing.heatmap.coOrdData.data.push(coOrd);
        }
      });

      console.log("1. initiating heatmap");
      window.hm = h337.create(nfcRing.heatmap.config);
      console.log("2. Writing data to heatmap", nfcRing.heatmap.coOrdData);
      window.hm.store.setDataSet(nfcRing.heatmap.coOrdData);
      console.log("3. Done writing data to the heatmap");

      nfcRing.heatmap.getImageLightness(function(b){

        console.log("number of results", nfcRing.heatmap.coOrdData.data.length);

        if(nfcRing.heatmap.coOrdData.data.length < 50){
          $('#data').append("We dont have enough data to make a call on this model");
        }

        $('#data').append("Brightness: "+b + " - ")

        if(b < 5){
          $('#data').append("performance is poor");
          return;
        }

        if(b < 10){
          $('body').append("performance is not great");   
          return;
        }

        if(b < 20){
          $('body').append("performance is okay");
          return;
        }
       
        if(b < 40){
          $('body').append("performance is great");
          return;
        }

        if(b < 60){
          $('body').append("performance is amazing");
          return;
        }

      })

    });
  }, 

  draw: function(){ // Draw the data from our coOrds onto the heatmap

  }, 

  loadFromRemote: function(callback){ // Getting data from Remote database..

    try{
      if(!device){return false;}
    }catch(e){
      return false;
    }

    var coOrdinateCounter = {};
    var maxXArr = [];
    var maxYArr = [];
    var model = device.model;

    $.getJSON("http://sweetspot.nfcring.com/api/v2/sweetspot?model="+model).done(function(results){
      results = JSON.parse(results);
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
        var x = object.x; // 1
        var y = object.y; // 2
        if(object.maxX && object.maxY){
          var maxX = object.maxX / 3 ; // 800 -- We devide by 3 because that's the pixelRatio the browser imposes
          var maxY = object.maxY / 3 ; // 400
          maxXArr.push(maxX);
          maxYArr.push(maxY);
        }

        // Turns it into a counted set of objects instead of single objects
        if(coOrdinateCounter[x+":"+y]){ // If this coOrdinateCounter exists add to it
          coOrdinateCounter[x+":"+y] = coOrdinateCounter[x+":"+y] + 1;
        }else{
          coOrdinateCounter[x+":"+y] = 1;
        }
      }
      console.log("Got results from database", coOrdinateCounter);

      if(results.length == 0){ // if there are no results
        console.log("no results from database");
      }else{ // there are some heatmap results so let's draw em
        console.log("0. Drawing heatmap");
        if($('#heatMap canvas').length < 1){
          nfcRing.heatmap.coOrds = coOrdinateCounter;
          localStorage.setItem("heatMapCache", JSON.stringify(nfcRing.heatmap.coOrds));
        }
        console.log(maxXArr, maxYArr);

        if(maxXArr.length > 0 && maxYArr.length > 0) nfcRing.heatmap.redrawCanvas(maxXArr, maxYArr);

        callback();
      }

    }).fail(function(){
      console.log("Attempting to load data from cache");
      var cachedCoOrds = localStorage.getItem("heatMapCache");
      if(cachedCoOrds){
        nfcRing.heatmap.coOrds = JSON.parse(cachedCoOrds);
        callback();      
      }
    });
  },
  redrawCanvas: function (maxXArr, maxYArr){
    var x = 0;
    $.each(maxXArr,function() {
      x += this;
    });
    x = x / maxXArr.length;
    $('#heatMap, #display').css({"min-width":x+"px","width":x+"px"})
    var overallWidth = x + 34;
    $('#t, #m, #b').css({"width":overallWidth+"px"})

    var y = 0;
    $.each(maxYArr,function() {
      y += this;
    });
    y = y / maxYArr.length;
    $('#heatMap').css({"min-height":y+"px","height":y+"px"})
    var overallHeight = y + 1;
    $('#m').css({"height":y+"px"})
    $('#display').css({"height":overallHeight+"px"})

//    nfcRing.heatmap.getImageLightness(function(b){alert("Brightness"+b)})

  },
  getImageLightness: function(callback) {
    var canvas = hm.get("canvas");
    var ctx = canvas.getContext("2d");
    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = imageData.data;
    var r,g,b,avg;
    var colorSum = 0;

    for(var x = 0, len = data.length; x < len; x+=4) {
      r = data[x];
      g = data[x+1];
      b = data[x+2];

      avg = Math.floor((r+g+b)/3);
      colorSum += avg;
    }

    var brightness = Math.floor(colorSum / (canvas.width*canvas.height));
    callback(brightness);
  }

}

