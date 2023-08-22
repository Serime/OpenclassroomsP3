const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
let modal_create = false
closeModal.addEventListener("click", closeModalClick);

function closeModalClick() {
  modal.setAttribute("class","modal-wrapper display-none");
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");

  modal.setAttribute("style","");
}

function modifyButtonClick() {
  modal.setAttribute("class","modal-wrapper");
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
}

function displayWorksBis(works) {

  const gallery = document.getElementById("gallery-modal");

  works.forEach(work => {
    const newWork = document.createElement("figure");
    const newImg = document.createElement("img");
    const newSpan = document.createElement("span");
    const newSpanText = document.createTextNode("éditer");

    newSpan.appendChild(newSpanText);
    newWork.setAttribute("class", "work");
    newWork.setAttribute("id", work.categoryId);
    newImg.setAttribute("src", work.imageUrl);
    newImg.setAttribute("alt", work.title);

    newWork.appendChild(newImg);
    newWork.appendChild(newSpan);
    gallery.appendChild(newWork);
  });
}

async function fetchAndUse(path, functionForReponse) {
  const response = await fetch(API_URL + path);
  const responseJson = await response.json();
  functionForReponse(responseJson);
}

if (localStorage.getItem("token") && modal_create === false)
{
  modal_create = true;
  const modifyGallery = document.getElementById("modify-gallery");
  modifyGallery.setAttribute("class","")
  modifyGallery.addEventListener("click", modifyButtonClick);
  
  fetchAndUse("works", displayWorksBis);
}