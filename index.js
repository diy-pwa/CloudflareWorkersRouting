import createApp from './src/ExpressApp.js';

let server=createApp().listen(8080, ()=>{console.log(`listening on port ${server.address().port}`)});