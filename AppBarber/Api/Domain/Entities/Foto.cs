using ApiBarbeiro.Data;

namespace ApiBarbeiro.Domain.Entities
{
    public class Foto  : IEntity
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int IdBarbeiro { get; set; }
    }
}
