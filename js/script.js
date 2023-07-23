const webName = document.querySelector("#name");
const url = document.querySelector("#url");
const addBtn = document.querySelector("#addBtn");
const table = document.querySelector("tbody");

const data = JSON.parse(localStorage.getItem("websites")) || [];
showAllData()

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function clearForm() {
  webName.value = '';
  url.value = '';
}



function addWebsite() {
  if (isValidUrl(url.value)) {
    alert("cool")
    const website = {
      name: webName.value,
      url: url.value,
    };
    document.querySelector(".text-danger").classList.add("d-none")
    data.push(website);
    webName.value = '';
    url.value = '';
    localStorage.setItem("websites", JSON.stringify(data))
    showData()
    clearForm();

  } else {
    document.querySelector(".text-danger").classList.remove("d-none")
  }
  
}

function showData() {
    const index = data.length - 1;
    const lastItem = data[index];

    table.innerHTML += `
      <tr>
        <td>${index}</td>
        <td>${lastItem.name}</td>
        <td>${lastItem.url}</td>
        <td>
          <a href="${lastItem.url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" data-index="${index}"></i></a>
        </td>
        <td>
            <i class="fa-solid fa-trash" data-index="${index}"></i>
        </td>
      </tr>
    `
}
function showAllData() {
  let trs = '';
  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    trs += `
      <tr>
        <td>${i}</td>
        <td>${item.name}</td>
        <td>${item.url}</td>
        <td>
        <a href="${item.url}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" data-index="${i}"></i></a>
        </td>
        <td>
            <i class="fa-solid fa-trash" data-index="${i}"></i>
        </td>
      </tr>
    `;
  }
  table.innerHTML = trs
}

function removeElement(index) {
  data.splice(index,1);
  localStorage.setItem("websites", JSON.stringify(data))
  showAllData()

}


addBtn.addEventListener("click", () => {
  addWebsite();
  console.log(data);
});



table.addEventListener("click", e => {
  if (e.target.classList.contains("fa-trash")) {
    removeElement(Number(e.target.dataset.index));
  } 
})

