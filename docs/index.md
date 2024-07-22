# Frontend


# Backend
Koa server
Endpoints > Handler > Use cases

Key points: design of server employs SOLID principles.  
Quite a fair bit of abstraction of libraries and dependencies so that we can mock them in our test cases.  

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

### AuthenticationExpiredError
status: 401  
message: Token expired  
Re-login  

### AuthenicationMalformError 
status: 401  
message: Token Malformed  
Check jwt token  

### AuthenticationMethodError  
status: 401  
message: Unsupported authencation method  
Check that authentication method is set to bearer



## Authentication
Using [argon2](https://github.com/ranisalt/node-argon2)



## Endpoints
### /register
```javascript
Example request
{
  username: string;
  password: string;
}

Errors
[User Exist](#UserExistError)

Response
{
  
}
```

### /login
If login is called with a jwt token set in the authentication header, the token will be checked and if still valid, the user will be logged in.  
```javascript
Example request
{
  username: string;
  password: string;
}

Errors
[Authentication error](#AuthenticationError)
[Authentication expired error](#AuthenticationExpiredError)
[Authentication malformed error](#AuthenticationMalformError)
[Authentication method error](#AuthenticationMethodError)

Response
{
  jwt: string;
}
```