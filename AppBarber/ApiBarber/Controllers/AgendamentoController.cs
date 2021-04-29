using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("v1/agendamento")]
    public class AgendamentoController : ControllerBase
    {

        private readonly IAgendaRepository _agendaRepo;
        public AgendamentoController(
            IAgendaRepository agendaRepo)
        {
            _agendaRepo = agendaRepo;

        }
        [HttpPost]
        [Route("agendar")]
       // [Authorize(Roles = "cliente")]
        public async Task<ActionResult<dynamic>> Agendar([FromBody] AgendaServico model)
        {
            var result = await _agendaRepo.Insert(model);

            if (result == 0)
                return NotFound(new { message = "Erro ao Cadastrar agendamento!." });

            return new
            {
               sucesso = true
            };
        }

       
        [HttpGet("cliente/listar/{id}")]
         [Authorize(Roles = "cliente")]
        public async  Task<ActionResult<List<AgendaServico>>> Get(int id)
        {
            var lista = await _agendaRepo.GetAgendamentoClienteID(id);


          
            return lista; 
        }
       
    }
}
