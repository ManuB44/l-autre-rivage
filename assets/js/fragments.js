async function loadFragments() {
  const container = document.getElementById("fragments-list");
  if (!container) return;

  try {
    const response = await fetch("/L-Autre-Rivage/assets/data/fragments.json");

    if (!response.ok) {
      throw new Error("Impossible de charger fragments.json");
    }

    const fragments = await response.json();

    container.innerHTML = "";

    fragments.forEach((fragment) => {
      const card = document.createElement("article");
      card.className = "fragment-card";

      card.innerHTML = `
        <img src="${fragment.image}" alt="${fragment.nom}">
        <div class="fragment-card-content">
          <h3>${fragment.nom}</h3>
          <p><strong>Type :</strong> ${fragment.type}</p>
          <p><strong>Zone :</strong> ${fragment.zone}</p>
          <p>${fragment.description}</p>
          <p>
            <a href="${fragment.lien}">Lire le fragment complet</a>
          </p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erreur de chargement des fragments :", error);

    container.innerHTML = `
      <article class="fragment-card">
        <div class="fragment-card-content">
          <h3>Archives indisponibles</h3>
          <p>Impossible de charger les fragments pour le moment.</p>
        </div>
      </article>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadFragments);