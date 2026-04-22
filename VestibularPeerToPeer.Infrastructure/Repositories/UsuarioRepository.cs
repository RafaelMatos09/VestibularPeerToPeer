using SqlKata.Execution;
using VestibularPeerToPeer.Domain.Models.Usuario;
using VestibularPeerToPeer.Infrastructure.Data;
using VestibularPeerToPeer.Infrastructure.Schema.QueryBuilders;
using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using SqlKata.Compilers;
using BCrypt.Net;
using VestibularPeerToPeer.Domain.Models.Login;

namespace VestibularPeerToPeer.Infrastructure.Repositories
{
    /// <summary>
    /// Refactored repository using strongly-typed query builder instead of raw SQL strings.
    /// Eliminates parameter name mismatches and provides compile-time safety.
    /// </summary>
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IDapperContext _context;

        public UsuarioRepository(IDapperContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cadastra um novo usuário usando query builder type-safe.
        /// </summary>
        public async Task<CadastroModelRequest> CadastrarAsync(CadastroModelRequest usuario)
        {
            if(usuario == null)
                throw new ArgumentNullException(nameof(usuario));

            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha, workFactor: 12);

            try
            {
                // Build INSERT query using strongly-typed builder
                var insertQuery = UsuarioQueryBuilder.BuildInsertQuery(usuario);

                // Compile to SQL with parameters (SqlKata handles parameter binding)
                var compiler = new PostgresCompiler();
                var compiled = compiler.Compile(insertQuery);

                // Execute via Dapper with positional parameters from SqlKata
                var result = await _context.ExecuteAsync(compiled.Sql, compiled.Bindings);

                if (result == 0)
                {
                    throw new Exception("Nenhum registro foi inserido.");
                }

                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao cadastrar usuário: {ex.Message}", ex);
            }
        }

        public async Task<CadastroModelRequest> BuscarPorLogin(LoginRequestModel req)
        {
            if (string.IsNullOrWhiteSpace(req.Login))
                throw new ArgumentException("Login não pode ser vazio.", nameof(req.Login));
            try
            {
                // Build SELECT query using strongly-typed builder
                var selectQuery = UsuarioQueryBuilder.BuildSelectByIdQuery(req.Id);
                // Compile to SQL with parameters
                var compiler = new PostgresCompiler();
                var compiled = compiler.Compile(selectQuery);
                // Query via Dapper with positional parameters from SqlKata
                var usuario = await _context.QueryFirstOrDefaultAsync<CadastroModelRequest>(compiled.Sql, compiled.Bindings);
                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar usuário por login: {ex.Message}", ex);
            }
        }
    }
}
