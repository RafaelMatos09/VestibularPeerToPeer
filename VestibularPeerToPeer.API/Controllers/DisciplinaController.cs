using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using VestibularPeerToPeer.Domain.Interfaces.Services;

namespace VestibularPeerToPeer.API.Controllers
{
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
    }
}
