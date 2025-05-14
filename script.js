let addedIngredients = [];
let recipeHistory = [];

function startGame() {
  const nameInput = document.getElementById("username").value.trim();
  if (nameInput === "") {
    alert("Lütfen adını yaz :) ");
  } else {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("player-name").innerText = nameInput;
  }
}

function toggleDolap() {
  const panel = document.getElementById("dolap-panel");
  panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}

function toggleSolDolap() {
  const panel = document.getElementById("sol-dolap-panel");
  panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}

function openSutPanel() {
  const panel = document.getElementById("sut-panel");
  panel.style.display = panel.style.display === "flex" ? "none" : "flex";
}

function cookRecipe() {
  const name = document.getElementById("player-name").innerText;
  const info = document.getElementById("tarif-sonucu");
  const resultImage = document.getElementById("result-image");
  const bowl = document.querySelector('.bowl');
  bowl.style.display = 'none';

  const has = (...items) => {
    const set = new Set(addedIngredients);
    const sütler = ["sut", "normal", "yulaf", "ceviz"];
    const includesSut = items.includes("sut") || sütler.some(s => set.has(s));
    return items.every(i => i === "sut" ? includesSut : set.has(i));
  };

  let result = "";
  let image = "";

  if (addedIngredients.length < 5) {
    result = "En az 5 malzeme gerekli.";
  } else if (has("un", "seker", "sut", "yumurta", "cikolata", "kabartma")) {
    result = `${name} çikolatalı pasta yaptı! 🎂`;
    image = "images/cikolatali-pasta.png";
  } else if (has("un", "seker", "sut", "yumurta", "cikolata")) {
    result = `${name} kabarmamış pasta yaptı 🙃`;
    image = "images/kabarmamis-pasta.png";
  } else if (has("un", "seker", "sut", "yumurta", "cilek", "kabartma")) {
    result = `${name} çilekli pasta yaptı! 🍓`;
    image = "images/cilekli-pasta.png";
  } else if (has("un", "seker", "sut", "yumurta", "muz", "kabartma")) {
    result = `${name} muzlu pasta yaptı! 🍌`;
    image = "images/muzlu-pasta.png";
  } else if (has("un", "seker", "elma", "kabartma")) {
    result = `${name} elmalı turta yaptı! 🍎`;
    image = "images/elmali-turta.png";
  } else {
    result = `${name} tanımlanamayan bir yemek yaptı 😅`;
    image = "images/bos-tabak.png";
  }

  info.innerText = result;
  resultImage.src = image;
  resultImage.style.display = "block";

  if (result !== "En az 5 malzeme gerekli.") {
    if (recipeHistory.length >= 3) recipeHistory.shift();
    recipeHistory.push(result);
    updateHistory();
  }
}

function updateHistory() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = "";
  recipeHistory.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
}

function updateCounter() {
  const counter = document.getElementById("malzeme-sayaci");
  if (counter) {
    counter.innerText = `Malzeme: ${addedIngredients.length} / 7`;
  }
}

function addToBowl(effectImagePath) {
  if (addedIngredients.length >= 7) {
    alert("En fazla 7 malzeme ekleyebilirsin!");
    return;
  }

  const image = document.getElementById("effect-image");
  image.src = `images/${effectImagePath}`;
  image.style.opacity = 1;

  setTimeout(() => {
    image.style.opacity = 0;
    document.getElementById("sut-panel").style.display = "none";
  }, 1000);

  const cleanName = effectImagePath.split('-')[0];
  addedIngredients.push(cleanName);
  updateCounter();
}

function resetRecipe() {
  addedIngredients = [];
  document.getElementById("tarif-sonucu").innerText = "";
  document.getElementById("result-image").style.display = "none";
  const bowl = document.querySelector('.bowl');
  bowl.style.display = 'block';
  updateCounter();
}
