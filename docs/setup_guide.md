# Setup Guide

## Prerequisites
- Node.js v18+
- Docker (for containerized deployment)
- Database:
  - Couchbase 7.0+ or
  - PostgreSQL 14+
- Git

## Environment Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/lotus-notes-clone.git
   cd lotus-notes-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create `.env` file:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials

## Database Configuration
### Couchbase
1. Start Couchbase server:
   ```bash
   docker run -d --name couchbase -p 8091-8096:8091-8096 -p 11210-11211:11210-11211 couchbase
   ```

2. Initialize cluster:
   - Access http://localhost:8091
   - Create bucket: `notes`

### PostgreSQL
1. Start PostgreSQL:
   ```bash
   docker run --name postgres -e POSTGRES_PASSWORD=yourpassword -d -p 5432:5432 postgres
   ```

2. Create database:
   ```bash
   psql -h localhost -U postgres -c "CREATE DATABASE notes;"
   ```

## Running the Application
1. Start development server:
   ```bash
   npm run dev
   ```

2. Access application:
   http://localhost:3000

## Testing
Run unit tests:
```bash
npm test
```

For more detailed installation instructions, see [Installation Guide](../installation-guide.md)
