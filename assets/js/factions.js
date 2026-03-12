async function loadFactions() {
  const container = document.getElementById("factions-list");
  if (!container) return;

  try {
    const response = await fetch("/L-Autre-Rivage/assets/data/factions.json");

    if (!response.ok) {
      throw new Error("Impossible de charger factions.json");
    }

    const factions = await response.json();

    container.innerHTML = "";

    factions.forEach((faction) => {
      const card = document.createElement("article");
      card.className = "faction-card";

      card.innerHTML = `
        <img src="${faction.image}" alt="${faction.nom}">
        <div class="faction-card-content">
          <h3>${faction.nom}</h3>
          <p><strong>Type :</strong> ${faction.type}</p>
          <p><strong>Zone :</strong> ${faction.zone}</p>
          <p>${faction.description}</p>
          <p>
            <a href="${faction.lien}">Lire la fiche complète</a>
          </p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erreur de chargement des factions :", error);

    container.innerHTML = `
      <article class="faction-card">
        <div class="faction-card-content">
          <h3>Factions indisponibles</h3>
          <p>Impossible de charger les factions pour le moment.</p>
        </div>
      </article>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadFactions);