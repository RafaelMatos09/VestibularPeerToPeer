using Dapper;
using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using VestibularPeerToPeer.Domain.Models.Usuario;
using VestibularPeerToPeer.Infrastructure.Data;

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
            var paramanter = new DynamicParameters();
            paramanter.Add("@Login", usuario.Login);
            paramanter.Add("@Senha", usuario.Senha);
            paramanter.Add("@Nome", usuario.Nome);
            paramanter.Add("@Email", usuario.Email);           


            try
            {
                const string sql = @"
                    INSERT INTO Usuarios (
                                            Login,
                                            Senha,
                                            Nome,
                                            Email
                                        )
                                        VALUES (
                                            @Login,
                                            @Senha,
                                            @Nome,
                                            @Email
                                        )";

                var result = await _context.ExecuteAsync(sql, new
                {
                    usuario.Id,
                    usuario.Login,
                    usuario.Senha,
                    usuario.Nome,
                    usuario.Email
                });

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
    }
}
