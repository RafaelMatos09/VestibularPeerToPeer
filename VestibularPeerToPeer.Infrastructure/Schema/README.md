# Refactored Usuario Query Architecture

## Overview

This refactored architecture eliminates magic strings, prevents SQL injection, and ensures compile-time type safety through a combination of strongly-typed table schemas and SqlKata query builder.

## Folder Structure

```
VestibularPeerToPeer.Infrastructure/
├── Schema/
│   ├── Tables/
│   │   └── UsuarioTable.cs          # Strongly-typed column definitions
│   └── QueryBuilders/
│       └── UsuarioQueryBuilder.cs   # Type-safe query generation
├── Repositories/
│   ├── UsuarioRepository.cs         # Original (NOW FIXED: tipo_usuario_id param)
│   └── UsuarioRepositoryRefactored.cs # New: using SqlKata builder
└── Data/
    └── DapperContext.cs
```

## Key Components

### 1. UsuarioTable.cs
**Purpose**: Single source of truth for all column names and table metadata.

**Benefits**:
- ✅ No magic strings in queries
- ✅ Compile-time checking: referencing non-existent column names causes compilation errors
- ✅ Refactoring column names updates all references automatically
- ✅ Self-documenting: column purposes are clear with XML comments

**Usage**:
```csharp
// Instead of: "INSERT INTO usuarios (nome, email, ...)"
// Use:
UsuarioTable.TableName       // "usuarios"
UsuarioTable.Columns.Nome    // "nome"
UsuarioTable.Columns.Email   // "email"
UsuarioTable.QualifiedName   // "\"public\".\"usuarios\"" (PostgreSQL-safe)
```

### 2. UsuarioQueryBuilder.cs
**Purpose**: Encapsulates all SQL query generation logic using SqlKata fluent API.

**Benefits**:
- ✅ Parameter binding handled automatically (prevents injection)
- ✅ Fluent, readable syntax
- ✅ Easy to test and mock
- ✅ Reusable query fragments
- ✅ Supports complex WHERE/JOIN/GROUP BY without string concatenation

**Available Methods**:
```csharp
UsuarioQueryBuilder.BuildInsertQuery(usuario)      // INSERT
UsuarioQueryBuilder.BuildSelectByEmailQuery(email) // SELECT by email
UsuarioQueryBuilder.BuildSelectByIdQuery(id)       // SELECT by ID
UsuarioQueryBuilder.BuildSelectAllQuery()          // SELECT all
UsuarioQueryBuilder.BuildSoftDeleteQuery(id)       // Soft delete
```

### 3. UsuarioRepositoryRefactored.cs
**Purpose**: Repository implementation using query builder instead of raw SQL.

**Pattern**:
```csharp
// 1. Build query using type-safe builder
var insertQuery = UsuarioQueryBuilder.BuildInsertQuery(usuario);

// 2. Compile to SQL with automatic parameter binding
var compiler = new PostgresCompiler();
var compiled = compiler.Compile(insertQuery);

// 3. Execute via Dapper (Sql and Bindings are already separated)
var result = await _context.ExecuteAsync(compiled.Sql, compiled.Bindings);
```

## Migration Guide

### Option A: Keep Existing Repository (Minimal Fix)
The original `UsuarioRepository.cs` has already been fixed:
```csharp
// FIXED: parameter name now matches placeholder
tipo_usuario_id = 1,  // Was: tipousuario_id (WRONG - underscore missing)
```

**Pros**: Minimal code changes
**Cons**: Still uses raw SQL strings, no type safety

### Option B: Migrate to Refactored Version (Recommended)
Update dependency injection to use the new repository:

```csharp
// In Program.cs or DI configuration
services.AddScoped<IUsuarioRepository, UsuarioRepositoryRefactored>();
```

**Pros**: Full type safety, injection-proof, easier to maintain
**Cons**: Requires SqlKata NuGet package (if not already installed)

## SqlKata Integration

### Add SqlKata NuGet Package
```bash
dotnet add package SqlKata
dotnet add package SqlKata.Execution  # Optional, for advanced features
```

### Query Compilation
SqlKata provides compiler classes for different databases:
- `PostgresCompiler` - PostgreSQL (what we use)
- `SqlServerCompiler` - SQL Server
- `MySqlCompiler` - MySQL
- `OracleCompiler` - Oracle

## Parameter Binding Example

### Before (Risky):
```csharp
var sql = $"INSERT INTO usuarios (...) VALUES (@nome, @tipo_usuario_id, ...)";
var result = await _context.ExecuteAsync(sql, new
{
    tipousuario_id = 1  // ❌ MISMATCH! Parameter never binds
});
```

### After (Safe):
```csharp
var query = new Query("usuarios").AsInsert(new
{
    nome = usuario.Nome,
    tipo_usuario_id = 1  // ✅ SqlKata generates correct SQL
});

var compiler = new PostgresCompiler();
var compiled = compiler.Compile(query);

var result = await _context.ExecuteAsync(compiled.Sql, compiled.Bindings);
// compiled.Sql    = "INSERT INTO usuarios (nome, tipo_usuario_id, ...) VALUES (?, ?, ...)"
// compiled.Bindings = new object[] { "John", 1, ... }
```

## Benefits Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Magic Strings** | Column names as strings | Strongly-typed constants |
| **Typos** | Runtime errors | Compile-time errors |
| **SQL Injection** | Manual parameter handling | Auto-parameterized |
| **Refactoring** | Update everywhere | Update UsuarioTable.cs once |
| **Testing** | Hard to mock SQL | Easy to test builders |
| **Complex Queries** | String concatenation | Fluent API |

## Next Steps

1. **Keep both implementations** during transition (minimize risk)
2. **Gradually migrate** other repositories to use QueryBuilder pattern
3. **Create builders** for other tables: TipoUsuario, Instituicao, etc.
4. **Consider a UnitOfWork pattern** for transaction management across multiple repositories
5. **Document query examples** in each QueryBuilder for developers

## Related Files Modified
- ✅ `UsuarioRepository.cs` - Fixed parameter name typo (`tipo_usuario_id`)
- ✅ `UsuarioTable.cs` - NEW strongly-typed schema
- ✅ `UsuarioQueryBuilder.cs` - NEW query builder
- ✅ `UsuarioRepositoryRefactored.cs` - NEW safe repository implementation
