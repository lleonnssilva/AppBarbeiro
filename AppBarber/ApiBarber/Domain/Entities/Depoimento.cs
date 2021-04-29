using ApiBarbeiro.Data;

namespace ApiBarbeiro.Domain.Entities
{
    public class Depoimento : IEntity
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Conteudo { get; set; }
        public decimal Nota { get; set; }
        public int IdUsuario { get; set; }
        public int IdBarbeiro { get; set; }

    }
}
