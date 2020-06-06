function popUFs() {
  const stateSelect = document.querySelector("select[name=uf");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {
      return res.json();
    })
    .then((states) => {
      for (const state of states) {
        stateSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

popUFs();
//servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

function getCities(event) {
  const citiesSelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector('input[name=state]');
  const ufValue = event.target.value;

  
  const indexState = event.target.selectedIndex; // index da listagem do estado selecionado
  stateInput.value = event.target.options[indexState].text; // texto do evento do estado selecionado

  // api para listage dos municipios por uf
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  //inicia ou reinicia default
  citiesSelect.innerHTML = '';
  citiesSelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
        console.log(cities);
      for (const city of cities) {
        citiesSelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`;
      }
      citiesSelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
