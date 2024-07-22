# Frontend


# Backend
Koa server
Endpoints > Handler > Use cases

## Middlewares
### loggerMiddleware
stores winston logger in context (ctx.log)
Allows for easy labling of endpoints and metadata for debugging.    

### errorMiddleware  
logging of server errors, enabling support of custom errors.  

### dbMiddleware
v1 uses a lightweight db [LokiJS](https://github.com/techfort/ LokiJS/wiki)  
DB interface to abstract Loki enabling easy extension and replacement of DB library when upgrading or if necessary.   
Loki DB stores in folder: database/audiohost.db  
Reason for using LokiJS is in the event messaging queue, heavier nosql equivalent like mongo and S3-like storage cannot be implemented because of the time.  


### shutdown
graceful shutdown, close db.  

### bodyparser
Standard koa bodyparser middleware, enabling parsing of json body object.  

### jwtMiddleware
Checks for session via jwtMiddleware  
Store username and id of user in token  

## Errors

### UserExistError
status: 400
Username taken. Create a new user with another username. 

### AuthenticationError
status: 401
Issue with username or password.  

## Authentication
Using [argon2](https://github.com/ranisalt/node-argon2)

## Endpoints
### /register
```javascript
Example request
{
  username: string,
  password: string,
}

Errors
[User Exist](#UserExistError)
```

### /login
```javascript
Example request
{
  username: string,
  password: string,
}

Errors
[Authentication error](#AuthenticationError)
```