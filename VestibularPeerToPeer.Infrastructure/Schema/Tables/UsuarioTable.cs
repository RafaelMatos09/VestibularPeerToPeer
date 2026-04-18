namespace VestibularPeerToPeer.Infrastructure.Schema.Tables
{
    /// <summary>
    /// Strongly-typed table schema for 'usuarios' table in PostgreSQL.
    /// Centralized column definitions to eliminate magic strings and ensure consistency.
    /// </summary>
    public static class UsuarioTable
    {
        /// <summary>Schema name in PostgreSQL.</summary>
        public const string Schema = "public";

        /// <summary>Table name in PostgreSQL.</summary>
        public const string TableName = "usuarios";

        /// <summary>Fully qualified table reference (schema.table with PostgreSQL quotes).</summary>
        public static string QualifiedName => $"\"{Schema}\".\"{TableName}\"";

        /// <summary>All column definitions as strongly-typed constants.</summary>
        public static class Columns
        {
            /// <summary>Primary key / User ID.</summary>
            public const string Id = "id";

            /// <summary>Full name of the user.</summary>
            public const string Nome = "nome";

            /// <summary>Email address (also used as login).</summary>
            public const string Email = "email";

            /// <summary>Password hash (bcrypt or similar).</summary>
            public const string SenhaHash = "senha_hash";

            /// <summary>Foreign key to tipo_usuario (user type/role).</summary>
            public const string TipoUsuarioId = "tipo_usuario_id";

            /// <summary>Foreign key to instituicao (institution).</summary>
            public const string InstituicaoId = "instituicao_id";

            /// <summary>Account creation timestamp.</summary>
            public const string CriadoEm = "criado_em";

            /// <summary>Account update timestamp.</summary>
            public const string AtualizadoEm = "atualizado_em";

            /// <summary>Soft active flag.</summary>
            public const string Ativo = "ativo";
        }

        /// <summary>
        /// Gets all column names as an array (useful for SELECT statements).
        /// </summary>
        public static string[] GetAllColumns() => new[]
        {
            Columns.Id,
            Columns.Nome,
            Columns.Email,
            Columns.SenhaHash,
            Columns.TipoUsuarioId,
            Columns.InstituicaoId,
            Columns.CriadoEm,
            Columns.AtualizadoEm,
            Columns.Ativo
        };
    }
}
