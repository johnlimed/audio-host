# Frontend


# Backend
Koa server
Endpoints > Handler > Use cases

## Middlewares
### loggerMiddleware
stores winston logger in context (ctx.log)  

### errorMiddleware  
logging of server errors, enabling support of custom errors.  

### dbMiddleware
lightweight db using [LokiJS](https://github.com/techfort/ LokiJS/wiki)  
DB interface to abstract Loki enabling easy extension and replacement of DB library if necessary.   
Loki DB stores in folder: database/audiohost.db

### shutdown
graceful shutdown, close db.  

### bodyparser
Standard koa bodyparser middleware, enabling parsing of json body object.  

## Errors
### UserExist 
status: 400
Username taken. Create a new user with another username.  

## Authentication
Using [argon2](https://github.com/ranisalt/node-argon2)
