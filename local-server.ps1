$rootPath = $PSScriptRoot
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://127.0.0.1:8080/")
$listener.Start()

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $requestPath = $context.Request.Url.AbsolutePath.TrimStart("/")
  if ([string]::IsNullOrWhiteSpace($requestPath)) { $requestPath = "index.html" }
  $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($rootPath, $requestPath))

  if ($filePath.StartsWith($rootPath) -and [System.IO.File]::Exists($filePath)) {
    $mimeTypes = @{ ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"; ".js"="application/javascript; charset=utf-8"; ".png"="image/png" }
    $contentType = $mimeTypes[[System.IO.Path]::GetExtension($filePath).ToLowerInvariant()]
    if (-not $contentType) { $contentType = "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($filePath)
    $context.Response.ContentType = $contentType
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $context.Response.StatusCode = 404
  }
  $context.Response.OutputStream.Close()
}
