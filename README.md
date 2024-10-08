## User Flow Diagram

```mermaid
flowchart TD
    A[User logs in] --> B[Save user info in Session global state in React]
    B --> C[Store user data (email, name, apiKey, apiUrl) in database]
    C --> D[User can search for weather using the API info]
    D --> E[User can change API info in settings]
    E --> F[Update user info in DB]