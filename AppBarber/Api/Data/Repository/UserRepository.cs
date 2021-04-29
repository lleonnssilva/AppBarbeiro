using ApiBarbeiro.Domain.Entities;
using System.Collections.Generic;
using System.Linq;


namespace ApiBarbeiro.Repositories
{
    public static class UserRepository
    {
        public static Usuario Get(string username, string password)
        {
            var users = new List<Usuario>();
            users.Add(new Usuario { Id = 1, Username = "cliente", Password = "cliente", Role = "cliente" });
            users.Add(new Usuario { Id = 2, Username = "barbeiro", Password = "barbeiro", Role = "barbeiro" });
            users.Add(new Usuario { Id = 3, Username = "administrador", Password = "administrador", Role = "administrador" });
            return users.Where(x => x.Username.ToLower() == username.ToLower() && x.Password == x.Password).FirstOrDefault();
        }
    }
}