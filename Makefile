publish:
	npm publish --dry-run
install:
	npm ci
brain-games:
	node bin/brain-games.js
lint:
	npx eslint .