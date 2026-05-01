using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.API.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuarioService(IUsuarioRepository usuarioRepository)
        {
            _usuarioRepository = usuarioRepository;
        }

        public async Task<UsuarioModel> CadastrarAsync(UsuarioModel usuario)
        {
            return await _usuarioRepository.CadastrarAsync(usuario);
        }

        public async Task<UsuarioModel?> BuscarPorLogin(LoginRequestModel loginRequest)
        {
            return await _usuarioRepository.BuscarPorLogin(loginRequest);
        }
    }
}
