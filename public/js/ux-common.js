$(() => {
  console.log("ux-common.js loaded");

  // elems.
  const breakpoint = 1280;
  const html = document.querySelector("html");
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const gnb = document.querySelector(".gnb");
  const gnbLink1 = document.querySelectorAll(".gnb__menu>li");
  const gnbLink2 = document.querySelectorAll(".gnb__menu>li>a");
  const btnOpenGnb = document.querySelector(".btn__menu__open");
  const btnHideGnb = document.querySelector(".btn__menu__close");
  const btnShowSearch = document.querySelector(".btn__search");
  const btnHideSearch = document.querySelector(".search__btn__close");
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggle = document.querySelector(".sidebar__btn__toggle");
  const sidebarTop = document.querySelector(".sidebar__btn.top");
  const footer = document.querySelector(".footer");
  const memberPcLink = document.querySelector(".btn__desktop.btn__mypage");

  window.addEventListener("load", init);
  window.addEventListener("resize", checkWidth);
  gnb.addEventListener("mouseleave", hideGnb);
  btnOpenGnb.addEventListener("click", showGnbMo);
  btnHideGnb.addEventListener("click", hideGnbMo);
  btnShowSearch.addEventListener("click", showSearch);
  btnHideSearch.addEventListener("click", hideSearch);

  for (let i = 0; i < gnbLink1.length; i++) {
    gnbLink1[i].addEventListener("mouseover", showGnb);
    gnbLink1[i].addEventListener("mouseleave", removeGnbActive);
  }
  for (let i = 0; i < gnbLink2.length; i++) {
    gnbLink2[i].addEventListener("click", showGnbSecondary);
  }

  // functions.
  function init() {
    checkWidth();
    html.classList.add(checkUA());
  }

  function checkWidth() {
    const windowWidth = window.innerWidth;

    if (windowWidth > breakpoint) {
      html.classList.add("desktop");
      html.classList.remove("mobile");
    } else {
      html.classList.remove("desktop");
      html.classList.add("mobile");
    };
  }

  function checkUA() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf("windows") > -1) {
      return "windows";
    } else if (userAgent.indexOf("android") > -1) {
      return "android";
    } else if (userAgent.indexOf("iphone") > -1 || userAgent.indexOf("ipad") > -1 || userAgent.indexOf("ipod") > -1) {
      return "ios";
    } else if (userAgent.indexOf("macintosh") > -1 || userAgent.indexOf("mac os") > -1) {
      return navigator.maxTouchPoints > 1 ? "ios" : "macos";
    } else {
      return "other";
    };
  }

  function showGnb(e) {
    gnb.classList.add("gnb--active");
    e.currentTarget.classList.add("active");
  }

  function showGnbMo() {
    body.style.overflow = "hidden";
    header.classList.add("header--active");
  }

  function showGnbSecondary(e) {
    const active = "mo--active";
    const secondary = e.target.parentElement;
    const hasClass = secondary.classList.contains(active);

    for (let i = 0; i < gnbLink1.length; i++) {
      gnbLink1[i].classList.remove(active);
    }
    if (hasClass === false) {
      secondary.classList.add(active);
    }
  }

  function showSearch() {
    const windowWidth = window.innerWidth;

    header.classList.add("header--search");
    if (windowWidth <= breakpoint) {
      body.style.overflow = "hidden";
    }
  }

  function removeGnbActive(e) {
    e.currentTarget.classList.remove("active");
  }

  function hideGnb() {
    gnb.classList.remove("gnb--active");
  }

  function hideGnbMo() {
    body.removeAttribute("style");
    header.classList.remove("header--active");
  }

  function hideSearch() {
    body.removeAttribute("style");
    header.classList.remove("header--search");
  }

  // pc login tooltip
  memberPcLink.addEventListener("click", e => {
    e.preventDefault();

    const elem = document.querySelector(".header .member");
    const active = "member--visible";
    const outsideClick = e => {
      if (!elem.contains(e.target) && !memberPcLink.contains(e.target)) {
        $(elem).removeClass(active);
        body.removeEventListener("click", outsideClick);
      };
    };

    if (elem.classList.contains(active)) {
      elem.classList.remove(active);
      body.removeEventListener("click", outsideClick);
    } else {
      elem.classList.add(active);
      body.addEventListener("click", outsideClick);
    }
  });

  // footer - family site on desktop
  document.querySelector(".footer__family__link__trigger").addEventListener("click", e => {
    const link = e.target.closest(".footer__family__link");
    const active = "footer__family__link--active";
    const outsideClick = e => {
      console.log(!link.contains(e.target))
      if (!link.contains(e.target)) {
        $(link).removeClass(active);
        body.removeEventListener("click", outsideClick);
      };
    };

    if (link.classList.contains(active)) {
      link.classList.remove(active);
    } else {
      link.classList.add(active);
      body.addEventListener("click", outsideClick);
    };
  });

  // sort
  const itemsort = $(".itemsort");

  if (itemsort.length) {
    itemsort.each(function(){
      const _this = $(this);
      const activeClass = "itemsort--open";
      const sortButton = _this.find(".itemsort__button");
      const sortSelected = _this.find(".itemsort__button__selected");
      const sortDrawer = _this.find(".itemsort__drawer");
      const sortList = _this.find(".itemsort__item");
      const sortLink = _this.find(".itemsort__item__link");

      sortButton.click(() => {
        if (_this.hasClass(activeClass)) {
          _this.removeClass(activeClass)
          $("body").off("click", outerClick);
        } else {
          _this.addClass(activeClass);
          $("body").on("click", outerClick);
        }
      });
      sortLink.click(function(e) {
        e.preventDefault();

        const parent = $(this).parent(sortList);
        const activeClass2 = "itemsort__item--active";
        
        sortList.removeClass(activeClass2);
        parent.addClass(activeClass2);
        sortSelected.text($(this).text());
        _this.removeClass(activeClass);
        // do sort items!
      });
      function outerClick(e) {
        if (!$(e.target).closest(_this).length && !$(e.target).is(_this)) {
          _this.removeClass(activeClass);
          $("body").off("click", outerClick);
        };
      }
    });
  }  
  
  // floating menu
  let prevScrollY = window.scrollY;

  const scrollAction = () => {
    let winHeight = window.innerHeight;
    let start = 300;
    let end = footer.offsetTop - winHeight + sidebar.offsetHeight + parseInt(getComputedStyle(sidebar).right) * 2;

    if (prevScrollY !== window.scrollY) {
      if (prevScrollY > window.scrollY) {
        // scroll up
        if (prevScrollY !== 0) {
          header.classList.add("header--fixed");
        } else {
          header.classList.remove("header--fixed");
        };
      } else {
        // scroll down
        header.classList.remove("header--fixed");
      }
      
      prevScrollY = window.scrollY;
      // sidebar
      prevScrollY >= start ? sidebar.classList.add("sidebar--visible") : sidebar.classList.remove("sidebar--visible");
      prevScrollY >= end ? sidebar.classList.add("sidebar--reachend") : sidebar.classList.remove("sidebar--reachend");
    };

  };

  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--active");
  });
  sidebarTop.addEventListener("click", () => {
    let speed = 200;
    let maxSpeed = 700;
    let scrollY = window.scrollY;

    if (scrollY > 1000) {
      scrollY > 5000 ? speed = maxSpeed : speed + scrollY * 0.1;
    };
    $("html, body").stop().animate({scrollTop: 0}, speed, "swing", () => {
      sidebar.classList.remove("sidebar--active");
    });
  });

  if (window.innerHeight >= document.body.offsetHeight) {
    sidebar.classList.add("sidebar--visible");
    observer.observe(body, observerConfig);
  } else {
    window.addEventListener('scroll', toFit(scrollAction, {}), {passive: true});
  };
});

// requestAnimationFrame
function toFit(cb, {dismissCondition = () => false, triggerCondition = () => true}) {
  if (!cb) {
    throw Error('Invalid required arguments')
  };

  let tick = false;

  return function() {
    if (tick) {
      return;
    };
    tick = true;
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      };
      if (triggerCondition()) {
        tick = false;
        return cb();
      };
    });
  };
}

// MutationObserver
let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    // console.log(mutation);
  });
});

let observerConfig = {
  attributes: true,
  childList: true,
  characterData: true,
};

// fade in & out
// function fadeOut(el){
//   el.style.opacity = 1;

//   (function fade() {
//     if ((el.style.opacity -= .1) < 0) {
//       el.style.display = "none";
//     } else {
//       requestAnimationFrame(fade);
//     }
//   })();
// }

// function fadeIn(el, display){
//   el.style.opacity = 0;
//   el.style.display = display || "block";

//   (function fade() {
//     var val = parseFloat(el.style.opacity);
//     if (!((val += .1) > 1)) {
//       el.style.opacity = val;
//       requestAnimationFrame(fade);
//     }
//   })();
// }

// // modal open
// function openModal(t) {
//   let el = document.querySelector("." + t);

//   if (el) {
//     fadeIn(el);
//   } else {
//     return;
//   };
// }


$(function(){

  // tab on/off
  const tabUiClick = () => {
    let $tabBox = $('.tab_ui');
    for(let tabNum = 0; tabNum < $tabBox.length ; tabNum++){ // tab_ui 개별 제어
      tabFunc($tabBox[tabNum]);
    }
    function tabFunc(tab){
      $(tab).find('.tabs .btn').on("click", function(){
        let $thisTab = $(this).closest('li'),
            _tabIndex = $thisTab.index(),
            $tabInfo = $(tab).next().find('.tab_ui_inner').eq(_tabIndex);
        if($thisTab.hasClass("on") == false){
          $thisTab.addClass("on").siblings().removeClass("on");
          $tabInfo.addClass("view").siblings().removeClass("view");
        }
        return false;
      });
    }
  }
  // 아코디언 
  const accordionUiList = (e) =>{
    let $thisAcc = $('.acc_ui_zone');
    for(let accNum = 0; accNum < $thisAcc.length ; accNum++){ // acc_ui_zone 개별 제어
      accFunc($thisAcc[accNum]);
    }
    function accFunc(acc){
      let _openType = $(acc).data("acc-open");

      $(acc).find('.acc_btn').on("click", function(){
        let $accItem = $(this).closest('.acc_item'),
            $accInner = $accItem.find('.acc_inner'),
            $items = $accItem.siblings();

        if($(acc).find(".acc_inner:animated").length < 1){ // 열고 닫고 여러번 중독 안되게 하기 위함.
          if($accItem.hasClass("on")){
            $accItem.removeClass("on");
            $(this).find('.acc_arrow').text("상세 보기");
            $accInner.slideUp(300);
          }else{
            if(_openType == "single"){ // single
              $items.removeClass("on");
              $items.find('.acc_arrow').text("상세 보기");
              $items.find('.acc_inner').hide();
            }
            $accItem.addClass("on");
            $(this).find('.acc_arrow').text("선택됨/상세 닫기");
            $accInner.slideDown(300);
          }
        }
        return false;
      });
    }
  }
  // selectbox  
  const selectUiBox = (e) => {
    let $selectBox = $('.select_ui_zone');
    for(let _selectNum = 0; _selectNum < $selectBox.length ; _selectNum++){ // acc_ui_zone 개별 제어
      selectFunc($selectBox[_selectNum]);
    }
    function selectFunc(select){
      $(select).find('.selected_btn').on("click",function(){
        let $thisSelect = $(this).closest('.select_ui_zone'),
            $selectList = $thisSelect.find('.select_inner');
        if($thisSelect.hasClass("disabled")) { // 클릭 막기
          _thisEvent.preventDefault
          return false;
        }
        if($thisSelect.find(".select_inner:animated").length < 1){ // 열고 닫고 여러번 중독 안되게 하기 위함.
          if($thisSelect.hasClass("open")){
            $thisSelect.removeClass("open");
            $selectList.slideUp(200);
            $(this).html($(this).data("default-text"));
          }else{
            $thisSelect.addClass("open").siblings().removeClass("open");
            $thisSelect.siblings().find('.select_inner').hide();
            $selectList.slideDown(200);
          }
          optSelect($thisSelect);     
          selectClosed($thisSelect); // 다른 영역 클릭 시 닫기
        }
        return false;
      });
      function optSelect(_list){ // option 클릭
        let $openBtn = $(_list).find('.selected_btn');
        let $thisOpt = $(_list).find('.opt_list');
        $thisOpt.off().on("click", function(_thisEvent){
          let _optClone = $(this).html();
          if($(this).hasClass("disabled")){ // 품절 제품 막기
            _thisEvent.preventDefault
            return false;
          }
          $openBtn.html(_optClone);
          $(_list).removeClass("open");
          $(_list).find('.select_inner').slideUp(200);
          return false;
        });
      }

      // 해당 select 외에 다른 영역 클릭 시 닫기
      function selectClosed($zone){
        $(document).off().on('click', function(event) {
          let $selectChk = $(event.target).closest('.select_ui_zone');
          if($selectChk.length == 0){
            $zone.removeClass("open");
            $zone.find('.select_inner').slideUp(200);
          }
        });
      }
    }
  }
  // count 수량
  const prdCount = (e) =>{ // 제품 수량 체크
    let $countWrap = $(e).find('.count_box');

    $countWrap.find('button').on("click",function(){
      let $thisWrap = $(this).parent(),
          $inputCount = $thisWrap.find('.count'),
          $price = $thisWrap.find('.price'),
          _count = $inputCount.val();

      if($(this).hasClass("minus")){ // 감소
        _count--;
        countChk(_count);
      }else{ // 증가
        _count++;
        countChk(_count);
      }
      function countChk(){
        if(_count < 1){ _count = 1;
        }else if(_count >= 100 ){ // 수량 증가 제한
          _count = 99
        }
      }
      $inputCount.val(_count);
      return false;
    });
  }

  tabUiClick(); // 탭 
  accordionUiList(); // 아코디언
  selectUiBox();
  
});