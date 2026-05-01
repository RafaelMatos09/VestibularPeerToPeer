using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.Domain.Interfaces.Services
{
    public interface IDisciplinaService
    {
        Task<List<AvaliacaoModel>> ListarAvaliacoes();
    }
}
