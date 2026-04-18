using VestibularPeerToPeer.Domain.Models.Usuario;

namespace VestibularPeerToPeer.Domain.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<CadastroModelRequest> CadastrarAsync(CadastroModelRequest usuario);
    }
}
