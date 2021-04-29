using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
       
        [HttpGet]
        public String Get()
        {

            return "Api Barbeiro V1.0";
        }
    }
}
