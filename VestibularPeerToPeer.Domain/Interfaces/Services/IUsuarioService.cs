using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VestibularPeerToPeer.Domain.Models.Usuario;

namespace VestibularPeerToPeer.Domain.Interfaces.Services
{
    public interface IUsuarioService
    {
        Task<CadastroModelRequest> CadastrarAsync(CadastroModelRequest usuario);
    }
}
