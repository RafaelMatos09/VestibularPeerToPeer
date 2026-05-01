using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VestibularPeerToPeer.Domain.Models;

namespace VestibularPeerToPeer.Domain.Interfaces.Repositories
{
    public interface IDisciplinaRepository
    {
        Task<List<AvaliacaoModel>> ListarAvaliacoes();
    }
}
