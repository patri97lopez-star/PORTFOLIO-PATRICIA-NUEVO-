@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   GitHub + Vercel Deploy Script
echo ========================================
echo.

REM Set PATH
set "PATH=C:\Program Files\GitHub CLI;%PATH%"
set "PATH=C:\Program Files\nodejs;%PATH%"

cd /d c:\Users\A8-10m\Documents\PROYECTOS

echo [1/5] Verificando autenticacion GitHub...
gh auth status 2>nul
if errorlevel 1 (
    echo.
    echo   No estas autenticado en GitHub.
    echo.
    echo   PASO 1: Ve a esta URL en tu navegador:
    echo   https://github.com/login/device
    echo.
    echo   PASO 2: Introduce el codigo que aparece abajo
    echo.
    gh auth login --git-protocol https --web
    if errorlevel 1 (
        echo ERROR: Fallo en autenticacion. Intentalo de nuevo.
        pause
        exit /b 1
    )
)
echo.
echo   [OK] Autenticado en GitHub

echo.
echo [2/5] Creando repositorio en GitHub...
gh repo create patri-paniagua-portfolio --private --source=. --remote=origin --push 2>nul
if errorlevel 1 (
    echo   El repositorio ya existe, haciendo push directamente...
    git remote add origin https://github.com/%GH_USERNAME%/patri-paniagua-portfolio.git 2>nul
    git push -u origin main
) else (
    echo   [OK] Repositorio creado y push realizado
)

echo.
echo [3/5] Verificando Vercel CLI...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo   Instalando Vercel CLI...
    npm install -g vercel
)
echo   [OK] Vercel CLI disponible

echo.
echo [4/5] Desplegando en Vercel...
echo   NOTA: Se abrira el navegador para autenticarte en Vercel
echo.
vercel --yes --prod 2>nul
if errorlevel 1 (
    echo   Primera ejecucion, autenticando...
    vercel login
    vercel --yes --prod
)

echo.
echo [5/5] Configuracion de variable de entorno en Vercel...
for /f "tokens=2 delims==" %%a in ('findstr /b GEMINI_API_KEY .env.local') do (
    set API_KEY=%%~a
)
vercel env add GEMINI_API_KEY production --token="!API_KEY!" 2>nul

echo.
echo ========================================
echo   DESPLIEGE COMPLETADO
echo ========================================
echo.
echo   Tu app esta en: https://patri-paniagua-portfolio.vercel.app
echo.
pause
