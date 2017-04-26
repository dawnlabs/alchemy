echo "  Releasing $1 version"
npm run lint
npm run build
npm run package
npm run zip
npm version $1
git push --tags
release
