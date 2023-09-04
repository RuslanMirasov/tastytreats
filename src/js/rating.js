const ratings = document.querySelectorAll('.rating');
if (ratings.length > 0) {
  initRatings();
}

export function initRatings() {
  let ratingActive, ratingValue;
  ratings.forEach(rating => {
    initRating(rating);
  });

  function initRating(rating) {
    initRatinVars(rating);
    setRatingActiveWidth();

    if (rating.classList.contains('rating--set')) {
      setRating(rating);
    }
  }

  function initRatinVars(rating) {
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActivWidth = index / 0.05;
    ratingActive.style.width = `${ratingActivWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item');
    ratingItems.forEach(ratingItem => {
      ratingItem.addEventListener('mouseenter', function (e) {
        initRatinVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener('mouseleave', function (e) {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener('click', function (e) {
        initRatinVars(rating);
        ratingValue.innerHTML = `${this.value}.0`;
        setRatingActiveWidth();
      });
    });
  }
}
