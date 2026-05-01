using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VestibularPeerToPeer.Domain.Models
{
    public class UsuarioModel
    {
        public string? Id { get; set; }

        public string? Nome { get; set; } = string.Empty;

        public string? Email { get; set; } = string.Empty;

        public string? SenhaHash { get; set; } = string.Empty;

        public int? TipoUsuarioId { get; set; }

        public int? InstituicaoId { get; set; } // nullable caso não seja obrigatório

        public bool? Ativo { get; set; } = true;

        public bool? EmailVerificado { get; set; } = false;

        public DateTime? UltimoAcesso { get; set; }

        public DateTime? CriadoEm { get; set; } = DateTime.UtcNow;

        public DateTime? AtualizadoEm { get; set; }
    }
}
