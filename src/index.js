const categoriesSet = new Set(); 

function filterWorks() {
  const works = document.getElementsByClassName("work");

  for (let index = 0; index < works.length; index++) {

    const work = works[index];
    console.log(work);
    console.log(work.attributes);
    console.log(work.getAttribute("category"));
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

function filterButtonClick() {

  if (this.className === "active")
  {
    categoriesSet.delete(this.id);
    this.className = "inactive";
  }
  else
  {
    categoriesSet.add(this.id);
    this.className = "active";

    //Si sélection d'une catégorie ET et de la catégorie "Tous"
    if (categoriesSet.size > 1 && categoriesSet.has("0"))
    {
      if(this.id === "0")//Sélection de "Tous" suppression des autres
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

function closeModalClick() {
  modal.setAttribute("class","modal display-none");
  modal.setAttribute("aria-hidden", true);
  modal.removeAttribute("aria-modal");

  modal.setAttribute("style","");
}

function modifyButtonClick() {
  modal.setAttribute("class","modal");
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
}

function displayWorks(works) {

  const gallery = document.getElementById("gallery");

  works.forEach(work => {
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
  });
}

function displayWork(work) {

  const gallery = document.getElementById("gallery");

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

function displayCategoriesButtons(categories) {

  const filter = document.getElementById("filter-buttons");
  const newButtons = document.createElement("button");
  const newTextButtons = document.createTextNode("Tous");

  newButtons.appendChild(newTextButtons);
  newButtons.setAttribute("id", "button-cat-0");
  newButtons.setAttribute("id", "0");
  newButtons.setAttribute("class", "active");
  filter.appendChild(newButtons);

  newButtons.addEventListener("click", filterButtonClick);
  categoriesSet.add("0");
  
  const categorySelect = document.getElementById('category');

  categories.forEach(categorie => {
    const newButtons = document.createElement("button");
    const newTextButtons = document.createTextNode(categorie.name);

    newButtons.appendChild(newTextButtons);
    newButtons.setAttribute("id", "button-cat-" + categorie.id);
    newButtons.setAttribute("id", categorie.id);
    filter.appendChild(newButtons);

    newButtons.addEventListener("click", filterButtonClick);

    
    const optionSelect = document.createElement("option");
    optionSelect.value = categorie.id;
    optionSelect.text = categorie.name;
    categorySelect.add(optionSelect, null);
  });
}

fetchAndUse("works", displayWorks);
fetchAndUse("categories", displayCategoriesButtons);