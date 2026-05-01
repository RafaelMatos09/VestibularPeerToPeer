using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.Domain.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<UsuarioModel> CadastrarAsync(UsuarioModel usuario);
        Task<UsuarioModel> BuscarPorLogin(LoginRequestModel req);
    }
}
