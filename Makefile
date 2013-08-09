npmbin = $(shell npm bin)/
default: release

test: 
	$(npmbin)jade jade/index.jade -P -o .

js: cleanup update
	$(npmbin)r.js -o build/build.js
	$(npmbin)uglifyjs tmp/js/script.js -m -c -o tmp/js/script.min.tmp 
	printf "\xEF\xBB\xBF" > "tmp/js/script.min.js";
	cat "licence.js" "tmp/js/script.min.tmp" >> "tmp/js/script.min.js"

html: cleanup update
	$(npmbin)jade jade/release.jade -o tmp

css: cleanup update
	$(npmbin)lessc -x less/style.less > tmp/css/style.css
  
cleanup:
	rm -rf tmp
	rm -rf dist
	mkdir tmp
	mkdir tmp/js
	mkdir tmp/css
	mkdir dist
	
update:
	npm install
	npm update
	$(npmbin)bower install
	$(npmbin)bower update

release: css html js
	$(npmbin)inliner tmp/release.html | tail -1 > dist/index.html
	rm -rf tmp