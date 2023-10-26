window.onload = (event) => {
    let hideShowButton = document.querySelector(".button-hide");

    function checkHideShow(fn) {
        let show = false;
        return function () {
            fn.call(this, show);
            if (!show) {
                show = true;
            } else {
                show = false;
            }
        }
    }

    hideShowButton.onclick = checkHideShow(
        function (show) {
            let hideShowText = document.querySelector(".button-hide__text");
            let hideShowIcon = document.querySelector(".button-hide__image");
            let hidableButtons = Array.from(document.getElementsByClassName("tab__button--hidable"));
            if (show === false) {
                hideShowText.textContent = "Скрыть";
                hideShowIcon.src = "img/icon_hide.svg";
                hidableButtons.forEach(function (elem) {
                    elem.style.cssText = "display: flex";
                });
            } else {
                hideShowText.textContent = "Показать все";
                hideShowIcon.src = "img/icon_expand.svg";
                hidableButtons.forEach(function (elem) {
                    elem.style.cssText = "display: none";
                });
            }
        });

    let init = false;
    let swiper;

    function swiperCard() {
        if (window.innerWidth <= 450) {
            if (!init) {
                init = true;
                swiper = new Swiper(".swiper", {
                    direction: "horizontal",
                    slidesPerView: 1,
                    centeredSlides: true,
                    spaceBetween: 1,
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: false,
                        setWrapperSize: false,
                    },
                });
            }
        } else if (init) {
            console.log("ran");
            swiper.destroy();
            init = false;
        }
    }

    function addSwiper() {

        //console.log("ran");button-hide
        let hideButton = document.querySelector(".button-hide");
        hideButton.remove();
        let gridContainer = document.querySelector(".grid");
        let swiperContainer = document.createElement("div");
        swiperContainer.setAttribute("class", "swiper");
        let swiperWrapper = document.createElement("div");
        swiperWrapper.setAttribute("class", "swiper-wrapper");
        let gridChildren = Array.from(document.getElementsByClassName("tab__button"));
        gridChildren.forEach(function (elem) {
            swiperWrapper.appendChild(elem);
            elem.classList.add("swiper-slide");
        });
        swiperContainer.appendChild(swiperWrapper);
        let swiperPagination = document.createElement("div");
        swiperPagination.setAttribute("class", "swiper-pagination");
        swiperContainer.appendChild(swiperPagination);
        gridContainer.replaceWith(swiperContainer);
        swiperCard();

    }

    function onlyOnce(fn) {
        let ran;
        //console.log(ran);
        return function () {
            if (fn && (window.innerWidth <= 450)) {
                ran = fn.apply(this, arguments);
                fn = null;
            }
            return fn;
        }
    }

    const addSwiperOnce = onlyOnce(addSwiper);
    //window.addEventListener("resize", swiperCard);
    window.addEventListener("resize", addSwiperOnce);

}



