using SqlKata;
using SqlKata.Execution;
using VestibularPeerToPeer.Domain.Models.Usuario;

namespace VestibularPeerToPeer.Infrastructure.Schema.QueryBuilders
{
    /// <summary>
    /// Query builder for Usuario table operations using SqlKata.
    /// Encapsulates all SQL generation logic for type-safe, injection-safe queries.
    /// </summary>
    public class UsuarioQueryBuilder
    {
        /// <summary>
        /// Builds a parameterized INSERT query for cadastrando a new user.
        /// SqlKata automatically handles parameter binding to prevent injection.
        /// </summary>
        public static Query BuildInsertQuery(CadastroModelRequest usuario, int tipoUsuarioId = 1, int instituicaoId = 2)
        {
            return new Query(Tables.UsuarioTable.TableName)
                .AsInsert(new
                {
                    nome = usuario.Nome,
                    email = usuario.Email,
                    senha_hash = usuario.Senha,
                    tipo_usuario_id = tipoUsuarioId,
                    instituicao_id = instituicaoId,
                    criado_em = DateTime.UtcNow,
                    atualizado_em = DateTime.UtcNow,
                    ativo = true
                });
        }

        /// <summary>
        /// Builds a SELECT query to retrieve a user by email.
        /// </summary>
        public static Query BuildSelectByEmailQuery(string email)
        {
            return new Query(Tables.UsuarioTable.TableName)
                .Where(Tables.UsuarioTable.Columns.Email, "=", email)
                .Where(Tables.UsuarioTable.Columns.Ativo, false);
        }

        /// <summary>
        /// Builds a SELECT query to retrieve a user by ID.
        /// </summary>
        public static Query BuildSelectByIdQuery(int id)
        {
            return new Query(Tables.UsuarioTable.TableName)
                .Where(Tables.UsuarioTable.Columns.Id, "=", id)
                .Where(Tables.UsuarioTable.Columns.Ativo, false);
        }

        /// <summary>
        /// Builds a SELECT all query with soft-delete filter.
        /// </summary>
        public static Query BuildSelectAllQuery()
        {
            return new Query(Tables.UsuarioTable.TableName)
                .Where(Tables.UsuarioTable.Columns.Ativo, false);
        }

        /// <summary>
        /// Builds an UPDATE query for soft-delete (marca como deletado sem remover registro).
        /// </summary>
        public static Query BuildSoftDeleteQuery(int id)
        {
            return new Query(Tables.UsuarioTable.TableName)
                .Where(Tables.UsuarioTable.Columns.Id, "=", id)
                .AsUpdate(new
                {
                    deletado = true,
                    atualizado_em = DateTime.UtcNow
                });
        }
    }
}
