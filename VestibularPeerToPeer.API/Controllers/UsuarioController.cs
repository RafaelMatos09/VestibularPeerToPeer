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
        public async Task<IActionResult> Cadastrar([FromBody] CadastrarUsuarioRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var model = new CadastroModelRequest
            {
                Nome = request.Nome.Trim(),
                Email = request.Email.Trim(),
                Senha = request.Senha,
                Login = request.Email.Trim()
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
