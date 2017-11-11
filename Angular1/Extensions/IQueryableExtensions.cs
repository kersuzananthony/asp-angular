using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Angular1.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObject,
            Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (string.IsNullOrWhiteSpace(queryObject.SortBy) || !columnsMap.ContainsKey(queryObject.SortBy))
                return query;
            
            return queryObject.IsSortAscending ? query.OrderBy(columnsMap[queryObject.SortBy]) : query.OrderByDescending(columnsMap[queryObject.SortBy]);           
        } 
    }
}