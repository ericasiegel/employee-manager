const BeginApp = require('./app.js');

//begin the program
start = () => {
    console.log(`
        ________________________

            EMPLOYEE MANAGER 
        ________________________   
    `);
    new BeginApp().startApp();
}

start();