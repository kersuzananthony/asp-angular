using System.Threading.Tasks;

namespace Angular1.Database
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}