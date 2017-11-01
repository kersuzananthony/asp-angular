using System.Linq;
using Angular1.Controllers.Resources;
using Angular1.Models;
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
            CreateMap<Make, MakeResource>();
            
            CreateMap<Model, ModelResource>();
            
            CreateMap<Feature, FeatureResource>();

            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact,
                    opt => opt.MapFrom(v =>
                        new ContactResource {Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone}))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
        }

        private void ResourceToDomainMapping()
        {
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.MapFrom(vr => vr.Features.Select(id => new VehicleFeature {FeatureId = id})));
        }
    }
}