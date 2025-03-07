# Database Migrations

## Migration Tools
- **Couchbase**: Custom migration scripts using Node.js
- **PostgreSQL**: Knex.js migration framework

## Schema Versioning
- Version numbers follow semantic versioning (e.g., 1.0.0)
- Each migration is stored in `migrations/` directory
- Migration files are timestamped: `YYYYMMDDHHMMSS_migration_name.js`

## Example Migrations
### Couchbase
```javascript
// migrations/20250306200000_create_notes_collection.js
const couchbase = require('couchbase');

async function up(cluster) {
  const bucket = cluster.bucket('notes');
  await bucket.collectionManager().createCollection('notes');
}

async function down(cluster) {
  const bucket = cluster.bucket('notes');
  await bucket.collectionManager().dropCollection('notes');
}

module.exports = { up, down };
```

### PostgreSQL
```javascript
// migrations/20250306200000_create_notes_table.js
exports.up = function(knex) {
  return knex.schema.createTable('notes', table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('notes');
};
```

## Running Migrations
### Couchbase
```bash
npm run migrate:up
npm run migrate:down
```

### PostgreSQL
```bash
npx knex migrate:latest
npx knex migrate:rollback
```

## Rollback Procedures
1. Identify last successful migration
2. Run rollback command
3. Verify database state
4. Fix migration issues
5. Re-run migrations
