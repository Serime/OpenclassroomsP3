const categoriesSet = new Set(); 
const works = document.getElementsByClassName("work");

function filterWorksByCategories() {
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

function filterCategoryButtonClick(event) {
  if (event.target.className === "active")
  {
    categoriesSet.delete(event.target.id);
    event.target.className = "inactive";
  }
  else
  {
    categoriesSet.add(event.target.id);
    event.target.className = "active";

    //Si sélection simultanée d'au moins une catégorie ET et de la catégorie "Tous" = "0"
    if (categoriesSet.size > 1 && categoriesSet.has("0"))
    {
      if(event.target.id === "0")//Sélection de "Tous" -> suppression des autres catégories
      {
        const buttons = document.getElementsByClassName("active");

        for (let index = buttons.length - 1; index > 0; index--) {
          categoriesSet.delete(buttons[index].id);
          buttons[index].className = "inactive";
        }
      }
      else//Sélection d'une catégorie -> suppression de "Tous" = "0"
      {
        categoriesSet.delete("0");
        document.getElementsByClassName("active")[0].className = "inactive";
      }
    }
  }

  filterWorksByCategories();
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

const categoriesFilterButtons = document.getElementById("filter-buttons");

//function utiliser avec la reponse JSON de l'API : GET /categories
function initCategoriesButtons(categories) {
  let newButton = document.createElement("button");
  let newTextButton = document.createTextNode("Tous");

  newButton.appendChild(newTextButton);
  newButton.setAttribute("id", "0");
  newButton.setAttribute("class", "active");
  newButton.addEventListener("click", filterCategoryButtonClick);

  categoriesFilterButtons.appendChild(newButtons);
  categoriesSet.add("0");
  
  const categorySelect = document.getElementById('category');

  categories.forEach(category => {
    newButton = document.createElement("button");
    newTextButton = document.createTextNode(category.name);
    newButton.appendChild(newTextButton);
    newButton.setAttribute("id", category.id);
    newButton.addEventListener("click", filterCategoryButtonClick);
    categoriesFilterButtons.appendChild(newButton);

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
  initModal();
  modal = true; 

  const headerEdition = document.getElementById("header-edition");
  headerEdition.style.display = "flex";
  
  fetchAPI("works", initGetJson, displayWorksModal);
}