using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using VestibularPeerToPeer.Domain.Interfaces.Services;
using VestibularPeerToPeer.Domain.Models.Login;
using VestibularPeerToPeer.Infrastructure.Repositories;

namespace VestibularPeerToPeer.API.Controllers
{
    [ApiController]
    [Route("api/usuarios")]
    public class LoginController : ControllerBase
    {

        private readonly IUsuarioService _usuarioService;

        public LoginController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestModel req)
        {
            var user = await _usuarioService.BuscarPorLogin(req);

            if (user == null || user.Senha != req.Senha)
                return Unauthorized("Usuário ou senha inválidos");

            var senhaValida = BCrypt.Net.BCrypt.Verify(req.Senha, user.Senha);

            if (!senhaValida)
                return Unauthorized("Senha inválida");

            var tokenService = new TokenService("SUA_CHAVE_SECRETA_AQUI_123");

            var token = tokenService.GerarToken(req.Id.ToString(), req.Email);

            return Ok(new
            {
                token = token
            });
        }
    }
}
