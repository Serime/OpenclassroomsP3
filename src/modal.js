const modal = document.getElementById("modal");
const closeButton1 = document.getElementById("close-1");
const closeButton2 = document.getElementById("close-2");
const returnButton = document.getElementById("return-modal");
const addWorkModalButton = document.getElementById("add-work-modal");
const addWorkButton = document.getElementById("add-work");
const file = document.getElementById("file");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const imgFile = document.getElementById("img-file");
closeButton1.addEventListener("click", clickClose);
closeButton2.addEventListener("click", clickClose);
returnButton.addEventListener("click", clickReturn);
modal.addEventListener("click", clickOut);
addWorkModalButton.addEventListener("click", clickAddWork);
addWorkButton.addEventListener("click", addWork);
const modalGallery = document.getElementById("modal-gallery");
const modalAddWork = document.getElementById("modal-add-work");
let modal_create = false
let token;

function clickAddWork() {
  modalGallery.style.display = "none";
  modalAddWork.style.display = "flex";
}

function clickReturn() {
  modalGallery.style.display = "flex";
  modalAddWork.style.display = "none";
}

function clickOut(event) {
  if (event.target.id === "modal")
  {
    clickClose()
  }
}

function clickClose() {
  modal.setAttribute("class","modal-wrapper display-none");
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");
  modal.removeAttribute("open", "");
  modal.setAttribute("style","");
}

function modifyButtonClick() {
  modal.setAttribute("class","modal-wrapper");
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("open", "");
}

function clickTrash(event) {
  deleteWork(event.target.id)
}

function displayWorksBis(works) {
  
  const gallery = document.getElementById("gallery-modal");

  works.forEach(work => {
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
    newIcon.addEventListener("click", clickTrash);
    newWork.appendChild(newIconHover);
    newWork.appendChild(newIcon);
    newWork.appendChild(newImg);
    newWork.appendChild(newSpan);
    gallery.appendChild(newWork);    
  });
}

function displayWorkBis(work) {
  const gallery = document.getElementById("gallery-modal");

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
  newIcon.addEventListener("click", clickTrash);
  newWork.appendChild(newIconHover);
  newWork.appendChild(newIcon);
  newWork.appendChild(newImg);
  newWork.appendChild(newSpan);
  gallery.appendChild(newWork);     
}

function addWork() {
  const formData = new FormData();

  var myInitFormData = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },                     
  };

  formData.append("image", file.files[0]);
  formData.append("title", titleInput.value);
  formData.append("category", categoryInput.value);
  for (const value of formData.values()) {
    console.log(value);
  }
  console.log(myInitFormData.headers.Authorization);
  fetchAddWork("works", myInitFormData);
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
        imagePreviewContainer.innerHTML = '';
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

function inputAddWorkChange()
{
  if (file.value && titleInput.value && categoryInput.value)
  {
    addWorkButton.removeAttribute("disabled");
  }
}

function deleteWork(id) {
  const formData = new FormData();

  var myInitFormData = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },                     
  };
  
  fetchDeleteWork(`works/${id}`, myInitFormData, id);

  console.log(modalGallery);
}

function logout() {
  localStorage.clear();
  location.reload();
}

var initGetJson = {
  method: "GET",
  headers: {'Content-Type': 'application/json;charset=utf-8'},                   
};

if (localStorage.getItem("token") && modal_create === false)
{
  token = localStorage.getItem("token");
  modal_create = true;
  const modifyGallery = document.getElementById("modify-gallery");
  modifyGallery.setAttribute("class","")
  modifyGallery.addEventListener("click", modifyButtonClick);
  
  //fetchAndUse("works", displayWorksBis);
  fetchAPI("works", initGetJson, displayWorksBis);
  modalAddWork.style.display = "none";

  const headerEdition = document.getElementById("header-edition");
  headerEdition.setAttribute("class", "");

  const loginLogoutLink = document.getElementById("login-logout");
  loginLogoutLink.setAttribute("href", "/");
  loginLogoutLink.innerHTML = "logout";
  loginLogoutLink.addEventListener('click', logout);
}

