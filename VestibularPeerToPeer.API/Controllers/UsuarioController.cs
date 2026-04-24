using Microsoft.AspNetCore.Mvc;
using VestibularPeerToPeer.API.Models;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models.Usuario;

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

        /// <summary>Cadastra um novo usuário (login padrão = email).</summary>
        [HttpPost("cadastrar")]
        [ProducesResponseType(typeof(CadastrarUsuarioResponse), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Cadastrar([FromBody] UsuarioModel request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var model = new UsuarioModel
            {
                Nome = request.Nome.Trim(),
                Email = request.Email.Trim(),
                SenhaHash = request.SenhaHash,
                Email = request.Email
            };

            try
            {
                var criado = await _usuarioService.CadastrarAsync(model);
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
