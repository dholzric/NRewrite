# Backend Installation Guide

## Prerequisites
- Node.js v18+
- Docker
- Database:
  - Couchbase 7.0+ or
  - PostgreSQL 14+

## Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/lotus-notes-clone.git
   cd lotus-notes-clone
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials

## Database Setup
See [Database Configuration](../setup_guide.md#database-configuration) for detailed instructions

## API Configuration
The backend API can be configured through these environment variables:

| Variable          | Description                     | Default       |
|-------------------|---------------------------------|---------------|
| PORT              | API server port                | 3000          |
| DB_TYPE           | Database type (couchbase/pg)   | couchbase     |
| DB_HOST           | Database host                  | localhost     |
| DB_PORT           | Database port                  | 8091/5432     |
| DB_USER           | Database user                  | -             |
| DB_PASSWORD       | Database password              | -             |
| JWT_SECRET        | JWT signing secret             | -             |

## Running the Backend
Start the development server:
```bash
npm run dev
```

## Testing the Backend
Run unit tests:
```bash
npm test
```

Run integration tests:
```bash
npm run test:integration
```

## Production Deployment
For production deployment instructions, see [Setup Guide](../setup_guide.md#production-deployment)

## Troubleshooting
Common issues and solutions:

1. **Database connection errors**:
   - Verify database is running
   - Check connection credentials
   - Ensure proper network configuration

2. **Environment variable issues**:
   - Verify .env file exists
   - Check for typos in variable names
   - Restart server after changes

For additional help, see our [Support Documentation](../readme.md#support)
