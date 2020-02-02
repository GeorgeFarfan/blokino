// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64", 
const APP_DIR = path.resolve(__dirname, './BlokinoWin-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './windows_installer');
console.log("APP DIR => ",APP_DIR);
console.log("OUT DIR => ",OUT_DIR);
// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'BlokinoWin',
    exe: 'BlokinoWin',
    name: 'BlokinoWin',
    manufacturer: 'BlokinoWin',
    version: '1.0.0',

    // Configure installer User Interface
    ui: {
        chooseDirectory: true
    },
});

 
// 4. Create a .wxs template file
msiCreator.create().then(function(){

    // Step 5: Compile the template to a .msi file
    msiCreator.compile();
}); 

 