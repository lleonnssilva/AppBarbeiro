using ApiBarbeiro.Domain.Entities;
using ApiBarbeiro.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiBarbeiro.Controllers
{
    [Route("v1/[controller]")]
    public class BarbeiroController : ControllerBase
    {
      

        private readonly IBarbeiroRepository _barbeiroRepo;
        private readonly IServicoRepository _servicosRepo;
        private readonly IFotoRepository _fotosRepo;
        private readonly IDepoimentoRepository _depoimentosRepo;
        private readonly IAgendaRepository _agendaRepo;
        public BarbeiroController(
            IBarbeiroRepository barbeiroRepo, 
            IServicoRepository servicosRepo, 
            IFotoRepository fotosRepo, 
            IDepoimentoRepository depoimentosRepo, 
            IAgendaRepository agendaRepo)
        {
            _barbeiroRepo = barbeiroRepo;
            _servicosRepo = servicosRepo;
            _fotosRepo = fotosRepo;
            _depoimentosRepo = depoimentosRepo;
            _agendaRepo = agendaRepo;

        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "cliente,barbeiro,administrador")]
        public async Task<ActionResult<Barbeiro>> GetByID(int id)
        {
            var barbeiro = await _barbeiroRepo.GetByID(id);
            var servicos = await _servicosRepo.GetAll();
            var fotos = await _fotosRepo.GetByBarbeiroID(id);
            var depoimentos = await _depoimentosRepo.GetByBarbeiroID(id);
            var agenda = await _agendaRepo.GetByBarbeiroID(id);

            Barbeiro barber = new Barbeiro(
             barbeiro.IdBarbeiro,  
             barbeiro.Avatar,  
             barbeiro.Nome,  
             barbeiro.Distancia,  
             barbeiro.Latitude,  
             barbeiro.Longitude,  
             barbeiro.Estrelas
            );
            barber.Depoimentos = depoimentos;
            barber.Servicos = servicos;
            barber.Fotos = fotos;
            barber.Horarios = agenda;



            return barber;
        }

        [HttpGet]
        [Route("listar")]
        [Authorize(Roles = "cliente,barbeiro,administrador")]
        public async Task<ActionResult<List<Barbeiro>>> GetAll()
        {
            return await _barbeiroRepo.GetAll();
        }
    }
}
