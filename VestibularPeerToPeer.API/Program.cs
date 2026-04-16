using VestibularPeerToPeer.Infrastructure.Data;

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

// 🚀 Build app
var app = builder.Build();

// 📚 Swagger
app.UseSwagger();
app.UseSwaggerUI();

// 🌐 Rotas
app.MapControllers();

app.Run();