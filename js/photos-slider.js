let imgs = Array.from(document.querySelectorAll(".photos-section img"));
let modalContainer = document.querySelector(".modal-container");
let imgModal = document.querySelector(".img-modal");
let closeIcon = document.querySelector(".fa-circle-xmark");
let nextIcon = document.querySelector(".fa-circle-chevron-right");
let prevIcon = document.querySelector(".fa-circle-chevron-left");

let imgIndex;

for (let i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener("click", openImgContainer);
}

function openImgContainer(e) {
  imgIndex = imgs.indexOf(e.target);

  if (imgIndex == imgs.length - 1) {
    nextIcon.style.visibility = "hidden";
  } else {
    nextIcon.style.visibility = "visible";
  }

  if (imgIndex == 0) {
    prevIcon.style.visibility = "hidden";
  } else {
    prevIcon.style.visibility = "visible";
  }

  modalContainer.style.display = "flex";
  let imgSrc = e.target.getAttribute("src");
  imgModal.style.backgroundImage = `url(${imgSrc})`;
}

modalContainer.addEventListener("click", close);

document.body.addEventListener("keyup", keyboardControls);

function keyboardControls(e) {
  if (e.code == "Escape") {
    close(e);
  } else if (e.code == "ArrowRight") {
    next();
  } else if (e.code == "ArrowLeft") {
    prev();
  }
}

closeIcon.addEventListener("click", close);
nextIcon.addEventListener("click", next);
prevIcon.addEventListener("click", prev);

function close(e) {
  if (
    e.target == modalContainer ||
    e.target == closeIcon ||
    e.code == "Escape"
  ) {
    modalContainer.style.display = "none";
  }
}

function next() {
  if (imgIndex != imgs.length - 1) {
    imgIndex++;
    if (imgIndex == imgs.length - 1) {
      nextIcon.style.visibility = "hidden";
    }

    if (imgIndex != 0) {
      prevIcon.style.visibility = "visible";
    }

    let imgSrc = imgs[imgIndex].src;

    imgModal.style.backgroundImage = `url(${imgSrc})`;
  }
}

function prev() {
  if (imgIndex != 0) {
    imgIndex--;
    if (imgIndex == 0) {
      prevIcon.style.visibility = "hidden";
    }

    if (imgIndex != imgs.length - 1) {
      nextIcon.style.visibility = "visible";
    }

    let imgSrc = imgs[imgIndex].src;

    imgModal.style.backgroundImage = `url(${imgSrc})`;
  }
}
