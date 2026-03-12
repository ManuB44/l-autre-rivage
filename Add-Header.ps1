$root = Get-Location

$header = @"
<header class="site-header">
  <div class="nav-shell">
    <a class="logo" href="/L-Autre-Rivage/index.html">L’Autre Rivage</a>

    <button class="nav-toggle" type="button" aria-expanded="false">
      Menu
    </button>

    <nav class="site-nav">
      <a href="/L-Autre-Rivage/index.html">Accueil</a>
      <a href="/L-Autre-Rivage/univers/monde-fantasy.html">Univers</a>
      <a href="/L-Autre-Rivage/cartes/cartes-du-rivage.html">Cartes</a>
      <a href="/L-Autre-Rivage/bestiaire/bestiaire-fantasy.html">Bestiaire</a>
      <a href="/L-Autre-Rivage/jdr/jeu-de-role.html">JDR</a>
      <a href="/L-Autre-Rivage/lore/fragments.html">Fragments</a>
      <a href="/L-Autre-Rivage/bibliotheque/bibliotheque.html">Bibliothèque</a>
      <a href="/L-Autre-Rivage/communaute/a-propos.html">Communauté</a>
    </nav>
  </div>
</header>
"@

Get-ChildItem -Path $root -Recurse -Filter *.html | ForEach-Object {

    $file = $_.FullName
    $content = Get-Content $file -Raw

    if ($content -notmatch "site-header") {

        $new = $content -replace "<body>", "<body>`n$header"
        Set-Content $file $new

        Write-Host "Header ajouté dans :" $file
    }

}