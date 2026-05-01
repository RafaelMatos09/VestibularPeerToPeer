using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.API.Services
{
    public class DisciplinaService : IDisciplinaService
    {
        private readonly IDisciplinaRepository _disciplinaRepository;

        public DisciplinaService(IDisciplinaRepository disciplinaRepository)
        {
            _disciplinaRepository = disciplinaRepository;
        }

        public async Task<List<AvaliacaoModel>> ListarAvaliacoes()
        {
            var avaliacoes = await _disciplinaRepository.ListarAvaliacoes();
            return avaliacoes;
        }

        public async Task<List<AvaliacaoUsuarioModel>> ListaAvaliacaoUsuario()
        {
            var avaliacoesUsuario = await _disciplinaRepository.ListaAvaliacaoUsuario();
            return avaliacoesUsuario;
        }
    }
}
