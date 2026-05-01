using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using VestibularPeerToPeer.API.Services;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class LoginController : ControllerBase
    {

        private readonly IUsuarioService _usuarioService;
        private readonly TokenService _tokenService;

        public LoginController(IUsuarioService usuarioService, TokenService tokenService)
        {
            _usuarioService = usuarioService;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel req)
        {
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Senha))
                return BadRequest(new { message = "Email e senha são obrigatórios." });

            var user = await _usuarioService.BuscarPorLogin(req);

            if (user == null || string.IsNullOrWhiteSpace(user.SenhaHash))
                return Unauthorized("Usuário ou senha inválidos");

            var senhaValida = BCrypt.Net.BCrypt.Verify(req.Senha, user.SenhaHash);

            if (!senhaValida)
                return Unauthorized("Senha inválida");

            var token = _tokenService.GerarToken(
                user.Id ?? string.Empty,
                user.Email ?? req.Email ?? string.Empty,
                user.Nome
            );

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    nome = user.Nome,
                    email = user.Email
                }
            });
        }
    }
}
