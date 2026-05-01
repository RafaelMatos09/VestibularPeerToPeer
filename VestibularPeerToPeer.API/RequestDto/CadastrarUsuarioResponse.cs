namespace VestibularPeerToPeer.API.Models
{
    public class CadastrarUsuarioResponse
    {
        public string? Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string TipoUsuarioId { get; set; } = string.Empty;
        public string TipoInstituicaoId { get; set; } = string.Empty;
    }
}
