using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VestibularPeerToPeer.Domain.Models
{
    public class AvaliacaoModel
    {
        public int Id { get; set; }
        public string? Usuario { get; set; }
        public string? Exercicio { get; set; }
        public DateTime DataAvaliacao { get; set; }
    }

    public class AvaliacaoUsuarioModel
    {
        public string Email { get; set; } = string.Empty;
        public string Nome { get; set; } = string.Empty;
        public DateTime? UltimoAcesso { get; set; }

        public Guid AlunoAvaliadoId { get; set; }
        public Guid AlunoAvaliadorId { get; set; }
        public int ExercicioId { get; set; }

        public decimal? NotaExercicio { get; set; }
        public decimal? NotaComportamentoAvaliado { get; set; }
        public decimal? NotaComportamentoAvaliador { get; set; }
        public decimal? NotaTotal { get; set; }
    }
}
