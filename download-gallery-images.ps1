# Download gallery images from JJ Events Jimdo site
$outputDir = "D:\website\public\gallery"

# Image URLs from the Jimdo gallery page
$images = @(
    "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,width=1920,height=1087/image/530724229/9214f232-fbc9-46e7-a8ff-ff2368ca509a.jpg"
    "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,width=1920,height=1280/image/530724229/9f8e5aef-c9c5-4cc9-8e61-f5c5e3c09e4d.jpg"
    "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,width=1920,height=1280/image/530724229/8d0e9f5c-f8b0-4c4b-b2e1-88f2a5e0c5f5.jpg"
    "https://storage.e.jimdo.com/cdn-cgi/image/quality=85,fit=scale-down,format=auto,width=1920,height=1280/image/530724229/7c3e8d4b-a9f1-4e3c-9d2f-77e1a4d0b4e4.jpg"
)

$counter = 1
foreach ($url in $images) {
    try {
        $filename = "jimdo-gallery-$counter.jpg"
        $destination = Join-Path $outputDir $filename
        Write-Host "Downloading $url to $destination..."
        Invoke-WebRequest -Uri $url -OutFile $destination -UseBasicParsing
        Write-Host "✓ Downloaded: $filename"
        $counter++
    } catch {
        Write-Host "✗ Failed to download: $url"
        Write-Host $_.Exception.Message
    }
}

Write-Host " "
$message = "Download complete! " + ($counter - 1) + " images saved to " + $outputDir
Write-Host $message
