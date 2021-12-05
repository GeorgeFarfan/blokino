https://github.com/onmyway133/blog/issues/69

NODE_MODULE_VERSION
Today I was trying to install sharp with yarn add sharp to work in my electron app, but I get the following error

Uncaught Error: The module '/Users/khoa/MyElectronApp/node_modules/sharp/build/Release/sharp.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 57. This version of Node.js requires
NODE_MODULE_VERSION 54. Please try re-compiling or re-installing
the module

Native node module
Searching a bit, it was because sharp is a native node module which uses libvips under the hood

Node.js Addons are dynamically-linked shared objects, written in C++, that can be loaded into Node.js using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

More on how to build native node module can be found here https://blog.risingstack.com/writing-native-node-js-modules/

Node version
I'm using nvm to manage node version, and nvm list shows 8.4.0 as the latest node version I'm using.

v6.10.1
v7.8.0
v7.9.0
v8.0.0
-> v8.4.0
system
Searching on Node releases reveals that Node 8.4.0 has NODE_MODULE_VERSION of 57, so that is the node version npm uses to compile sharp

However, I can't seem to find the NODE_MODULE_VERSION 54 that sharp is using. I tried node 8.0.0 which is believed to have NODE_MODULE_VERSION 54 but it didn't work

Electron version
As the time of this post, electron is at version 7.9.0, you can check here https://github.com/electron/electron/blob/master/.node-version or by running process.versions in Javascript console

Using electron-rebuild
So after I read this Using Native Node Modules, I install electron-rebuilder to recompile sharp

yarn add electron-rebuild --dev
yarn add sharp
./node_modules/.bin/electron-rebuild
It works now 🎉

Read more
https://blog.risingstack.com/writing-native-node-js-modules/
