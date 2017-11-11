using System.Collections.Generic;

namespace Angular1.Core.Models
{
    public class QueryResult<T>
    {
        public int TotalItems { get; set; }
        
        public IEnumerable<T> Results { get; set; }
    }
}