# Readme #

Simple static website built system using Gulp, Slim and SASS.

# Prerequisites #

Node.js: [nodejs.org](http://nodejs.org)

NPM (recommended): [npmjs.com](http://npmjs.com)

Gulp: [gulpjs.com](http://gulpjs.com/)

SASS: [sass-lang.com](http://sass-lang.com)

ejs: [http://ejs.co/](http://ejs.co/)

# directory Structure #
```
・gulpfile.js
・package.json
・bower.json
・gitignore
・app
　├・images
　│　├ _common
　│　├ _top
　│　└ _under
　│
　├・javascripts
　│　└・common.js
　│　
　│
　├・stylesheets
　│　├・base
　│　├・layout
　│　├・module
　│　└・page
　│
　└・views
　　　├・partial
　　　│　├・header.ejs
　　　│　├・head.ejs
　　　│　├・footer.ejs
　　　│　└・side.ejs
　　　├・page_name
　　　│　└・index.ejs
　　　└・index.ejs
・public

```


# Installing #
install Node Packages with NPM
```
npm install
```

# Using the build #
Automated ejs and SASS building:
```
gulp
```

# Style Guide
[Smaccs](http://vanseodesign.com/css/smacss-introduction/)
