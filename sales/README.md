# Pixel-Craft one-pager

Adjunto para el primer correo (una hoja A4). Incluye el logo de Pixel-Craft.

| Idioma | Archivo a enviar |
| --- | --- |
| English | [Pixel-Craft-one-pager-en.pdf](Pixel-Craft-one-pager-en.pdf) |
| Español | [Pixel-Craft-one-pager-es.pdf](Pixel-Craft-one-pager-es.pdf) |

Ruta en disco: `e:\Karosu\Documents\Pixel-craft\pages\sales\`

Fuente para regenerar (no se envía): `one-pager-en.html`, `one-pager-es.html`, `one-pager.css`, `logo.png`.

No se publica en pixel-craft.dev.

Cierra Acrobat si tienes abiertos `one-pager-en.pdf` / `one-pager-es.pdf`; esos son la versión anterior (sin el logo del sitio).

## Regenerar los PDF

Desde esta carpeta, con Chrome o Edge (cierra los PDF en Acrobat primero):

```powershell
$chrome = "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
$here = $PSScriptRoot
foreach ($lang in @("en", "es")) {
  $html = (Resolve-Path "$here\one-pager-$lang.html").Path
  $pdf  = "$here\Pixel-Craft-one-pager-$lang.pdf"
  $uri  = ([Uri]$html).AbsoluteUri
  & $chrome --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=15000 --print-to-pdf="$pdf" $uri
}
```
