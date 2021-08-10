$('.slider').slick({
  rows: 2,
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 2,
  slidesToScroll: 5,
  centerMode: false,
  variableWidth: true,
  arrows: true,
  adaptiveHeight: true,
  prevArrow:"<img class='l-arr arrow a-left control-c prev slick-prev' src='Assets/arrow-gray-left.png'>",
  nextArrow:"<img class='r-arr arrow a-right control-c next slick-next' src='Assets/arrow-blue-right.png'>"
});