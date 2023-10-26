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
            if (show === false) {
                hideShowText.textContent = "Скрыть";
                hideShowIcon.src = "img/icon_hide.svg";
                let hidableButtons = document.getElementsByClassName(".tab__button--hidable");
            } else {
                hideShowText.textContent = "Показать все";
                hideShowIcon.src = "img/icon_expand.svg";
                let hidableButtons = document.getElementsByClassName(".tab__button--hidable");
            }
        })
    ;


}



