# Frontend
React 
React Router v6  
Material UI  
Wavesurfer js  
React Helmet  

## Pages
Interestingly with React Router 6, they introduced Actions and Loaders which allows a simple way of data loading and interaction with the server.  
No more redux and complicated state managements. We can simply retrieve the data required per page. 

React Context was still used but minimized.  

### SignUp
A simple sign up page.  

TODO: V1 password is not hashed, plain password is sent to the server.  
We need to hash the password before sending it to the server.  

### Login
A simple login page.  
Here I made a compromise due to the lack of time, I just stored the jwt and admin role in the sessionStorage. Ideally just the jwt.  
Ideally, I would rather separate the admin pages in a separate app.  

### TrackPlayer
This is the home page where all users can view the audio files they uploaded, and with the interactive audio player using Wavesurfer.  

### User
This is an admin page where the administrator can manage users.  

Ideally, admin and normal user sites should be made separate for the best security.  
It is a compromise that we do frontend checks between admin and normal users. 


# Backend
Koa server
Endpoints > Handler > Use cases

Key points: design of server employs SOLID principles.  
Quite a fair bit of abstraction of libraries and dependencies so that we can mock them in our test cases.  

Given the timeline of the project, it is quite tight to implement the best practices. Strategy is to implement critical best practices and then compromise on those that may push the project timeline too long.  

Develop in a way that is extendable to allow room to switch out to best practices down the line.  

One example of compromise is implementing JWT, but using a secret phrase instead of certificates.   

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

### roleMiddleware  
Roles are retrieved on startup and stored in ctx.state. Role middleware attaches it per request.  


## Errors
### InputError
If reason is given, it will be included in the error message. All error messages start with Input error.

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
### POST /auth/login
If login is called with a jwt token set in the authentication header, the token will be checked and if still valid, the user will be logged in.  
```javascript
Example request
{
  username: string;
  password: string;
}

Response
{
  jwt: string;
}
```
#### Errors
[Input error](#InputError)  
[Authentication error](#AuthenticationError)  
[Authentication expired error](#AuthenticationExpiredError)  
[Authentication malformed error](#AuthenticationMalformError)  
[Authentication method error](#AuthenticationMethodError)  

### POST /auth/logout
```javascript
Example request
{
  username: string;
}

Response
"logout success"
```

### POST /user
```javascript
Example request
{
  username: string;
  password: string;
}

Response
"successfully registered user."
```
#### Errors
[User Exist](#UserExistError)

