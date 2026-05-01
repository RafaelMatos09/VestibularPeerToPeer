using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.Domain.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<UsuarioModel> CadastrarAsync(UsuarioModel usuario);
        Task<UsuarioModel> BuscarPorLogin(LoginRequestModel req);        
    }
}
