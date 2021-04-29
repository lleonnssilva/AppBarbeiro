using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Repositories;
using ApiBarbeiro.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ApiBarbeiro.Controllers
{
    [Route("v1/account")]
    public class AccountController : Controller
    {

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Authenticate([FromBody] Usuario model)
        {
            var user = UserRepository.Get(model.Username, model.Password);

            if (user == null)
                return NotFound(new { message = "Usuário ou senha inválidos" });

            var token = TokenService.GenerateToken(user);
            user.Password = "";
            return new
            {
                avatar = "https://api.b7web.com.br/devbarber/media/avatars/2.png",
                user = user,
                token = token
            };
        }
    }
}
