using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models.Login;
using VestibularPeerToPeer.Domain.Models.Usuario;

namespace VestibularPeerToPeer.Infrastructure.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<CadastroModelRequest> CadastrarAsync(CadastroModelRequest usuario)
        {
            return await _usuarioRepository.CadastrarAsync(usuario);
        }

        public async Task<CadastroModelRequest> BuscarPorLogin(LoginRequestModel loginRequest)
        {
            return await _usuarioRepository.BuscarPorLogin(loginRequest);
        }
    }
}
