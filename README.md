Secure Blog API - NestJS
A role-based blog API with JWT authentication, guards, and interceptors


Built with NestJS, this project demonstrates secure API development using:
✔ JWT Authentication
✔ Role-Based Access Control (Admin/User)
✔ Request Validation & Guards
✔ Custom Decorators & Interceptors


Features
Authentication & Authorization
- User registration/login with email & password
- JWT token generation & protected routes
- Role-based permissions (Admin can delete any post, User only their own)

Blog Post Management
- Create, read, update, and delete posts
- Public access to view posts (GET /posts)
- Private access to modify posts (requires JWT)

Advanced NestJS Patterns
- Guards: AuthGuard (JWT validation), RolesGuard (admin checks)
- Custom Decorators: @User() to inject current user, @Roles() for permissions
- Interceptors: Format responses consistently
- Pipes: Validate incoming data (e.g., CreatePostDto)


Project Structure
src/  
├── auth/                       # Auth logic  
│   ├── auth.controller.ts      # Register/login endpoints  
│   ├── auth.service.ts         # User validation & JWT  
│   
├── users/                      # User management  
│   ├── user.entity.ts          # User model (email, roles, etc.)  
├── posts/                      # Blog posts  
│   ├── posts.controller.ts     # Protected CRUD routes  
│   ├── posts.service.ts        # Business logic  
│   └── dto/                    # Validation rules  
├── common/                     # Shared utilities  
│   ├── decorators/             # @User(), @Roles()  
│   ├── guards/                 # AuthGuard, RolesGuard  
│   └── interceptors/           # Response formatting  
└── app.module.ts               # Root module  


Quick Start
Install dependencies
npm install  

Set up environment variables (.env file)
JWT_SECRET=your_secret_key  
DATABASE_URL=your_db_connection_string  

Run the API
npm run start:dev  

API runs at http://localhost:3000.


API Endpoints
Endpoint	Method	Access	Description
/auth/register	POST	Public	Register a new user
/auth/login	POST	Public	Login (returns JWT)
/posts	GET	Public	Get all posts
/posts	POST	User (JWT)	Create a post
/posts/:id	DELETE	Admin (JWT)	Delete any post


Testing
Unit Tests:
npm run test 
 
E2E Testing (Supertest):
npm run test:e2e  


Technologies Used
- NestJS – Backend framework
- Passport.js – JWT/local strategy
- TypeORM – Database integration
- class-validator – Request validation
- Jest – Testing


License
MIT

Contact
Questions? Reach out!
Email: ademuyiwaikotun@hotmail.com


Happy coding!