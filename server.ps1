$port = 8080
$listener = $null
while ($port -le 8095) {
    try {
        $prefix = "http://localhost:$port/"
        $testListener = New-Object System.Net.HttpListener
        $testListener.Prefixes.Add($prefix)
        $testListener.Start()
        $listener = $testListener
        break
    } catch {
        $port++
    }
}

if (-not $listener) {
    Write-Error "Could not bind to any port between 8080 and 8095."
    exit 1
}

Write-Host "Chandrakailash Tours Web Server running at http://localhost:$port/"

$root = $PSScriptRoot

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/") { $localPath = "/index.html" }
    
    $filePath = Join-Path $root $localPath.TrimStart('/')
    
    if (-not (Test-Path $filePath -PathType Leaf) -and -not [System.IO.Path]::HasExtension($localPath)) {
        $filePath = Join-Path $root "index.html"
    }

    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $extension = [System.IO.Path]::GetExtension($filePath)
        
        switch ($extension) {
            ".html" { $response.ContentType = "text/html; charset=utf-8" }
            ".css"  { $response.ContentType = "text/css" }
            ".js"   { $response.ContentType = "application/javascript" }
            ".png"  { $response.ContentType = "image/png" }
            ".jpg"  { $response.ContentType = "image/jpeg" }
            ".jpeg" { $response.ContentType = "image/jpeg" }
            ".webp" { $response.ContentType = "image/webp" }
            default { $response.ContentType = "application/octet-stream" }
        }
        
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
    }
    $response.Close()
}
