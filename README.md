# Chandrakailash Tours & Travels

A responsive travel website for चंद्रकैलाश Tours & Travels with luxury pilgrimage and family tour package pages.

## Project Overview

- Static website built with HTML, CSS, and JavaScript
- Uses Tailwind CSS CDN for styling utilities
- Includes an admin-style page structure inside `src/`
- Provides PowerShell server scripts for local testing

## Repository Structure

```text
.
├── .git/
├── README.md
├── chandrakailash-tours/
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── public/
│   ├── src/
│   ├── run_server.ps1
│   └── server.ps1
```

> The actual website source is located inside the `chandrakailash-tours/` folder.

## How to Run Locally

### Option 1: Open in browser

1. Open `chandrakailash-tours/index.html` in your browser.

### Option 2: Run the local PowerShell server

1. Open PowerShell in the `chandrakailash-tours/` folder.
2. Allow script execution for this session:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

3. Start the server:

```powershell
.\run_server.ps1
```

4. Open the printed local URL in your browser (for example `http://localhost:8080/`).

## Key Files

- `chandrakailash-tours/index.html` — Main landing page
- `chandrakailash-tours/src/app.js` — JavaScript entry point
- `chandrakailash-tours/src/styles/*.css` — Custom styling
- `chandrakailash-tours/css/style.css` — Additional styling support
- `chandrakailash-tours/run_server.ps1` — Simple local development server
- `chandrakailash-tours/server.ps1` — Alternative server script

## Notes

- The page uses Google Fonts and Font Awesome from CDN.
- For development, use the local server so assets and paths resolve correctly.
