using System.Security.Cryptography;
using System.Text;

namespace VestibularPeerToPeer.API.Services
{
    public static class JwtKeyFactory
    {
        public static byte[] BuildKey(string secret)
        {
            if (string.IsNullOrWhiteSpace(secret))
                throw new InvalidOperationException("Configuração Jwt:Secret não pode ser vazia.");

            // Garante chave de 256 bits para HMAC-SHA256, mesmo que a string base seja curta.
            return SHA256.HashData(Encoding.UTF8.GetBytes(secret));
        }
    }
}
