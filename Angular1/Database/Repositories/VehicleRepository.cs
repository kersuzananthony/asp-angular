﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Angular1.Core;
using Angular1.Core.Models;
using Angular1.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Angular1.Database.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext _context;

        public VehicleRepository(VegaDbContext context)
        {
            _context = context;
        }

        public async Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery queryObject)
        {
            var query = _context.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .AsQueryable();

            if (queryObject.MakeId.HasValue)
            {
                query = query.Where(v => v.Model.MakeId == queryObject.MakeId.Value);
            }

            if (queryObject.ModelId.HasValue)
            {
                query = query.Where(v => v.ModelId == queryObject.ModelId.Value);
            }
            
            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = vehicle => vehicle.Model.Make.Name,
                ["mode"] = vehicle => vehicle.Model.Name,
                ["contactName"] = vehicle => vehicle.ContactName
            };

            query = query.ApplyOrdering(queryObject, columnsMap);

            var result = new QueryResult<Vehicle> { TotalItems = await query.CountAsync() };

            query = query.ApplyPaging(queryObject);

            result.Results = await query.ToListAsync();

            return result;
        }

        public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await _context.Vehicles.FindAsync(id);
            }
            else
            {
                return await _context.Vehicles
                    .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                    .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                    .SingleOrDefaultAsync(v => v.Id == id);
            }
        }

        public void Add(Vehicle vehicle)
        {
            _context.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            _context.Vehicles.Remove(vehicle);
        }
    }
    
    
}