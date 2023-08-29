const modalWrapper = document.getElementById("modal-wrapper");

function openModal() {
  modalWrapper.style.display = "block";
  modalWrapper.setAttribute("class","modal-wrapper");
  modalWrapper.removeAttribute("aria-hidden");
  modalWrapper.setAttribute("aria-modal", "true");
  modalWrapper.setAttribute("open", "");
}


const closeButton1 = document.getElementById("close-1");
const closeButton2 = document.getElementById("close-2");
closeButton1.addEventListener("click", closeModal);
closeButton2.addEventListener("click", closeModal);

function closeModal() {
  modalWrapper.style.display = "none";
  modalWrapper.setAttribute("aria-hidden", true);
  modalWrapper.removeAttribute("aria-modal");
  modalWrapper.removeAttribute("open", "");
  modalWrapper.setAttribute("style","");
}

modalWrapper.addEventListener("mousedown", testClickOutModal);

function testClickOutModal(event) {
  if (event.target.id === "modal-wrapper")
  {
    closeModal()
  }
}

const addWorkModalButton = document.getElementById("add-work-modal");
addWorkModalButton.addEventListener("click", openModalAddWork);
const returnButton = document.getElementById("return-modal");
returnButton.addEventListener("click", returnModalGallery);
const modalGallery = document.getElementById("modal-gallery");
const modalAddWork = document.getElementById("modal-add-work");

function openModalAddWork() {
  modalGallery.style.display = "none";
  modalAddWork.style.display = "flex";
}

function returnModalGallery() {
  modalGallery.style.display = "flex";
  modalAddWork.style.display = "none";
}


const galleryModal = document.getElementById("gallery-modal");

function displayWorkModal(work) {
  const newWork = document.createElement("figure");
  const newImg = document.createElement("img");
  const newSpan = document.createElement("span");
  const newSpanText = document.createTextNode("éditer");
  const newIcon = document.createElement("i");
  const newIconHover = document.createElement("i");

  newSpan.appendChild(newSpanText);
  newWork.setAttribute("class", "work");
  newWork.setAttribute("id", `work-modal-${work.id}`);
  newImg.setAttribute("src", work.imageUrl);
  newImg.setAttribute("alt", work.title);
  newIcon.setAttribute("class", "fa-solid fa-trash-can");
  newIcon.setAttribute("id", work.id);
  newIcon.style = "color: #ffffff;";
  newIconHover.setAttribute("class", "fa-solid fa-arrows-up-down-left-right");
  newIconHover.style = "color: #ffffff;";
  newIcon.addEventListener("click", deleteWork);
  newWork.appendChild(newIconHover);
  newWork.appendChild(newIcon);
  newWork.appendChild(newImg);
  newWork.appendChild(newSpan);
  galleryModal.appendChild(newWork);     
}

function displayWorksModal(works) {
  works.forEach(work => {
    displayWorkModal(work);
  });
}

function addWorkOK(responseJson) {
  displayWorkModal(responseJson);
  displayWork(responseJson);
  returnModalGallery();
}


const file = document.getElementById("file");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");

function addWork() {
  const formData = new FormData();
  initPostFormData.body = formData; 
  formData.append("image", file.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categoryInput.value);
  initPostFormData.headers.Authorization = `Bearer ${token}`
  fetchAPI("works", initPostFormData, addWorkOK);
}

function previewImage() {
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];
  const imagePreviewContainer = document.getElementById('img-file-container');
  
  if(file.type.match('image.*')){
    const reader = new FileReader();
    
    reader.addEventListener('load', function (event) {
      const imageUrl = event.target.result;
      const image = new Image();
      
      image.addEventListener('load', function() {
        imagePreviewContainer.innerHTML = "";
        imagePreviewContainer.appendChild(image);
      });
      
      image.src = imageUrl;
      image.style.height = '150px'; 
      image.style.width = 'auto';
      inputAddWorkChange();
    });
    
    reader.readAsDataURL(file);
  }
}


const addWorkButton = document.getElementById("add-work");
addWorkButton.addEventListener("click", addWork);

function inputAddWorkChange()
{
  if (file.value && titleInput.value && categoryInput.value)
  {
    addWorkButton.removeAttribute("disabled");
  }
  else
  {
    console.log("disabled");
    addWorkButton.setAttribute("disabled", "");
  }
}


let lastIdWorkDelete = 0;

function deleteWorkOK () {
  const workGalleryModal = document.getElementById(`work-modal-${lastIdWorkDelete}`);
  const workGallery = document.getElementById(`work-gallery-${lastIdWorkDelete}`);
  workGalleryModal.remove();
  workGallery.remove();
}

function deleteWork(event) {
  lastIdWorkDelete = event.target.id;
  initDelete.headers.Authorization = `Bearer ${token}`
  fetchAPI(`works/${lastIdWorkDelete}`, initDelete, deleteWorkOK);
}

function modalInit() {
  const modifyGalleryButton = document.getElementById("modify-gallery");
  modifyGalleryButton.style.display = "block";
  modifyGalleryButton.addEventListener("click", openModal);
  
  const loginLogoutLink = document.getElementById("login-logout");
  loginLogoutLink.setAttribute("href", "/");
  loginLogoutLink.innerHTML = "logout";
  loginLogoutLink.addEventListener('click', logout);

  modalAddWork.style.display = "none";  
}
