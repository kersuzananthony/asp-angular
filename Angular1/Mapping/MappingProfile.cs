using System.Linq;
using Angular1.Controllers.Resources;
using Angular1.Core.Models;
using AutoMapper;

namespace Angular1.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            DomainToResourceMapping();
            ResourceToDomainMapping();
        }

        private void DomainToResourceMapping()
        {
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            
            CreateMap<Make, MakeResource>();

            CreateMap<Make, KeyValuePairResource>();

            CreateMap<Model, KeyValuePairResource>();

            CreateMap<Feature, KeyValuePairResource>();

            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Contact,
                    opt => opt.MapFrom(v =>
                        new ContactResource {Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone}))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));

            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact,
                    opt => opt.MapFrom(v =>
                        new ContactResource {Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone}))
                .ForMember(vr => vr.Features,
                    opt => opt.MapFrom(v =>
                        v.Features.Select(vf => new KeyValuePairResource {Id = vf.Feature.Id, Name = vf.Feature.Name})))
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make));

            CreateMap<Photo, PhotoResource>();
        }

        private void ResourceToDomainMapping()
        {
            CreateMap<VehicleQueryResource, VehicleQuery>();
            
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    // Remove unselected features
                    var removeFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId)).ToList();
                    foreach (var f in removeFeatures)
                        v.Features.Remove(f);

                    // Add new features
                    var addedFeatures = vr.Features.Where(f => v.Features.All(vf => vf.FeatureId != f))
                        .Select(id => new VehicleFeature { FeatureId = id});
                    
                    foreach (var f in addedFeatures)
                        v.Features.Add(f);
                });
        }
    }
}