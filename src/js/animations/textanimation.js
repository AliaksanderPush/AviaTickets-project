export const texAnimation = (animations) => {
  if (animations.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    if (
      "ontouchmove" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
      window.addEventListener("touchmove", animOnScroll);
    }

    function animOnScroll() {
      for (let i = 0; i < animations.length; i++) {
        const animItem = animations[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = getElementPos(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add("anime");
        } else {
          if (!animItem.classList.contains("anim-no-hide")) {
            animItem.classList.remove("anime");
          }
        }
      }
    }
    setTimeout(() => {
      animOnScroll();
    }, 1000);
  }

  function getElementPos(elem) {
    const bbox = elem.getBoundingClientRect();
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      left: bbox.left + scrollLeft,
      top: bbox.top + scrollTop,
    };
  }
};
