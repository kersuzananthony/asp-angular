using System.Threading.Tasks;

namespace Angular1.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}