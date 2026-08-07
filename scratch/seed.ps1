$pkgs = Get-Content -Raw -Path .\data\packages.json | ConvertFrom-Json
$albums = Get-Content -Raw -Path .\data\albums.json | ConvertFrom-Json
$settings = Get-Content -Raw -Path .\data\settings.json | ConvertFrom-Json
$reviews = Get-Content -Raw -Path .\data\reviews.json | ConvertFrom-Json

$cloudData = @{
    packages = $pkgs
    albums = $albums
    settings = $settings
    reviews = $reviews
}

$jsonStr = $cloudData | ConvertTo-Json -Depth 20
Set-Content -Path .\scratch\full_cloud_seed.json -Value $jsonStr -Encoding UTF8

Write-Host "Cloud seed JSON created!"
