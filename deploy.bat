@echo off
setlocal

npm run build
if %errorlevel% neq 0 exit /b %errorlevel%

cd dist

git init
if %errorlevel% neq 0 exit /b %errorlevel%

git checkout -b main
if %errorlevel% neq 0 exit /b %errorlevel%

git add -A
if %errorlevel% neq 0 exit /b %errorlevel%

git commit -m "deploy"
if %errorlevel% neq 0 exit /b %errorlevel%

git push -f git@github.com:mikemikemikemikemmmm/chineseChess.git main:gh-pages
if %errorlevel% neq 0 exit /b %errorlevel%

cd ..
