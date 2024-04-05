const ul = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("input");
const erreursaisie = document.getElementById("erreursaisie");
const defaultImage = "img/streaming.jpg";
const serieImage = document.getElementById("serieImage");

// Fonction pour changer l'image au survol
const changeImage = (imagePath) => {
  const img = new Image();
  img.onload = () => {
    serieImage.src = imagePath;
  };
  img.onerror = () => {
    serieImage.src = defaultImage;
  };
  img.src = imagePath;
};

// Fonction pour réinitialiser l'image par défaut
const resetImage = () => {
  serieImage.src = defaultImage;
};

const series = [
  {
    name: "Breaking Bad",
    seen: false,
  },
  {
    name: "The Wire",
    seen: true,
  },

  {
    name: "lost",
    seen: true,
  },
];

const image = [
  "the shield",
  "the walking dead",
  "better call saul",
  "black mirror",
  "breaking bad",
  "broadchurch",
  "bureau des legendes",
  "game of thrones",
  "homeland",
  "lost",
  "mad men",
  "narcos",
  "sex education",
  "peaky blinders",
  "rectify",
  "sherlock",
  "sons of anarchy",
  "soprano",
  "stranger things",
  "the wire",
  "vikings",
];

// Fonction pour créer un élément de série avec gestion des événements de survol

const modecreate = false;
series.forEach((obj) => {
  obj.modecreate = modecreate;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value;
  if (input.value === "") {
    erreursaisie.classList.add("visibly");
  } else {
    elementcherche();
    erreursaisie.classList.remove("visibly");
    console.log(value);
    input.value = "";

    addSerie(value);
  }
});

const displaySeries = () => {
  const seriesNode = series.map((serie, index) => {
    return createSerieElement(serie, index);
  });
  ul.innerHTML = "";
  ul.append(...seriesNode);
  resetImage(); // Réinitialiser l'image par défaut lors de l'affichage des séries
};

const btnvu = document.querySelector(".btnvu");

btnvu.addEventListener("click", () => {
  const serievu = series.filter(function (serie) {
    return serie.seen == true;
  });

  ul.innerHTML = ""; // Réinitialiser le contenu de la liste
  serievu.forEach((serie, index) => {
    let li = createSerieElement(serie, index);
    ul.appendChild(li);
  });
});

const btnavoir = document.querySelector(".btnavoir");
btnavoir.addEventListener("click", () => {
  const serieavoir = series.filter(function (serie) {
    return serie.seen == false;
  });

  ul.innerHTML = "";
  serieavoir.forEach((serie, index) => {
    let li = createSerieElement(serie, index);
    ul.appendChild(li);
  });
});

const btntout = document.querySelector(".btntout");
btntout.addEventListener("click", () => {
  displaySeries();
});

// créer une méthode qui affiche un input avec le nom de la série et 2 boutons cancel et save

const modif = (li, series, index) => {
  const input = document.createElement("input");
  input.type = "text";
  input.value = series[index].name;

  ///////////////////////button cancel ////////////////////////////////////

  const btncancel = document.createElement("button");
  btncancel.innerText = "Cancel";

  btncancel.addEventListener("click", () => {
    erreursaisie.classList.remove("visibly");
    displaySeries();
  });

  /////////////Button save ///////////////////////////

  const btnsave = document.createElement("button");
  btnsave.innerText = "save";

  btnsave.addEventListener("click", () => {
    const newValue = input.value.trim(); // Supprimer les espaces avant et après le texte
    if (newValue === "") {
      erreursaisie.classList.add("visibly");
    } else if (
      newValue.toLowerCase() !== series[index].name.toLowerCase() &&
      elementcherche(newValue)
    ) {
      alert("L'élément existe déjà.");
    } else {
      erreursaisie.classList.remove("visibly");
      series[index].name = newValue;
      displaySeries();
    }
  });

  li.innerHTML = " ";
  li.append(input, btnsave, btncancel);
};

const createSerieElement = (serie, index) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.classList.add("todo");
  span.addEventListener("click", () => {
    toggleSerie(index);
  });

  if (serie.seen) {
    span.classList.add("done");
  }
  const p = document.createElement("p");
  p.innerText = serie.name;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Edit";

  btnEdit.addEventListener("click", () => {
    modif(li, series, index);
  });

  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Delete";
  btnDelete.classList.add("delete");
  btnDelete.addEventListener("click", () => {
    deleteSerie(index);
  });

  // Gestionnaire d'événement pour le survol de la série
  li.addEventListener("mouseover", () => {
    const imageName = serie.name.toLowerCase().replace(/\s+/g, "-");
    const seriesImage = `img/${imageName}.jpg`;
    changeImage(seriesImage);
  });

  // Gestionnaire d'événement pour arrêter de survoler la série
  li.addEventListener("mouseout", () => {
    resetImage();
  });

  li.append(span, p, btnEdit, btnDelete);
  return li;
};

const addSerie = (value) => {
  series.push({ name: value, seen: false, modecreate: false });
  displaySeries();
};

const deleteSerie = (index) => {
  console.log(index);
  series.splice(index, 1);
  displaySeries();
};

const toggleSerie = (index) => {
  console.log(index);
  series[index].seen = !series[index].seen;
  displaySeries();
};

const elementcherche = (value) => {
  const exists = series.some(
    (serie) => serie.name.toLowerCase() === value.toLowerCase()
  );
  return exists;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim(); // Supprimer les espaces avant et après le texte
  if (value === "") {
    erreursaisie.classList.add("visibly");
  } else {
    if (elementcherche(value)) {
      alert("L'élément existe déjà.");
    } else {
      erreursaisie.classList.remove("visibly");
      console.log(value);
      input.value = "";
      addSerie(value);
    }
  }
});

displaySeries();

console.log(series);
