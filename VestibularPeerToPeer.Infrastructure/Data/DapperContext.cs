using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Npgsql;

namespace VestibularPeerToPeer.Infrastructure.Data
{
    public interface IDapperContext
    {
        IDbConnection CreateConnection();

        Task<IEnumerable<T>> QueryAsync<T>(string sql, object? param = null);

        Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? param = null);

        Task<int> ExecuteAsync(string sql, object? param = null);

        Task<int> ExecuteAsync(string sql, IEnumerable<object?>? bindings = null);
    }

    public class DapperContext : IDapperContext
    {
        private readonly string _connectionString;

        public DapperContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection CreateConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }

        public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object? param = null)
        {
            using var connection = CreateConnection();
            return await connection.QueryAsync<T>(sql, param);
        }

        public async Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? param = null)
        {
            using var connection = CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<T>(sql, param);
        }

        public async Task<int> ExecuteAsync(string sql, object? param = null)
        {
            using var connection = CreateConnection();
            return await connection.ExecuteAsync(sql, param);
        }

        /// <summary>
        /// Executes SQL with positional parameters from SqlKata compilation.
        /// Converts array bindings to DynamicParameters for proper Dapper handling.
        /// </summary>
        public async Task<int> ExecuteAsync(string sql, IEnumerable<object?>? bindings = null)
        {
            using var connection = CreateConnection();

            if (bindings == null || !bindings.Any())
            {
                return await connection.ExecuteAsync(sql);
            }

            // Convert bindings array to DynamicParameters for proper PostgreSQL positional parameter handling
            var parameters = new DynamicParameters();
            var bindingsList = bindings.ToList();

            for (int i = 0; i < bindingsList.Count; i++)
            {
                parameters.Add($"@p{i}", bindingsList[i]);
            }

            return await connection.ExecuteAsync(sql, parameters);
        }
    }
}
