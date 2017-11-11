using System.Collections.Generic;

namespace Angular1.Controllers.Resources
{
    public class QueryResultResource<T>
    {
        public int TotalItems { get; set; }
        
        public IEnumerable<T> Results { get; set; }
    }
}