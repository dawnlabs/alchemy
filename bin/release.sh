echo "  Releasing $1 version"
npm run lint
npm run test
npm run build:prod
npm run package
npm run zip
npm version $1
git push --tags
release
