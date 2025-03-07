# System Architecture

## Overview
The Lotus Notes clone is a modern web application designed with scalability and maintainability in mind. The system follows a layered architecture with clear separation of concerns.

## Technology Stack
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js/Express.js
- **Databases**:
  - **Couchbase**: For real-time sync and document storage
  - **PostgreSQL**: For relational data and complex queries
- **Containerization**: Docker
- **API**: RESTful endpoints

## Database Comparison
| Feature          | Couchbase                  | PostgreSQL               |
|------------------|----------------------------|--------------------------|
| Data Model       | Document-oriented          | Relational               |
| Scalability      | Horizontal scaling         | Vertical scaling         |
| Sync Capability  | Built-in sync              | Requires external tools  |
| Transactions     | Limited ACID support       | Full ACID compliance     |
| Use Case         | Real-time collaboration    | Complex queries          |

## Modern Techniques
- **Containerization**: Docker for consistent environments
- **CI/CD**: GitHub Actions for automated testing and deployment
- **REST API**: Standardized API design
- **Authentication**: JWT-based security
- **Real-time Updates**: WebSocket integration

## Component Diagram
```mermaid
graph TD
    A[Client] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[Notes Service]
    B --> E[Users Service]
    C --> F[(Couchbase/PostgreSQL)]
    D --> F
    E --> F
