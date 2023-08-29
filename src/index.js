const categoriesSet = new Set(); 
const works = document.getElementsByClassName("work");

function filterWorks() {
  for (let index = 0; index < works.length; index++) {
    const work = works[index];
    if (categoriesSet.has("0") || categoriesSet.has(work.getAttribute("category"))) //Catégorie "Tous" ou catégorie correspondante
    {
      work.className = "work";
    }
    else 
    {
      work.className = "work display-none";
    }
  }
}

function filterButtonClick(event) {
  if (event.target.className === "active")
  {
    categoriesSet.delete(event.target.id);
    event.target.className = "inactive";
  }
  else
  {
    categoriesSet.add(event.target.id);
    event.target.className = "active";

    //Si sélection d'une catégorie ET et de la catégorie "Tous"
    if (categoriesSet.size > 1 && categoriesSet.has("0"))
    {
      if(event.target.id === "0")//Sélection de "Tous" suppression des autres
      {
        const buttons = document.getElementsByClassName("active");

        for (let index = buttons.length - 1; index > 0; index--) {
          categoriesSet.delete(buttons[index].id);
          buttons[index].className = "inactive";
        }
      }
      else//Sélection d'une catégorie suppression de "Tous"
      {
        categoriesSet.delete("0");
        document.getElementsByClassName("active")[0].className = "inactive";
      }
    }
  }

  filterWorks();
}

const gallery = document.getElementById("gallery");

function displayWork(work) { 
  const newWork = document.createElement("figure");
  const newImg = document.createElement("img");
  const newFigcaption = document.createElement("figcaption");
  const newFigcaptionText = document.createTextNode(work.title);

  newFigcaption.appendChild(newFigcaptionText);
  newWork.setAttribute("class", "work");
  newWork.setAttribute("id", `work-gallery-${work.id}`);
  newWork.setAttribute("category", work.categoryId);
  newImg.setAttribute("src", work.imageUrl);
  newImg.setAttribute("alt", work.title);

  newWork.appendChild(newImg);
  newWork.appendChild(newFigcaption);
  gallery.appendChild(newWork);
}

function displayWorks(works) {
  works.forEach(work => {
    displayWork(work);
  });
}

const filter = document.getElementById("filter-buttons");

function initCategoriesButtons(categories) {
  let newButtons = document.createElement("button");
  let newTextButtons = document.createTextNode("Tous");

  newButtons.appendChild(newTextButtons);
  newButtons.setAttribute("id", "0");
  newButtons.setAttribute("class", "active");
  newButtons.addEventListener("click", filterButtonClick);

  filter.appendChild(newButtons);
  categoriesSet.add("0");
  
  const categorySelect = document.getElementById('category');

  categories.forEach(category => {
    newButtons = document.createElement("button");
    newTextButtons = document.createTextNode(category.name);
    newButtons.appendChild(newTextButtons);
    newButtons.setAttribute("id", category.id);
    newButtons.addEventListener("click", filterButtonClick);
    filter.appendChild(newButtons);

    //Option pour les formulaires d'ajout de work (dans le modal)
    const optionSelect = document.createElement("option");
    optionSelect.value = category.id;
    optionSelect.text = category.name;
    categorySelect.add(optionSelect, null);
  });
}

function logout() {
  localStorage.clear();
  location.reload();
}

fetchAPI("works", initGetJson, displayWorks);
fetchAPI("categories", initGetJson, initCategoriesButtons);

let modal = false;
let token;

if (modal === false && localStorage.getItem("token"))
{
  token = localStorage.getItem("token");
  modalInit();
  modal = true; 

  const headerEdition = document.getElementById("header-edition");
  headerEdition.style.display = "flex";
  
  fetchAPI("works", initGetJson, displayWorksModal);
}