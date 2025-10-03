// Fonction pour définir un cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Fonction pour récupérer un cookie
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Fonction pour appliquer le thème au chargement
function applySavedTheme() {
  let savedTheme = getCookie("theme") || localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

// Fonction pour changer le thème avec le bouton
function toggleTheme() {
  var element = document.body;
  element.classList.toggle("dark-mode");

  // Déterminer le thème actuel
  let currentTheme = element.classList.contains("dark-mode") ? "dark" : "light";

  // Sauvegarder dans localStorage
  localStorage.setItem("theme", currentTheme);

  // Sauvegarder aussi dans un cookie valable 7 jours
  setCookie("theme", currentTheme, 7);
}

// Appliquer le thème dès le chargement de la page
window.onload = applySavedTheme;
