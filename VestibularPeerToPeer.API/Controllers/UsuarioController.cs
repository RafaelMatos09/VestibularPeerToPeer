using Microsoft.AspNetCore.Mvc;
using VestibularPeerToPeer.API.Models;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
                
        [HttpPost("cadastrar")]        
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }         
                        
            try
            {
                var criado = await _usuarioService.CadastrarAsync(request);
                var response = new CadastrarUsuarioResponse
                {
                    Id = criado.Id,
                    Nome = criado.Nome ?? string.Empty,
                    Email = criado.Email ?? string.Empty
                };
                return StatusCode(StatusCodes.Status201Created, response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
