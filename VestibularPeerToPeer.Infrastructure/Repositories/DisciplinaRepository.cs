using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using VestibularPeerToPeer.Domain.Interfaces.Repositories;
using VestibularPeerToPeer.Domain.Models;
using VestibularPeerToPeer.Infrastructure.Data;

namespace VestibularPeerToPeer.Infrastructure.Repositories
{
    public class DisciplinaRepository : IDisciplinaRepository
    {

        private readonly IDapperContext _contextDapper;

        public DisciplinaRepository(IDapperContext contextDapper)
        {
            _contextDapper = contextDapper;
        }

        public async Task<List<AvaliacaoModel>> ListarAvaliacoes()
        {

            var query = @"SELECT 
                            a.id,
                            u.nome AS usuario,
                            e.descricao AS exercicio,
                            a.data_avaliacao AS dataAvaliacao
                        FROM agendamentos a
                        JOIN usuarios u ON u.id = a.usuario_id
                        JOIN exercicios e ON e.id = a.exercicio_id
                        ORDER BY a.data_avaliacao";
            try
            {
                var result = _contextDapper.GetAll<AvaliacaoModel>(query, null, CommandType.Text);
                return result.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
