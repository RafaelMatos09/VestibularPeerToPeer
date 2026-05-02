using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.API.Controllers
{
    [ApiController]
    [Route("disciplina")]
    [Authorize]
    public class DisciplinaController : ControllerBase
    {
        readonly IDisciplinaService _disciplinaService;

        public DisciplinaController(IDisciplinaService disciplinaService)
        {
            _disciplinaService = disciplinaService;
        }

        [HttpGet("get-avaliacoes")]
        public async Task<IActionResult> GetAvaliacoes()
        {
            try
            {
                var avaliacoes = await _disciplinaService.ListarAvaliacoes();
                return Ok(avaliacoes);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao listar avaliações.", ex);
            }
            
        }

        [HttpGet("get-avaliacao-usuario")]
        public async Task<IActionResult> GetAvaliacaoUsuario()
        {
            try
            {
                var avaliacoesUsuario = await _disciplinaService.ListaAvaliacaoUsuario();
                return Ok(avaliacoesUsuario);
            }
            catch (Exception ex)
            {
                throw new Exception("Erro ao listar avaliações do usuário.", ex);
            }
        }

        [HttpGet("get-avaliacao-usuario-id")]
        public async Task<IActionResult> GetAvaliacaoUsuarioId(Guid id)
        {
            try
            {
                var avaliacaoUsuarioId = await _disciplinaService.ListarAvaliacaoAvaliadorId(id);
                return Ok(avaliacaoUsuarioId);
            }
            catch(Exception ex)
            {
                throw new Exception("Erro ao listar avaliações do usuário.", ex);
            }
        }
    }
}
