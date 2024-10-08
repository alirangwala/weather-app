## User Flow Diagram

```mermaid
flowchart TD
    A[User Logs In] --> B{User Exists in DB?}
    B -- Yes --> C[Set Session Global State in React]
    B -- No --> D[Create New User in DB]
    D --> C[Set Session Global State in React]
    C --> E[User Can Search for Weather with Default API Info]
    E --> F{User Changes API Info in Settings?}
    F -- Yes --> G[Update API Info in DB]
    G --> H[Update Session Global State in React]
