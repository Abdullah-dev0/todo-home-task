# API Documentation

## Endpoints

### Todos

#### GET /api/todos
Retrieves all todos.

**Response**
```json
{
  "todos": [
    {
      "id": "string",
      "title": "string",
      "completed": boolean,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### POST /api/todos
Creates a new todo.

**Request Body**
```json
{
  "title": "string",
  "completed": boolean
}
```

**Response**
```json
{
  "id": "string",
  "title": "string",
  "completed": boolean,
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### PUT /api/todos/:id
Updates an existing todo.

**Request Body**
```json
{
  "title": "string",
  "completed": boolean
}
```

**Response**
```json
{
  "id": "string",
  "title": "string",
  "completed": boolean,
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### DELETE /api/todos/:id
Deletes a todo.

**Response**
```json
{
  "message": "Todo deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

```json
{
  "error": "Error message description"
}
```

Status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error
