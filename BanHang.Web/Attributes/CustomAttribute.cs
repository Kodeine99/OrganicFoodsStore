using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using System.Linq;
using DARS.WebAPI.Utility;
using Microsoft.AspNetCore.Http;
using BanHang.Security.Common;
using BanHang.Security.Extension;

namespace BanHang.Web.Attributes
{
    public class CustomAuthoRequire : IAuthorizationRequirement
    {
        public List<UserTypeEnum> AppceptUserTypes { get; set; }

        public CustomAuthoRequire(string policyName = "")
        {
            this.AppceptUserTypes = new List<UserTypeEnum>() { UserTypeEnum.admin };
            AppceptUserTypes.AddRange(RoleHandle.GetRoles(policyName));
        }
    }

    public class CustomAuthorizationHandle : AuthorizationHandler<CustomAuthoRequire>
    {
        protected IAuthozirationUtility _authozirationUtility;
        protected IHttpContextAccessor _httpContextAccessor;
        public CustomAuthorizationHandle(IAuthozirationUtility authozirationUtility, IHttpContextAccessor httpContextAccessor)
        {
            _authozirationUtility = authozirationUtility;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CustomAuthoRequire requirement)
        {
            try
            {
                HttpContext httpContext = _httpContextAccessor.HttpContext;
                var jwtToken = _authozirationUtility.GetRequestAccessToken(httpContext);
                var roleClaim = jwtToken.GetClaimValue(JwtRegisteredClaimNames.Typ);
                var roles = RoleHandle.GetRoles(roleClaim);

                var currentAcceptRoles = roles.Select(x => (int)x).FirstOrDefault(y => requirement.AppceptUserTypes.Select(z => (int)z).Contains(y));
                if (currentAcceptRoles > 0)
                    context.Succeed(requirement);
                else
                    context.Fail();

                return Task.FromResult(0);
            }
            catch
            {
                context.Fail();
                return Task.FromResult(0);
            }

        }
    }

    public static class RoleHandle
    {
        public static List<UserTypeEnum> GetRoles(string roleStrings)
        {
            var result = new List<UserTypeEnum>() { };
            try
            {
                if (!string.IsNullOrEmpty(roleStrings))
                {
                    var listRole = roleStrings.Split(",");

                    foreach (var role in listRole.Distinct().ToList())
                    {
                        result.Add((UserTypeEnum)Enum.Parse(typeof(UserTypeEnum), role));
                    }
                }

                return result;
            }
            catch (Exception)
            {
                return result;
            }
        }
    }
}