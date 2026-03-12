$ErrorActionPreference = "Stop"

$root = Get-Location
$baseUrl = "https://manub44.github.io/L-Autre-Rivage"

Write-Host ""
Write-Host "=== GENERATION AUTOMATIQUE DU SITEMAP ===" -ForegroundColor Cyan
Write-Host "Racine : $root"
Write-Host ""

# Fichiers HTML à exclure
$excludeFiles = @(
    "404.html",
    "googlec45ae584a8dc6a7f.html"
)

# Récupération de tous les fichiers HTML
$htmlFiles = Get-ChildItem -Path $root -Recurse -File -Filter "*.html" | Where-Object {
    $excludeFiles -notcontains $_.Name
}

# Tri par chemin
$htmlFiles = $htmlFiles | Sort-Object FullName

# Construction du XML
$xml = @()
$xml += '<?xml version="1.0" encoding="UTF-8"?>'
$xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

# Ajout de l’accueil
$xml += '  <url>'
$xml += "    <loc>$baseUrl/</loc>"
$xml += '    <changefreq>weekly</changefreq>'
$xml += '    <priority>1.0</priority>'
$xml += '  </url>'

foreach ($file in $htmlFiles) {

    # On ignore index.html à la racine pour éviter le doublon avec /
    if ($file.FullName -eq (Join-Path $root "index.html")) {
        continue
    }

    $relativePath = $file.FullName.Substring($root.Path.Length).TrimStart('\')
    $relativePath = $relativePath -replace '\\', '/'

    $url = "$baseUrl/$relativePath"

    # Valeurs par défaut
    $changefreq = "yearly"
    $priority = "0.6"

    # Règles selon les sections
    if ($relativePath -match '^univers/') {
        $changefreq = "monthly"
        $priority = "0.8"
    }
    elseif ($relativePath -match '^bestiaire/bestiaire-fantasy\.html$') {
        $changefreq = "monthly"
        $priority = "0.8"
    }
    elseif ($relativePath -match '^bestiaire/(creatures-fantasy|monstres-fantasy)\.html$') {
        $changefreq = "monthly"
        $priority = "0.7"
    }
    elseif ($relativePath -match '^cartes/cartes-du-rivage\.html$') {
        $changefreq = "monthly"
        $priority = "0.8"
    }
    elseif ($relativePath -match '^jdr/jeu-de-role\.html$') {
        $changefreq = "monthly"
        $priority = "0.8"
    }
    elseif ($relativePath -match '^jdr/(commencer|factions)\.html$') {
        $changefreq = "monthly"
        $priority = "0.7"
    }
    elseif ($relativePath -match '^lore/fragments\.html$') {
        $changefreq = "monthly"
        $priority = "0.7"
    }
    elseif ($relativePath -match '^communaute/') {
        $changefreq = "yearly"
        $priority = "0.5"
    }

    $xml += '  <url>'
    $xml += "    <loc>$url</loc>"
    $xml += "    <changefreq>$changefreq</changefreq>"
    $xml += "    <priority>$priority</priority>"
    $xml += '  </url>'
}

$xml += '</urlset>'

Set-Content -Path (Join-Path $root "sitemap.xml") -Value $xml -Encoding UTF8

Write-Host ""
Write-Host "sitemap.xml généré avec succès." -ForegroundColor Green
Write-Host "Fichier créé : $(Join-Path $root 'sitemap.xml')"
Write-Host ""