using System.ComponentModel.DataAnnotations;

namespace VestibularPeerToPeer.API.Models
{
    public class CadastrarUsuarioRequest
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        [MinLength(2)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Senha é obrigatória")]
        [MinLength(6, ErrorMessage = "A senha deve ter pelo menos 6 caracteres")]
        public string Senha { get; set; } = string.Empty;
    }
}
