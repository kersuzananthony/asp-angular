using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Angular1.Controllers.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Angular1.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private readonly IConfiguration _configuration;

        public AuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }   
        
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult RequestToken([FromBody] TokenRequest request)
        {
            if (request.Username != "Anthony" || request.Password != "qqqqqq")
                return Unauthorized();
            
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, request.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["SecurityKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "localhost:5000",
                audience: "localhost:5000",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}