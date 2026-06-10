@echo off
setlocal

echo [1/3] Building...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b %errorlevel%
)

echo [2/3] Deploying dist to gh-pages...
cd dist

git init
git add -A
git commit -m "deploy"
git push -f git@github.com:mikemikemikemikemmmm/chineseChess.git HEAD:gh-pages
if %errorlevel% neq 0 (
    echo Deploy failed!
    cd ..
    pause
    exit /b %errorlevel%
)

cd ..

echo [3/3] Done!
echo Visit: https://mikemikemikemikemmmm.github.io/chineseChess/
pause
