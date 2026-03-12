async function loadMonsters() {
  const container = document.getElementById("monsters-list");
  if (!container) return;

  try {
    const response = await fetch("/L-Autre-Rivage/assets/data/monstres.json");

    if (!response.ok) {
      throw new Error("Impossible de charger monstres.json");
    }

    const monsters = await response.json();

    container.innerHTML = "";

    monsters.forEach((monster) => {
      const card = document.createElement("article");
      card.className = "creature-card";

      card.innerHTML = `
        <img src="${monster.image}" alt="${monster.nom}">
        <div class="creature-card-content">
          <h3>${monster.nom}</h3>
          <p><strong>Type :</strong> ${monster.type}</p>
          <p><strong>Région :</strong> ${monster.region}</p>
          <p>${monster.description}</p>
          <p>
            <a href="${monster.lien}">Lire la fiche complète</a>
          </p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erreur de chargement des monstres :", error);

    container.innerHTML = `
      <article class="creature-card">
        <div class="creature-card-content">
          <h3>Archives indisponibles</h3>
          <p>Impossible de charger les monstres pour le moment.</p>
        </div>
      </article>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadMonsters);