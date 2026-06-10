$ErrorActionPreference = "Stop"

npm run build

Set-Location dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:mikemikemikemikemmmm/chineseChess.git main:gh-pages

Set-Location ..
