//This is the fiel that we will run with node
require('./sockets/socketMain');
require('./expressStuff/expressMain');
//this is where we will be grabbing all the stuff we need
//from servers, they can get imported by whoever needs them.
//eg.
//require('./expressStuff/routerStuff')
//Modules are cached after the first time they are loaded. from onode
//everytimem someon has done const app = require(omsething) it will be cached and we will alway sbe referring to the same one.


