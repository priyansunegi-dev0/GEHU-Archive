$stagingFolders = @("b pharma", "ba eng", "ba jmc", "bba", "bca", "bcom h", "bhm", "bsc animation", "bsc nursing", "btech", "diploma", "mba", "mca", "mtech")
$destRoot = "public\courses"

foreach ($folder in $stagingFolders) {
    if (Test-Path $folder) {
        $pdfs = Get-ChildItem -Path $folder -Filter *.pdf -Recurse
        foreach ($pdf in $pdfs) {
            # Construct the relative path starting from the course name
            # For example: from "mca\sem 4\soft computing\mid\tmc...pdf"
            # $pdf.FullName gives the absolute path.
            # We want to replace the current working directory from the path.
            
            $relPath = Resolve-Path -Relative $pdf.FullName
            # $relPath will be like ".\mca\sem 4\soft computing\mid\tmc...pdf"
            $relPath = $relPath -replace '^\.\\', ''
            
            # Destination path
            $destPath = Join-Path $destRoot $relPath
            $destDir = Split-Path $destPath -Parent
            
            # Create the destination directory if it doesn't exist
            if (-not (Test-Path $destDir)) {
                New-Item -ItemType Directory -Force -Path $destDir | Out-Null
            }
            
            # Move the file
            Move-Item -Path $pdf.FullName -Destination $destPath -Force
            Write-Host "Moved $($pdf.Name) to $destDir"
        }
    }
}
