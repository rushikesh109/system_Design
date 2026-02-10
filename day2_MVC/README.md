# Day 2: Advanced Client-Server Concepts

## What I Learned
- HTTP Headers (request & response)
- Query parameters vs URL parameters vs Body
- Middleware pattern and implementation
- Request validation
- Error handling
- CORS
- Pagination and filtering

## New Features
- ✅ Logging middleware (logs all requests)
- ✅ Validation middleware (validates user input)
- ✅ Error handling middleware
- ✅ Query parameters for filtering (city, age)
- ✅ Pagination (page, limit)
- ✅ Better error responses with details
- ✅ TypeScript types for better code safety

## API Examples

### Filter by city
```
GET /users?city=Mumbai
```

### Pagination
```
GET /users?page=2&limit=5
```

### Age range + city
```
GET /users?city=Delhi&minAge=25&maxAge=35
```

## Middleware Flow
```
Request → Logger → Validator (if POST/PUT) → Route Handler → Response
                                              ↓ (if error)
                                         Error Handler
```

## To Run
```bash
npm run dev
```
