var scroll = function(){
  //init
  $('.scrollText').wrap('<div class="container"></div>');
  $('.container').append('<div class="barContainer"></div>');
  $('.barContainer').append('<div class="bar"></div>');
  var container = $('.container'),
  scrollText    = $('.scrollText'),
  barContainer  = $('.barContainer'),
  bar           = $('.bar');
  for(var i = 0; i < scrollText.length; i++) {
    var className = i + '_scroll';
    scrollText[i].className   = className + ' scrollText';
    barContainer[i].className = className + ' barContainer';
    bar[i].className          = className + ' bar type'+i;
    container[i].addEventListener('DOMMouseScroll', function(e){
      moveEx(e, e.detail);
    }, false);
  }

  //get height
  var containerH = container.height(),
  scrollTextH    = scrollText.height(),
  barH           = bar.height();
  container.css('overflow', 'hidden');

  //function
  var id = 0,moveY= 0,speed = 10,
  barMax  = containerH - barH,
  textMax = scrollTextH - containerH,
  ratio   = textMax / barMax;
  var move = function(){
    if(moveY >= barMax)moveY = barMax;
    else if(moveY <= 0)moveY = 0;
    $("."+id+"_scroll.bar").css('top', moveY+"px");
    $("."+id+"_scroll.scrollText").css('top', (-1 * moveY * ratio)+"px");
  }
  var moveEx = function(e, value){
    if(value < 0)moveY += speed;
    else         moveY -= speed;
    move();
  };
  var attach = function(id){
    var barContainer = $("."+id+"_scroll.barContainer");
    barContainer.on('mousemove', function(e){
      var off    = barContainer.offset();
      var height = $("."+id+"_scroll.bar.type"+id).height();
      moveY = e.pageY - off.top - (height / 2);
      move();
    });
  };

  //event
  $(".container").on('click', function(e){
    var tmp = e.target.className.split("_");
    id = tmp[0];
    attach(id);
  });
  $(".container").on('mousewheel', function(e){
    moveEx(e, e.originalEvent.deltaY);
  });
};

scroll();
