using VestibularPeerToPeer.Domain.Models.Usuario;
using VestibularPeerToPeer.Infrastructure.Data;
using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using VestibularPeerToPeer.Domain.Models.Login;
using Dapper;

namespace VestibularPeerToPeer.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IDapperContext _context;

        public UsuarioRepository(IDapperContext context)
        {
            _context = context;
        }

        public async Task<CadastroModelRequest> CadastrarAsync(CadastroModelRequest usuario)
        {
            if (usuario == null)
                throw new ArgumentNullException(nameof(usuario));

            if (string.IsNullOrWhiteSpace(usuario.Email))
                throw new ArgumentException("Email não pode ser vazio.", nameof(usuario.Email));

            if (string.IsNullOrWhiteSpace(usuario.Nome))
                throw new ArgumentException("Nome não pode ser vazio.", nameof(usuario.Nome));

            if (string.IsNullOrWhiteSpace(usuario.Senha))
                throw new ArgumentException("Senha não pode ser vazia.", nameof(usuario.Senha));

            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha, workFactor: 12);

            var dbParams = new DynamicParameters();
            dbParams.Add("@Nome", usuario.Nome);
            dbParams.Add("@Email", usuario.Email);
            dbParams.Add("@SenhaHash", usuario.Senha);
            dbParams.Add("@TipoUsuarioId", 1);
            dbParams.Add("@InstituicaoId", 2);
            dbParams.Add("@Ativo", true);         
                     

            const string insertSql = @"
                INSERT INTO public.usuarios
                (
                    nome,
                    email,
                    senha_hash,
                    tipo_usuario_id,
                    instituicao_id,                    
                    ativo
                )
                VALUES
                (
                    @Nome,
                    @Email,
                    @SenhaHash,
                    @TipoUsuarioId,
                    @InstituicaoId,                    
                    @Ativo
                );";

            try
            {              

                var result = await _context.ExecuteAsync(insertSql, dbParams, System.Data.CommandType.Text);

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
            if (string.IsNullOrWhiteSpace(req.Email))
                throw new ArgumentException("Email não pode ser vazio.", nameof(req.Email));

            const string selectSql = @"
                SELECT
                    id AS Id,
                    nome AS Nome,
                    email AS Email,
                    senha_hash AS Senha,
                    email AS Login
                FROM public.usuarios
                WHERE email = @Email
                  AND ativo = true
                LIMIT 1;";

            try
            {
                var usuario = await _context.GetAsync<CadastroModelRequest>(
                    selectSql,
                    new { Email = req.Email.Trim() }
                );
                return usuario;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao buscar usuário por login: {ex.Message}", ex);
            }
        }
    }
}
