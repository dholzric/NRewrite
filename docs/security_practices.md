# Security Practices

## Authentication
- JSON Web Tokens (JWT) for stateless authentication
- Token expiration: 1 hour
- Refresh tokens with 7-day expiration
- Password hashing using bcrypt

## Authorization
- Role-based access control (RBAC)
- Roles:
  - Admin: Full access
  - User: CRUD on own notes
  - Guest: Read-only access
- Resource ownership validation

## Data Protection
- HTTPS enforced for all communications
- Sensitive data encryption:
  - Passwords: bcrypt
  - API keys: AES-256 encryption
- Database encryption at rest

## Security Headers
```javascript
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

## Rate Limiting
- 100 requests/minute per IP
- 10 login attempts/minute
- Redis-backed rate limiting

## Audit Logging
- All authentication attempts logged
- Sensitive operations logged
- Logs stored in secure, centralized location
- Log rotation: 30 days

## Security Best Practices
1. Regular dependency updates
2. Automated security scanning
3. Penetration testing
4. Security headers validation
5. Input sanitization
