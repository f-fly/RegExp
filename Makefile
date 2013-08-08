all: 
	jade app/jade/index.jade -P -o app

js: cleanup update
	echo "js ..."
	node ../node_modules/requirejs/bin/r.js -o app/build/build.js
	echo "uglify..."
	uglifyjs dist/js/script.js -m -c -o dist/js/script.min.tmp 
	printf "\xEF\xBB\xBF" > "dist/js/script.min.js";
	cat "app/licence.js" "dist/js/script.min.tmp" >> "dist/js/script.min.js"
	rm "dist/js/script.min.tmp"
	echo "js done"

html: cleanup update
	jade app/jade/release.jade -o dist
	mv dist/release.html dist/index.html
	# cp app/css/images/* dist/css/images
	# @cd release;ls -d images/* >> "offline.appcache"; ls -d css/images/* >> "offline.appcache";

css: cleanup update
	lessc -x app/less/style.less > dist/css/style.css
  
cleanup:
	echo "cleanup..."
	rm -rf dist/*
	mkdir dist/js
	mkdir dist/css
	mkdir dist/images
	mkdir dist/css/images
	echo "cleanup done"
	
update:
	bower install

release: css html js
	inliner dist/index.html | tail -1 > dist/regexp.html
	# inliner https://c9.io/f_fly/backbone/workspace/regexp/dist/index.html > dist/regexp.html
