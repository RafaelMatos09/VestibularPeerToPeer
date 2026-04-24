using VestibularPeerToPeer.Domain.Models.Login;
using VestibularPeerToPeer.Domain.Models.Usuario;

namespace VestibularPeerToPeer.Domain.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<UsuarioModel> CadastrarAsync(UsuarioModel usuario);
        Task<UsuarioModel> BuscarPorLogin(LoginRequestModel req);
    }
}
