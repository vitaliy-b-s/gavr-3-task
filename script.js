"use strict";
var multiItemSlider = (function () {
  return function (selector, config) {
    var _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector(".slider__wrapper"), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll(".slider__item"), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll(".slider__control"), // элементы управления
      _sliderControlLeft = _mainElement.querySelector(".slider__control_left"), // кнопка "LEFT"
      _sliderControlRight = _mainElement.querySelector(".slider__control_right"), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = (_itemWidth / _wrapperWidth) * 100, // величина шага (для трансформации)
      _items = []; // массив элементов
    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getMin: 0,
      getMax: _items.length - 1,
    };

    var _transformItem = function (direction) {
      if (direction === "right") {
        if (
          _positionLeftItem + _wrapperWidth / _itemWidth - 1 >=
          position.getMax
        ) {
          return;
        }
        if (!_sliderControlLeft.classList.contains("slider__control_show")) {
          _sliderControlLeft.classList.add("slider__control_show");
        }

        _positionLeftItem++;
        _transform -= _step;
      }
      if (direction === "left") {
        if (_positionLeftItem <= position.getMin) {
          return;
        }
        if (!_sliderControlRight.classList.contains("slider__control_show")) {
          _sliderControlRight.classList.add("slider__control_show");
        }

        _positionLeftItem--;
        _transform += _step;
      }
      _sliderWrapper.style.transform = "translateX(" + _transform + "%)";
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      if (e.target.classList.contains("slider__control")) {
        e.preventDefault();
        var direction = e.target.classList.contains("slider__control_right")
          ? "right"
          : "left";
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener("click", _controlClick);
      });
    };

    // инициализация
    _setUpListeners();

    return {
      right: function () {
        // метод right
        _transformItem("right");
      },
      left: function () {
        // метод left
        _transformItem("left");
      },
    };
  };
})();

var slider = multiItemSlider(".slider");

let elementsArray = document.querySelectorAll(".carusel-item");
let carusel = document.getElementById("carusel");

const step = 272.5;
const elementPerPage = 4;

let currentFirstElementIndex = 0;
let currentOffset = 0;

function moveLeft() {
  if (currentFirstElementIndex === 0) {
    return;
  } else {
    currentFirstElementIndex--;
    currentOffset = currentOffset + step;
    carusel.style.transform = `translateX(${currentOffset}px)`;
  }
}

function moveRight() {
  if (currentFirstElementIndex >= elementsArray.length - elementPerPage) {
    return;
  } else {
    currentFirstElementIndex++;
    currentOffset = currentOffset - step;
    carusel.style.transform = `translateX(${currentOffset}px)`;
  }
}

let currentPosition = 0;
let offsetSize = 0;
let currentOffsetSize = 0;
let limiter = 0;

let specifyCurrentPosition = function (event) {
  event = window.event || event;
  currentPosition = event.clientX;
  currentOffsetSize = offsetSize;
};

let dragNdrop = function (event) {
  if (event.which === 1) {
    offsetSize = currentOffsetSize - (currentPosition - event.clientX);
    carusel.style.transform = `translateX(${offsetSize}px)`;
    limiter = offsetSize;
  }
  if (limiter > 0) {
    carusel.style.transform = `translateX(0px)`;
    offsetSize = 0;
    return;
  } else if (limiter < -step * 2) {
    carusel.style.transform = `translateX(${-2 * step}px)`;
    offsetSize = -step * 2;

    return;
  }
};

let renewLimiter = function () {
  limiter = 0;
};

carusel.addEventListener("mousedown", specifyCurrentPosition);
carusel.addEventListener("mousemove", dragNdrop);
carusel.addEventListener("mouseup", renewLimiter);

let variants = document.getElementById("variants");
let variant1 = document.getElementById("variant1");
let variant2 = document.getElementById("variant2");
let variant3 = document.getElementById("variant3");
let variant4 = document.getElementById("variant4");

let changeVariant = function (event) {
  event = window.event || event;
  switch (event.target.id) {
    case "btn-variant1":
      variant1.style.opacity = 1;
      variant2.style.opacity = 0;
      variant3.style.opacity = 0;
      variant4.style.opacity = 0;
      break;
    case "btn-variant2":
      variant1.style.opacity = 0;
      variant2.style.opacity = 1;
      variant3.style.opacity = 0;
      variant4.style.opacity = 0;
      break;
    case "btn-variant3":
      variant1.style.opacity = 0;
      variant2.style.opacity = 0;
      variant3.style.opacity = 1;
      variant4.style.opacity = 0;
      break;
    case "btn-variant4":
      variant1.style.opacity = 0;
      variant2.style.opacity = 0;
      variant3.style.opacity = 0;
      variant4.style.opacity = 1;
      break;
  }
};
variants.addEventListener("click", changeVariant);
