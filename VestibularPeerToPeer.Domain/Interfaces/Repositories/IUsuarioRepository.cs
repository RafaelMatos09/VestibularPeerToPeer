using VestibularPeerToPeer.Domain.Models.Login;
using VestibularPeerToPeer.Domain.Models.Usuario;

namespace VestibularPeerToPeer.Domain.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        Task<CadastroModelRequest> CadastrarAsync(CadastroModelRequest usuario);
        Task<CadastroModelRequest> BuscarPorLogin(LoginRequestModel req);
    }
}
