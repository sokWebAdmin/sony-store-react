$(() => {
  
  const prdDetail = (e) =>{
    $('.detail_main_view').siblings().hide(); // 상세 메인 외 보여지는 이미지 외 숨김.
    $('.btn_article .btn__event__more').on("click",function(){
      let $thisInfo = $(this).closest('.detail_info');
      $('.detail_main_view').siblings().show();
      $(this).parent().hide();
      detailSwiper.update();
      return false;
    });

    let $detailSlider = $('.detail_slider');
    let detailSwiper = new Swiper($detailSlider[0], {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  const imgChange = (e) => { // 제품 개요 이미지
    let $detailWrap = $('.detail_box'),
        $imgBox = $detailWrap.find('.img');

    $imgBox.each(function(_index, _el){
      let _thisImg = $(_el).find('img'),
          _src =  _thisImg.attr("src"),
          _winW = $(window).width();
      if(_winW > 640){ // pc
        _src = _src.split("/mo_").join('/pc_');
      }else{ //mo
        _src = _src.split("/pc_").join('/mo_');
      }
      _thisImg.attr("src",_src);
    });
  }
  
  $(window).resize(function(){
    imgChange();  // pc_mo 이미지명 변경
  });

  prdDetail(); // 제품 개요
  imgChange(); // PC, MO 이미지 명 변경
});
