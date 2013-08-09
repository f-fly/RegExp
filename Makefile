npmbin = $(shell npm bin)/
default: release

test: 
	$(npmbin)jade jade/index.jade -P -o .

js: cleanup dependencies
	$(npmbin)r.js -o build.js

	$(npmbin)uglifyjs build/script.js -m -c -o build/script.min.tmp 
	# printf "\xEF\xBB\xBF" > "build/script.min.js";
	cat "licence.js" "build/script.min.tmp" > "build/script.min.js"

html: cleanup dependencies
	$(npmbin)jade jade/release.jade -o build

css: cleanup dependencies
	$(npmbin)lessc -x less/style.less > build/style.css
  
cleanup:
	rm -rf dist
	mkdir dist
	rm -rf build
	mkdir build

dependencies:
	npm install
	$(npmbin)bower install


update:
	npm update
	$(npmbin)bower update

release: css html js
	$(npmbin)inliner build/release.html | tail -1 > dist/index.html