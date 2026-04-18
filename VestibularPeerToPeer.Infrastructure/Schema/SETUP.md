# Quick Setup Guide - Refactored Query Architecture

## 1. Add SqlKata NuGet Package

Open Package Manager Console and run:

```powershell
dotnet add VestibularPeerToPeer.Infrastructure package SqlKata
```

Or via Package Manager UI:
- Search: `SqlKata`
- Select latest version
- Install to `VestibularPeerToPeer.Infrastructure`

## 2. File Structure Created

Your new infrastructure organization:

```
VestibularPeerToPeer.Infrastructure/
├── Schema/
│   ├── Tables/
│   │   └── UsuarioTable.cs              ✅ NEW
│   ├── QueryBuilders/
│   │   └── UsuarioQueryBuilder.cs       ✅ NEW
│   ├── Examples/
│   │   └── UsuarioQueryExamples.cs      ✅ NEW (reference only)
│   └── README.md                        ✅ NEW (full documentation)
├── Repositories/
│   ├── UsuarioRepository.cs             ✅ FIXED (tipo_usuario_id parameter)
│   └── UsuarioRepositoryRefactored.cs   ✅ NEW (uses SqlKata)
└── Data/
    └── DapperContext.cs                 (unchanged)
```

## 3. Choose Your Approach

### Option A: Quick Fix Only (Minimal Risk)
Use the existing `UsuarioRepository` which is already fixed:
- ✅ No new dependencies needed
- ✅ Minimal code changes
- ❌ Still uses raw SQL strings
- ❌ No type safety on column names

**No action needed** - the parameter typo is already fixed!

### Option B: Full Refactor (Recommended)
Use the new `UsuarioRepositoryRefactored`:

**Step 1**: Add SqlKata NuGet (see above)

**Step 2**: Update DI Container (Program.cs):
```csharp
// OLD:
// services.AddScoped<IUsuarioRepository, UsuarioRepository>();

// NEW:
services.AddScoped<IUsuarioRepository, UsuarioRepositoryRefactored>();
```

**Step 3**: Test the endpoint
```bash
POST /api/usuario/cadastrar
Content-Type: application/json

{
  "nome": "Test User",
  "email": "test@example.com",
  "senha": "password123"
}
```

## 4. File Overview

| File | Purpose | Status |
|------|---------|--------|
| `UsuarioTable.cs` | Column definitions | NEW - Type-safe reference |
| `UsuarioQueryBuilder.cs` | SQL generation | NEW - Reusable queries |
| `UsuarioRepositoryRefactored.cs` | Repository layer | NEW - Safe implementation |
| `UsuarioRepository.cs` | Original repository | FIXED - para typo corrected |
| `UsuarioQueryExamples.cs` | Code samples | NEW - Reference examples |

## 5. Parameter Fix Applied

The original issue is already resolved in `UsuarioRepository.cs`:

```csharp
// ❌ BEFORE (didn't work - underscore missing):
tipousuario_id = 1,

// ✅ AFTER (fixed - matches @tipo_usuario_id placeholder):
tipo_usuario_id = 1,
```

## 6. Next Steps

1. **Test current implementation** - the parameter fix alone should resolve the DB error
2. **Review SqlKata documentation** - familiarize yourself with the fluent API
3. **Create similar schemas** for other tables:
   - `TipoUsuarioTable.cs` + `TipoUsuarioQueryBuilder.cs`
   - `InstituicaoTable.cs` + `InstituicaoQueryBuilder.cs`
4. **Migrate repositories gradually** to use new pattern
5. **Add integration tests** for query builders

## 7. Troubleshooting

**"Column does not exist" error still appears?**
- ✅ Clear browser cache and rebuild solution
- ✅ Verify database schema matches `UsuarioTable.Columns` definitions
- ✅ Check PostgreSQL logs for exact error

**SqlKata not found?**
- Run: `dotnet restore`
- Verify package installed in Infrastructure.csproj

**Need to check generated SQL?**
- Add this to test what SQL is generated:
```csharp
var query = UsuarioQueryBuilder.BuildInsertQuery(usuario);
var compiler = new PostgresCompiler();
var compiled = compiler.Compile(query);
Debug.WriteLine($"SQL: {compiled.Sql}");  // See generated query
Debug.WriteLine($"Params: {string.Join(", ", compiled.Bindings)}");
```

## 8. Documentation Files

- `README.md` - Full architecture explanation
- `UsuarioQueryExamples.cs` - Code patterns and examples
- This file - Setup instructions

## Questions?

Refer to:
- Schema/README.md - Detailed architecture
- Schema/Examples/UsuarioQueryExamples.cs - Usage examples
- SqlKata docs: https://sqlkata.com/
