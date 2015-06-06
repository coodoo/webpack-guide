
// 如果有用到 generator 就要掛這個 polyfill
// require('babel/polyfill');


// 模擬 SPA 程式
console.log( 'this is a SPA' );

var arr = ['a', 'b'];

arr.map( item => {
	var p = new Promise( (resolve, reject) => {
		setTimeout(resolve, 100);
	} );
	return 'name_' + item;
})

console.log( 'arr: ', arr );

var [foo] = arr;
console.log( 'foo: ', foo );

var bar = {b:'11', c:'22'};
var {cd} = bar;
// var {...rest} = bar;
console.log( 'coo: ', cd);

/*function* zoo(){
	for( let i = 0; i<4; i++ ){
		console.log( 'i= ', i );
		yield i;
	}
}

let runner = zoo(), result;
while( runner.next().done == false ){
	//
}*/

var foo = 'barrr'
console.log( '>', `${foo}` );

var t = ['a', 'b', 'c', 'd'];
var [z1, z2, ...tada] = t;
console.log( 'z: ', tada );