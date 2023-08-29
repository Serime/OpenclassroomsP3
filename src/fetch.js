const initGetJson = {
  method: "GET",
  headers: {'Content-Type': 'application/json;charset=utf-8'},                   
};

const initPostJson = {
  method: "POST",
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  body: null,
};

const initPostFormData = {
  method: "POST",
  body: null,
  headers: {
    Authorization: null,
  },                     
};

const initDelete = {
  method: "DELETE",
  headers: {
    Authorization: null,
  },                     
};

async function fetchAPI(path, init, functionResponseOK, functionResponseKO = null) {
  const response = await fetch(API_URL + path, init);
  let responseJson = (init.method !== "DELETE" ? await response.json() : null) 
  if (!response.ok && functionResponseKO)
  {
    functionResponseKO()      
  }
  else
  {
    responseJson ? functionResponseOK(responseJson) : functionResponseOK();
  }
}