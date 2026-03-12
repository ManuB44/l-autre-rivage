async function loadCreatures() {
  const container = document.getElementById("creatures-list");
  if (!container) return;

  try {
    const response = await fetch("/L-Autre-Rivage/assets/data/creatures.json");

    if (!response.ok) {
      throw new Error("Impossible de charger creatures.json");
    }

    const creatures = await response.json();

    container.innerHTML = "";

    creatures.forEach((creature) => {
      const card = document.createElement("article");
      card.className = "creature-card";

      card.innerHTML = `
        <img src="${creature.image}" alt="${creature.nom}">
        <div class="creature-card-content">
          <h3>${creature.nom}</h3>
          <p><strong>Type :</strong> ${creature.type}</p>
          <p><strong>Région :</strong> ${creature.region}</p>
          <p>${creature.description}</p>
          <p>
            <a href="${creature.lien}">Lire la fiche complète</a>
          </p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erreur de chargement des créatures :", error);

    container.innerHTML = `
      <article class="creature-card">
        <div class="creature-card-content">
          <h3>Bestiaire indisponible</h3>
          <p>Impossible de charger les créatures pour le moment.</p>
        </div>
      </article>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadCreatures);