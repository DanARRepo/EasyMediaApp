const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            users: '/api/users',
            uploads: '/api/uploads',
            posts: '/api/posts',
        };

        // Conectar a base de datos
        this.conectarDB();

        // Middleares 
        this.middlewares();

        // Rutas app 
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS 
        this.app.use( cors() );

        // Read & parse body 
        this.app.use( express.json() );

        // Directorio publico 
        this.app.use( express.static('public') );

        // FileUpload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth.routes') );
        this.app.use( this.paths.search, require('../routes/search.routes') );
        this.app.use( this.paths.users, require('../routes/user.routes') );
        this.app.use( this.paths.uploads, require('../routes/uploads.routes') );
        this.app.use( this.paths.posts, require('../routes/posts.routes') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }
}

module.exports = Server;