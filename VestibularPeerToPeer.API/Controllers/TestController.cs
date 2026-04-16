using Microsoft.AspNetCore.Mvc;
using VestibularPeerToPeer.Infrastructure.Data;

namespace VestibularPeerToPeer.API.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        private readonly IDapperContext _dapperContext;

        public TestController(IDapperContext dapperContext)
        {
            _dapperContext = dapperContext;
        }

        [HttpGet]
        public async Task<IActionResult> Test()
        {
            var result = await _dapperContext.QueryFirstOrDefaultAsync<string>(
                "SELECT 'Conectado com sucesso!'"
            );

            return Ok(result);
        }
    }
}