(function($) {
	$.fn.slider = function( options ){
    this.zaman;var ilk = this;var photos =  {}; var $i = 1; var $sa;var basilan;var $speed = 1000;
    var ayarlar = $.extend({
      // Varsayılanlar
      speed: $speed,
      wait: $speed + 2000,
      lines: true,
      autoplay: true,
      navonhover: false,
      effect: 'fade',
    }, options );
    $.getJSON('assets/modules/images/img/photoList.json', function(data) {
      $.each(data.photos, function(key, val) {
        photos[val.number] = {name: val.name ,ext: val.ext ,location: val.location } ;
      });
      ilk.append('<div class="slides"><div id="slide' + $i + '" class="slide activeS"><img src="' + photos[$i].location + '/' + photos[$i].name + '.' + photos[$i].ext + '"></div></div>');
        $sa = Object.keys(photos).length;
        if(ayarlar.lines == true){ilk.lines();}
    });
    this.deactivateBtns = function(){
      $('#tSliderBtns').css('pointerEvents','none');
    }
    this.activateBtns = function(){
      $('#tSliderBtns').removeAttr('style');
    }
    this.siradaki = function (a){if( a == 'art' ){if( $i >= $sa){$i = 1;}else{$i++;}}else if( a == 'azal'){if( $i <= 1){$i = $sa;}else{$i--;}}
    }
    this.yukle = function (hangi){ilk.deactivateBtns();
      $('.slide').before('<div id="slide' + hangi + '" class="slide"><img src="' + photos[hangi].location + '/' + photos[hangi].name + '.' + photos[hangi].ext + '"></div>');
      $("#slide"+hangi).children('img').one("load", function() {

        var $bas = $i - 1;
        $('#tSliderLines').find('div:eq('+$bas+')').addClass('activeL').siblings().removeClass('activeL');

        switch(ayarlar.effect){
          case 'fade':
            $('.activeS').animate({
                    opacity: '0'
                  }, ayarlar.speed, function () {
                    $('.slide:gt(0)').remove();
                    $('.slide').addClass('activeS');
                    ilk.activateBtns();
                  });
            break;
          case 'lineer':

            if(basilan == 'next'){var b = '-'+ilk.width()+'px';
              $('.slides').find('div:eq(0)').css( 'margin-left' , ilk.width()).animate({
                    'margin-left':0,
              },ayarlar.speed);
              $('.activeS').animate({
                     'margin-left': b,
                    }, ayarlar.speed, function () {
                      $('.slide:gt(0)').remove();
                      $('.slide').addClass('activeS');
                      ilk.activateBtns();
                    });
            }else if(basilan == 'prev'){var b = ilk.width()+'px';var c = '-'+ilk.width()+'px';
              $('.slides').find('div:eq(0)').css( 'margin-left' , c ).animate({
                    'margin-left':0,
              },ayarlar.speed);
              $('.activeS').animate({
                     'margin-left': b,
                    }, ayarlar.speed, function () {
                      $('.slide:gt(0)').remove();
                      $('.slide').addClass('activeS');
                      ilk.activateBtns();
                    });
            }

            break;
        }
      });      
    }
    this.NavBtns = function(){
      ilk.append('<div id="tSliderBtns"><div id="prevBtn" class="Navbtn" data-call="prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div><div id="nextBtn" class="Navbtn" data-call="next"><i class="fa fa-angle-right" aria-hidden="true"></i></div></div>');
    }
    this.NavBtnsGizleGoster = function(a,b=0){
      if(ayarlar.navonhover){
        if(a == 1){
          var wdth = $('#tSliderBtns').delay(b).width() + 300;
          $('#tSliderBtns').animate({
            width: wdth,
            'margin-left': '-150px'
          },500);
        }
        else{
          $('#tSliderBtns').animate(
              {
                width:ilk.width(),
                'margin-left':0
              },150); 
        }
      }
    }
    this.lines = function(){
      ilk.append('<div id="tSliderLines" class="lines"></div>');
      for (var $say = 1; $say <= $sa ; $say++){
        if($say === 1){ var $class = 'activeL';}else{$class = '';}
        $('#tSliderLines').append('<div class="tSliderline '+$class+'" data-call="lineBtn" data-slide="slide'+$say+'"></div>');
      }
      $('.tSliderline').on('click',function(){
        $(this).addClass('activeL').siblings().removeClass('activeL');
        ilk.lineBtn($(this).data('slide'));
      })
    }
    this.prev = function(){
      basilan = 'prev';
      ilk.siradaki('azal');
      ilk.yukle($i);
    }
    this.next = function(){
      basilan = 'next';
      ilk.siradaki('art');
      ilk.yukle($i);
    }
    this.lineBtn = function(which){
      which = parseInt(which.split('slide')[1]);
      if(which >= $i){basilan = 'next';}else if(which < $i){basilan = 'prev';}
      $i = which;
      ilk.yukle($i);
    }
    this.autoplay = function() {
      if(ayarlar.autoplay){
        zaman = setInterval(function() {
          ilk.next();
        },  ayarlar.wait);
      }
    }
    this.hover(
      function(){
        clearInterval(zaman);
        ilk.NavBtnsGizleGoster(0);
      },
      function(){
        ilk.autoplay();ilk.NavBtnsGizleGoster(1);
      }
    );
    ilk.autoplay();ilk.NavBtns();ilk.NavBtnsGizleGoster(1,2000);
    $('#tSliderBtns').children().on('click' , function() {
      $.isFunction(ilk[$(this).data('call')]) && ilk[$(this).data('call')]();
    });
	}
$('[data-slider="tSlider"]').each(function() { 
    $(this).slider({
            speed: $(this).data('speed'),
            wait: $(this).data('wait'),
            lines: $(this).data('lines'),
            effect: $(this).data('effect'),
            navonhover: $(this).data('navonhover'),
            autoplay: $(this).data('autoplay'),
    }); 
  });
})(jQuery);