using Microsoft.EntityFrameworkCore;
using BackEnd.Models;

namespace BackEnd.Data
{
    public class DataContext : DbContext {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Contact> Contacts {get; set; }
    }
}