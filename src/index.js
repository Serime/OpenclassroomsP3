const API_URL = "http://localhost:5678/api/"

function displayWorks(works) {

  const gallery = document.getElementById("gallery")

  works.forEach(work => {
    const newWork = document.createElement("figure");
    const newImg = document.createElement("img");
    const newFigcaption = document.createElement("figcaption");
    const newFigcaptionText = document.createTextNode(work.title);

    newFigcaption.appendChild(newFigcaptionText);
    newImg.setAttribute("src", work.imageUrl);
    newImg.setAttribute("alt", work.title);

    newWork.appendChild(newImg);
    newWork.appendChild(newFigcaption);
    gallery.appendChild(newWork);

  });
}

async function fetchTest() {
  const response = await fetch(API_URL + "works");
  const works = await response.json();
  displayWorks(works);
}

fetchTest();
