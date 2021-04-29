using ApiBarbeiro.Data;
using System.Collections.Generic;

namespace ApiBarbeiro.Domain.Entities
{
    public class Usuario : IEntity
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public List<AgendaServico> Agendamentos { get; set; }
    }
}
