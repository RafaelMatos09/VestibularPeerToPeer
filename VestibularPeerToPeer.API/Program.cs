using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Infrastructure.Data;
using VestibularPeerToPeer.Infrastructure.Repositories;
using VestibularPeerToPeer.Infrastructure.Services;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);



// 📦 Controllers
builder.Services.AddControllers();

// 📚 Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔌 Connection String
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' não configurada.");




// 🗄️ Dapper / PostgreSQL
builder.Services.AddSingleton(new DbConnectionFactory(connectionString));
builder.Services.AddScoped<IDapperContext>(sp => new DapperContext(connectionString));

// 👤 Usuários
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();

// 🌐 CORS (Next.js em localhost:3000 ou mesmo host do SPA)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:58323",
                "https://localhost:58322")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// 🚀 Build app
var app = builder.Build();

// 📚 Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

// 🌐 Rotas
app.MapControllers();

app.Run();