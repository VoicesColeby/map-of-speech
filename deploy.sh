#!/bin/sh
set -e
rm -rf ./dist
npm run build
cd ./dist
touch .nojekyll
git init
git add .
git commit -m 'deploy to gh-pages'

# Set your repository remote below (owner/repo)
# Example: git push --force git@github.com:YOUR_GH_USERNAME/YOUR_REPO.git main:gh-pages
echo "Please set your GitHub remote and uncomment the push command."
# git push --force git@github.com:YOUR_GH_USERNAME/YOUR_REPO.git main:gh-pages
cd ../
