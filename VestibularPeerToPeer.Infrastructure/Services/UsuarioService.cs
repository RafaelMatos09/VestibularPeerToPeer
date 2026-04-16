using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VestibularPeerToPeer.Infrastructure.Repositories;

namespace VestibularPeerToPeer.Infrastructure.Services
{
    public class UsuarioService
    {
        private readonly  UsuarioRepository _usuarioRepository;

        public UsuarioService(UsuarioRepository repository)
        {
            _usuarioRepository = repository;
        }

      
    }
}
