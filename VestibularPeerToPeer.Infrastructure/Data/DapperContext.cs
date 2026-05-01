using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data.Common;
using Npgsql;

namespace VestibularPeerToPeer.Infrastructure.Data
{
    public interface IDapperContext
    {
        DbConnection GetDbConnection();

        Task<T?> Get<T>(string sql, object? param = null, CommandType commandType = CommandType.Text);

        Task<IEnumerable<T>> GetAll<T>(string sql, object? param = null, CommandType commandType = CommandType.Text);

        Task<IEnumerable<T>> GetAllAsync<T>(string sql, object? param = null, CommandType commandType = CommandType.Text);

        Task<T?> GetAsync<T>(string sql, object? param = null, CommandType commandType = CommandType.Text);

        int Execute(string sql, object? param = null, CommandType commandType = CommandType.Text);

        Task<int> ExecuteAsync(string sql, object? param = null, CommandType commandType = CommandType.Text);
    }

    public class DapperContext : IDapperContext
    {
        private readonly string _connectionString;

        public DapperContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public DbConnection GetDbConnection()
        {
            return new NpgsqlConnection(_connectionString);
        }

        public async Task<T?> Get<T>(string sql, object? param = null, CommandType commandType = CommandType.Text)
        {
            using var connection = GetDbConnection();
            return connection.QueryFirstOrDefault<T>(sql, param, commandType: commandType);
        }

        public async Task<IEnumerable<T>> GetAll<T>(string sql, object? param = null, CommandType commandType = CommandType.Text)
        {
            using var connection = GetDbConnection();
            return connection.Query<T>(sql, param, commandType: commandType);
        }

        public async Task<IEnumerable<T>> GetAllAsync<T>(string sql, object? param = null, CommandType commandType = CommandType.Text)
        {
            using var connection = GetDbConnection();
            return await connection.QueryAsync<T>(sql, param, commandType: commandType);
        }

        public async Task<T?> GetAsync<T>(string sql, object? param = null, CommandType commandType = CommandType.Text)
        {
            using var connection = GetDbConnection();
            return await connection.QueryFirstOrDefaultAsync<T>(sql, param, commandType: commandType);
        }

        public int Execute(string sql, object? param = null, CommandType commandType = CommandType.Text)
        {
            using var connection = GetDbConnection();
            return connection.Execute(sql, param, commandType: commandType);
        }

        public async Task<int> ExecuteAsync(string sql, object? param = null, CommandType commandType = CommandType.Text)
        {
            using var connection = GetDbConnection();
            return await connection.ExecuteAsync(sql, param, commandType: commandType);
        }
    }
}
