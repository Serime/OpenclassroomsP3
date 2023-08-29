var initGetJson = {
  method: "GET",
  headers: {'Content-Type': 'application/json;charset=utf-8'},                   
};

async function fetchAndUse(path, functionForReponse) {
  const response = await fetch(API_URL + path);
  const responseJson = await response.json();
  functionForReponse(responseJson);
}

async function fetchAddWork(path, myInit) {
  const response = await fetch(API_URL + path, myInit);
  const responseJson = await response.json();
  if (response.ok)
  {
    displayWorkBis(responseJson);
    displayWork(responseJson);
    clickReturn();
  }
}

async function fetchDeleteWork(path, myInit, id) {
  const response = await fetch(API_URL + path, myInit);
  if (response.ok)
  {
    const workModal = document.getElementById(`work-modal-${id}`);
    const workGallery = document.getElementById(`work-gallery-${id}`);
    workModal.remove();
    workGallery.remove();
  }
}

async function fetchAPI(path, myInit = undefined, functionResponseOK, functionResponseKO) {
  const response = await fetch(API_URL + path, myInit);
  const responseJson = await response.json();
  if (response.ok)
  {
    functionResponseOK ? functionResponseOK(responseJson) : null;
  }
  else
  {
    functionResponseOK ? functionResponseKO() : null;
  }
}