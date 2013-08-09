npmbin = $(shell npm bin)/
default: release

test: 
	$(npmbin)jade jade/index.jade -P -o .

js: cleanup dependencies
	$(npmbin)r.js -o build/build.js
	$(npmbin)uglifyjs build/tmp/script.js -m -c -o build/tmp/script.min.tmp 
	printf "\xEF\xBB\xBF" > "build/tmp/script.min.js";
	cat "licence.js" "build/tmp/script.min.tmp" >> "build/tmp/script.min.js"

html: cleanup dependencies
	$(npmbin)jade jade/release.jade -o build/tmp

css: cleanup dependencies
	$(npmbin)lessc -x less/style.less > build/tmp/style.css
  
cleanup:
	rm -rf dist
	mkdir dist
	rm -rf build/tmp
	mkdir build/tmp

dependencies:
	npm install
	$(npmbin)bower install


update:
	npm update
	$(npmbin)bower update

release: css html js
	$(npmbin)inliner build/tmp/release.html | tail -1 > dist/index.html