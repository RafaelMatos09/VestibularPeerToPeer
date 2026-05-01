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
}
