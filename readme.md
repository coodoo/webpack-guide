
ES6, webpack/babel and workflow
===============================

@autho: Jeremy LU
@date: Jun 06, 2015

# es6
	
	- 學習資源

		- http://babeljs.io/docs/learn-es2015/
		
		- http://babeljs.io/repl/
	
	- 重要指令
		
		- let, const 

		- Arrow Function

			// example
			nums.forEach( (v, i, arr)  => {
			  if (v % 5 === 0)
			    fives.push(v);
			});
		
		- Destructuring
		
			// example
			var [a, , b] = [1,2,3];
			var {b} = {a:'aa', b:'bb'};
		
		- Class

			// example
			class SkinnedMesh extends THREE.Mesh {
		
		- Template Strings

			// example
			var foo = 'bar'
			`${foo}`

		- Generator
			
			//example
			function* foo(){
				yield 'bar';
			}

		- Promise	

			// example
			new Promise((resolve, reject) => {
		        setTimeout(resolve, duration);
		    })

	# 如何執行 es6
		
		# nodejs

			- $node --harmony
				
				- 不可靠
			
			- babel-node

				$ npm i babel -g
				
				- 要取代原本 node 指令
			
			- requre('babel/register')

				$ npm i --save-dev babel

				- 要多一個 entry.js 來 require() 其它檔案

		
		# browser
			- 用 webpack 打包 js 成 bundle.js
			- 過程中套用 babel loader 將 es6 轉成 es5

			# webpack/babel

				- 建立 webpack.config.js 檔案

				- 開發時啟動 local web server
					
					- webpack-dev-server

					$ webpack-dev-server --progress

				- 執行 build
					
					- 安裝
						- webpack
						- babel-loader

					$ webpack -d 	// 然後訪問 http://localhost:8080
					$ webpack -p 	// 得到壓縮與不含 sourcemap 的 bundle.js 檔案

# 良好開發手法
	
	- 程式模組化，一個功能一支 js
	- 使用 CommonJS 語法，別用 AMD 例如 requirejs

# workflow

	# 前端開發情境

		- dev
			- 開發時需要盡快將程式碼重新編譯、打包並刷新瀏覽器
			- 產生 sourcemap 方便在 DevTools 內除錯

		- build
			- 將專案所有 assets (js, css, html, images) 等編譯、合成、壓縮並搬到適當的位置
			- 例如將 100 支 js 檔案合成為一個 bundle.js 
			- 或將 vendor/ 與 assets/ 下所有檔案搬到 build/ 目錄下

		- deploy
			- 做完 build 流程後，將封裝好的檔案上傳到遠方主機(例如 EC2)
			- 在遠端主機上重啟 app 與 db，做 zero-downtime deployment
			- 常見手法是透過 ssh + rsync 將整包目錄上傳

	# 常用工具

		- node.js
			- javascript 執行環境，常用於 server，但也適用在本機進行自動化工作
		
		- npm
			- node.js 內建的套件管理系統，有十萬筆以上套件可取用，例如 jquery, bootstrap, react 皆包含在內

		- gulp
			- 組建系統(build system)，將專案封裝為可最終輸出的格式，通常包含大量自動化流程
			- 現在流行用 npm scripts 直接取代

		- webpack
			- 處理 module 相依關係
			- 程式碼打包器(module bundler)，將多支 javascript 檔案合成一支並在過程中做轉換處理
			
		- babel
			- 轉換 es6 為 es5
			- 轉換 jsx, flow 為 es5
		
# 常見問題

	- webpack 與 gulp 區別

		- webpack 是 bundler，將多支檔案進行編譯後結合為一份檔案，輸出為 bundle.js

		- gulp 是 build 工具，可自動化許多工作，將來做 Continous Integration & Deployment 很方便

	- webpack 與 browserify 差異

		- browserify 先出來，是老牌好用的 bundle 工具
		
		- 但 webpack 俱備下列優勢
			
			- 可輕易切分多個 bundle，並在需要時自動載入
				- multiple entry point
					- bundle.js ← 原本 3MB 的檔案，可切成三份小的檔案
					- main.js
					- b.js
					- c.js
			
			- 支援 Hot Module Replacement 僅更新部份頁面內容
				- 由於不是整頁更新，因此可保留程式狀態，方便測試
				- 跟 react 搭配更強大

			- 提供簡易的 local web server 方便開發
				
				$ webpack-dev-server // 即可訪問 http://localhost:8080
	
	- npm 與 bower 的差異
		- bower 是 twitter 推出
		- 專用於前端套件管理
		- 但後來 npm 內也有大量前端套件
		- 人們希望用一個套件管理程式就兼顧前/後端，因此 npm 勝出成為主流

	- CommonJS 與 RequireJS 的差異
	
		- requirejs 語法醜，東西一大時難管理

			// 如果 require 20 支程式，後面 function 就要依序列20個參數，缺一不可
			var js = require(['a', 'b', 'c', function(a, b, c){
				//	
			});	

		- requirejs config 難懂
			- 也不利於與各種 testing framework 整合

		- CommonJS 的優點
			- 語法簡潔
			- node.js 通用多年
			- 有 webpack 幫忙 bundle，用於 browser 內毫無困難

	- 什麼是 Continous Integration & Deployment (CI, CD)	

		- CI: 每次有人 commit 就自動跑所有 test 確保都通過

		- CD: 每次 commit 通過 CI 測試後，自動佈署到 server 上

			- "deploy on green"		