default: release

test: 
	jade jade/index.jade -P -o .

js: cleanup update
	node r.js -o build/build.js
	uglifyjs tmp/js/script.js -m -c -o tmp/js/script.min.tmp 
	printf "\xEF\xBB\xBF" > "tmp/js/script.min.js";
	cat "licence.js" "tmp/js/script.min.tmp" >> "tmp/js/script.min.js"

html: cleanup update
	jade jade/release.jade -o tmp

css: cleanup update
	lessc -x less/style.less > tmp/css/style.css
  
cleanup:
	rm -rf build
	rm -rf dist
	mkdir tmp
	mkdir tmp/js
	mkdir tmp/css
	mkdir dist
	
update:
	bower install
	bower update

release: css html js
	inliner tmp/release.html | tail -1 > dist/index.html
	rm -rf tmp