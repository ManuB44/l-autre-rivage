async function loadRegions() {
  const container = document.getElementById("regions-list");
  if (!container) return;

  try {
    const response = await fetch("/L-Autre-Rivage/assets/data/regions.json");

    if (!response.ok) {
      throw new Error("Impossible de charger regions.json");
    }

    const regions = await response.json();

    container.innerHTML = "";

    regions.forEach((region) => {
      const card = document.createElement("article");
      card.className = "region-card";

      card.innerHTML = `
        <img src="${region.image}" alt="${region.nom}">
        <div class="region-card-content">
          <h3>${region.nom}</h3>
          <p><strong>Type :</strong> ${region.type}</p>
          <p><strong>Zone :</strong> ${region.zone}</p>
          <p>${region.description}</p>
          <p>
            <a href="${region.lien}">Lire la fiche complète</a>
          </p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erreur de chargement des régions :", error);

    container.innerHTML = `
      <article class="region-card">
        <div class="region-card-content">
          <h3>Atlas indisponible</h3>
          <p>Impossible de charger les régions pour le moment.</p>
        </div>
      </article>
    `;
  }
}

document.addEventListener("DOMContentLoaded", loadRegions);