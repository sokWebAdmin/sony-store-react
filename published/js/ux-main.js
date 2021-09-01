$(function(){
  console.log("ux-main.js loaded")

  const evWrap = document.querySelector(".event__wrapper");
  const breakpoint1 = 1280;
  const breakpoint2 = 640;
  let device = window.innerWidth > breakpoint1 ? "pc" : "mo";

  // key visual swiper 생성 전 슬라이드 별 bg/video 설정, copy 설정
  const kv = document.querySelector(".kv");
  let slides = kv.querySelectorAll(".swiper-slide");

  slides.forEach(elem => {
    let copy = elem.querySelectorAll(".kv__head__copy");

    copy.forEach(copy => {
      let text = copy.innerHTML;

      text = text.split(" ");
      copy.textContent = "";
      for (let i = 0; i < text.length; i++) {
        let span = document.createElement("span");
        let innerSpan = document.createElement("span");

        innerSpan.textContent = text[i];
        span.appendChild(innerSpan);
        copy.appendChild(span);
      };
    });

    let spans = elem.querySelectorAll(".kv__head__copy>span");

    for (let i = 0; i < spans.length; i++) {
      spans[i].classList.add("copy-" + i);
    };

    // video slide or bg-image
    if (elem.classList.contains("video-slide")) {
      let autoplayDuration = elem.getAttribute("data-swiper-autoplay");
      let player = elem.querySelector(".video-slide-player");
      let video = player.getAttribute("data-video-" + device);

      player.setAttribute("src", video);
      setTimeout(() => {
        if (autoplayDuration !== null) {
          if (Number.isNaN(autoplayDuration) || autoplayDuration === "") {
            let duration = player.duration * 1000;

            if (Number.isNaN(duration)) {
              elem.setAttribute("data-required-duration", true);
            } else {
              elem.setAttribute("data-swiper-autoplay", duration);
            };
          };
        };
      }, 100);
    } else {
      let bg = elem.getAttribute("data-bg-" + device);
      
      elem.setAttribute("style", "background-image:url('"+bg+"');");
    };
  });

  // keyvisual swiper
  const kvSwiper = () => {
    let isProgress = false;
    let isEvent = false;
    let isMousemove = false;
    let isClick = false;
    let activeClass;
    let checkClass;
    const kvSwiper = new Swiper(kv, {
      loop: true,
      observer: true,
      resizeObserver: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "custom",
        renderCustom: (swiper, current, total) => {
          let _current = current;
          let _total = total;

          if (current < 10) _current = "0" + current;
          if (total < 10) _total = "0" + total;

          return "<span class='swiper-pagination-current'>No. "+_current+"</span>" + "<span class='swiper-pagination-total'>"+_total+"</span>";
        },
      },
      on: {
        init: swiper => {
          let activeSlide = swiper.slides[swiper.activeIndex];

          activeSlide.classList.add("loading");
          setTimeout(() => {
            activeSlide.classList.remove("loading");
          }, 100);
          swiper.slides.forEach(elem => {
            if (elem.classList.contains("video-slide") && !elem.classList.contains("swiper-slide-active")) {
              let player = elem.querySelector(".video-slide-player");

              player.pause();
            };
          });
        },
        resize: swiper => {
          let currentDevice = window.innerWidth > breakpoint1 ? "pc" : "mo";

          if (device !== currentDevice) {
            device = currentDevice;
            swiper.slides.forEach(elem => {
              if (elem.classList.contains("video-slide")) {
                let player = elem.querySelector(".video-slide-player");
                let video = player.getAttribute("data-video-" + device);
  
                player.setAttribute("src", video);
              } else {
                let bg = elem.getAttribute("data-bg-" + device);
                
                elem.setAttribute("style", "background-image:url('"+bg+"');");
              };
            });
          };
        },
        slideChange: swiper => {
          swiper.slides.forEach(elem => {
            if (elem.classList.contains("video-slide")) {
              let requireDuration = elem.getAttribute("data-required-duration");
              
              if (requireDuration) {
                let player = elem.querySelector(".video-slide-player");
                let duration = player.duration * 1000;

                if (!Number.isNaN(duration)) {

                  elem.setAttribute("data-swiper-autoplay", duration);
                  elem.removeAttribute("data-required-duration");
                };
              };
            };
          });
        },
        slideChangeTransitionEnd: swiper => {
          swiper.slides.forEach(elem => {
            if (elem.classList.contains("video-slide")) {
              let player = elem.querySelector(".video-slide-player");

              if (elem.classList.contains("swiper-slide-active")) {
                player.load();
              } else {
                if (!player.paused) {
                  player.pause();
                };
              };
            };
          });
        },
      },
    });

    if (window.innerWidth > breakpoint1) {
      kv.addEventListener("mouseenter", e => {
        kvMouseEvent(e);
      });
      kv.addEventListener("mouseleave", () => {
        if (isEvent) {
          if (isMousemove) {
            kv.removeEventListener("mousemove", kvMousemove);
            isMousemove = false;
          };
          if (isClick) {
            kv.removeEventListener("click", kvClick);
            isClick = false;
          };
          kv.classList.remove("hover-prev", "hover-next");
          isEvent = false;
        };
      });
    };
    kvSwiper.on("transitionEnd", () => {
      isProgress = false;
    });
    function kvMouseEvent(e) {
      if (!isEvent) {
        if (!isMousemove) {
          kv.addEventListener("mousemove", kvMousemove);
          isMousemove = true;
        };
        if (!isClick) {
          kv.addEventListener("click", kvClick, {
            capture: true,
          });
          isClick = true;
        };
        isEvent = true;
      };
    }

    // mousemove
    function kvMousemove(e) {
      let halfWidth = kv.offsetWidth / 2;

      if (e.offsetX < halfWidth) {
        activeClass = "hover-prev";
      } else {
        activeClass = "hover-next";
      };
      if (activeClass !== checkClass){
        kv.classList.forEach(i => {
          if (i.startsWith('hover-')) {
            kv.classList.remove(i);
          };
        });
        kv.classList.add(activeClass);
        checkClass = activeClass;
      };
    }

    // click
    function kvClick(e) {
      if (!isProgress && !e.target.classList.contains("kv__link")) {
        if (activeClass === "hover-prev" && !kvSwiper.isBeginning) {
          kvSwiper.slidePrev();
          isProgress = true;
        } else if (activeClass === "hover-next" && !kvSwiper.isEnd) {
          kvSwiper.slideNext();
          isProgress = true;
        };
      };
    }
  }

  // recommended
  const recommSwiper = () => {
    const recomm = document.querySelector(".recommend__swiper");
    const recommBg = document.querySelector(".recommend__bg__swiper");
    const speed = 600;
    const recommBgSwiper = new Swiper(recommBg, {
      slidesPerView: 1.000000001,
      observer: true,
      resizeObserver: true,
      loop: true,
      speed: speed,
      spaceBetween: 0,
      on: {
        init: swiper => {
          let device, bg;
          
          swiper.slides.forEach(elem => {
            if (window.innerWidth > breakpoint1) {
              device = "pc";
            } else {
              device = "mo";
            };
            bg = elem.getAttribute("data-bg-" + device);
            elem.setAttribute("style", "background-image:url('" + bg + "')");
          });
        },
        resize: swiper => {
          swiper.update();
        },
      },
    });

    const recommSwiper = new Swiper(recomm, {
      slidesPerView: 1.5,
      observer: true,
      resizeObserver: true,
      loop: true,
      speed: speed,
      spaceBetween: 157,
      allowTouchMove: true,  // disable swipe action
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          spaceBetween: 50,
          allowTouchMove: true,
        },
        641: {
          slidesPerView: 1.8,
          spaceBetween: 92,
          allowTouchMove: true,
        },
        1281: {
          slidesPerView: 1.5,
          spaceBetween: 110,
          allowTouchMove: false,
        },
        1600: {
          slidesPerView: 1.5,
          spaceBetween: 157,
          allowTouchMove: false,
        },
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: false,
      },
      on: {
        init: swiper => {
          swiper.update();
        },
        resize: swiper => {
          swiper.update();
        },
        update: swiper => {
          isSlideNext(swiper);
        },
      },
    });

    function isSlideNext(swiper) {
      let isDesktop = window.innerWidth > breakpoint1;

      if (isDesktop) {
        $(swiper.el).find("a").on("click", function(event) {
          let nextSlide = $(this).closest(".swiper-slide").hasClass("swiper-slide-next");

          if (nextSlide) {
            event.preventDefault();
            swiper.slideNext();
          }
        })
      } else {
        $(swiper.el).find("a").off("click");
      };
    }
    recommSwiper.controller.control = recommBgSwiper;
    recommBgSwiper.controller.control = recommSwiper;
  };

  // event 1
  const eventSwiper = () => {
    const event = document.querySelector(".event__main");
    const eventSwiper = new Swiper(event, {
      slidesPerView: 1,
      loop: true,
      observer: true,
      resizeObserver: true,
      speed: 600,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
      },
      on: {
        init: () => {
          setBg();
        },
      },
    });
    function setBg() {
      let bg;

      if (window.innerWidth > breakpoint1) {
        bg = evWrap.getAttribute("data-bg-pc");
      } else {
        bg = evWrap.getAttribute("data-bg-mo");
      };
      evWrap.setAttribute("style", "background-image:url('" + bg + "')");
    };
  }

  // event 2
  const subEventSwiper = () => {
    const event = document.querySelector(".event__sub");

    const subEventSwiper = new Swiper(event, {
      slidesPerView: 3,
      centeredSlides: false,
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          centeredSlides: true,
          spaceBetween: 15,
        },
        640: {
          slidesPerView: 1.2,
          centeredSlides: true,
          spaceBetween: 24,
        },
        1281: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 15,
        },
        1366: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 15,
        },
        1600: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 24,
        },
      },
      // lazy: true,
      observer: true,
      resizeObserver: true,
      speed: 600,
      spaceBetween: 24,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: false,
      },
    });
  }

  // banner
  const mainBanner = () => {
    const banner = document.querySelector(".main__banner");
    let bg;

    if (window.innerWidth > breakpoint1) {
      bg = banner.getAttribute("data-bg-pc");
    } else if (window.innerWidth <= breakpoint1 && window.innerWidth > breakpoint2) {
      bg = banner.getAttribute("data-bg-tab");
    } else {
      bg = banner.getAttribute("data-bg-mo");
    };
    banner.setAttribute("style", "background-image:url('" + bg + "')");
  }

  kvSwiper();
  recommSwiper();
  eventSwiper();
  subEventSwiper();
  mainBanner();

  // addEventListeners.
  window.addEventListener("resize", mainBanner);
});