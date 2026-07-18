using Dapper;
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
                var result = await _contextDapper.GetAll<AvaliacaoModel>(query, null, CommandType.Text);
                return result.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao listar avaliações!: {ex.Message}", ex);
            }
        }

        public async Task<List<AvaliacaoUsuarioModel>> ListaAvaliacaoUsuario()
        {            
            var query = @"SELECT 
                            u.email,
                            u.nome,
                            u.ultimo_acesso AS ultimoAcesso,
                            a.aluno_avaliado_id AS alunoAvaliadoId,
                            a.aluno_avaliador_id AS alunoAvaliadorId,
                            a.exercicio_id AS exercicioId,
                            a.nota_exercicio AS notaExercicio,
                            a.nota_comportamento_avaliado AS notaComportamentoAvaliado,
                            a.nota_comportamento_avaliador AS notaComportamentoAvaliador,
                            a.nota_total as notaTotal
                        FROM avaliacoes a
                        JOIN usuarios u 
                          ON u.id = a.aluno_avaliado_id";
            try
            {
                var result = await _contextDapper.GetAll<AvaliacaoUsuarioModel>(query, null, CommandType.Text);
                return result.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao listar avaliações!: {ex.Message}", ex);
            }
        }

        public async Task<List<AvaliacaoUsuarioModel>> ListarAvaliacaoAvaliadorId(Guid id)
        {
            var dbPara = new DynamicParameters();
            dbPara.Add("@Id", id);

            var query = @"SELECT 
                            u.email,
                            u.nome,
                            u.ultimo_acesso AS ultimoAcesso,
                            a.aluno_avaliado_id AS alunoAvaliadoId,
                            a.aluno_avaliador_id AS alunoAvaliadorId,
                            a.exercicio_id AS exercicioId,
                            a.nota_exercicio AS notaExercicio,
                            a.nota_comportamento_avaliado AS notaComportamentoAvaliado,
                            a.nota_comportamento_avaliador AS notaComportamentoAvaliador,
                            a.nota_total as notaTotal
                        FROM avaliacoes a
                        JOIN usuarios u 
                          ON u.id = a.aluno_avaliado_id
                        WHERE a.aluno_avaliador_id = @Id
                        ORDER BY a.exercicio_id, u.nome";
            try
            {
                var result = await _contextDapper.GetAll<AvaliacaoUsuarioModel>(query, dbPara, CommandType.Text);
                return result?.ToList() ?? new List<AvaliacaoUsuarioModel>();
            }
            catch(Exception ex)
            {
                throw new Exception($"Erro ao listar avaliações!: {ex.Message}", ex);
            }
        }
    }
}
