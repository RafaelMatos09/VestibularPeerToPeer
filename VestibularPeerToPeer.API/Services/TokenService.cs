using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace VestibularPeerToPeer.API.Services
{
    public class TokenService
    {
        private readonly string _secret;
        private readonly string _issuer;
        private readonly string _audience;
        private readonly int _expiresInHours;

        public TokenService(IConfiguration configuration)
        {
            _secret = configuration["Jwt:Secret"]
                ?? throw new InvalidOperationException("Configuração Jwt:Secret não encontrada.");
            _issuer = configuration["Jwt:Issuer"]
                ?? throw new InvalidOperationException("Configuração Jwt:Issuer não encontrada.");
            _audience = configuration["Jwt:Audience"]
                ?? throw new InvalidOperationException("Configuração Jwt:Audience não encontrada.");
            _expiresInHours = configuration.GetValue<int?>("Jwt:ExpiresInHours") ?? 2;
        }

        public string GerarToken(string userId, string email, string? nome)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = JwtKeyFactory.BuildKey(_secret);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, userId),
                new(ClaimTypes.Email, email),
                new(ClaimTypes.Name, nome ?? string.Empty)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(_expiresInHours),
                Issuer = _issuer,
                Audience = _audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
