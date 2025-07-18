using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfilesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserProfilesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserProfiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserProfile>>> GetUserProfiles()
        {
            return await _context.UserProfiles.ToListAsync();
        }

        // GET: api/UserProfiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserProfile>> GetUserProfile(int id)
        {
            var userProfile = await _context.UserProfiles.FindAsync(id);

            if (userProfile == null)
            {
                return NotFound(new { message = "User profile not found" });
            }

            return userProfile;
        }

        // POST: api/UserProfiles
        [HttpPost]
        public async Task<ActionResult<UserProfile>> PostUserProfile(UserProfile userProfile)
        {
            _context.UserProfiles.Add(userProfile);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User profile created successfully",
                userProfile
            });
        }

        // PUT: api/UserProfiles/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserProfile(int id, UserProfile userProfile)
        {
            var existingUserProfile = await _context.UserProfiles.FindAsync(id);

            if (existingUserProfile == null)
            {
                return NotFound(new { message = "User profile not found" });
            }

            existingUserProfile.Name = userProfile.Name;
            existingUserProfile.Email = userProfile.Email;
            existingUserProfile.Gender = userProfile.Gender;
            existingUserProfile.BirthDate = userProfile.BirthDate;

            _context.Entry(existingUserProfile).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User profile updated successfully",
                userProfile = existingUserProfile
            });
    
        }

        // DELETE: api/UserProfiles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserProfile(int id)
        {
            var userProfile = await _context.UserProfiles.FindAsync(id);
            if (userProfile == null)
            {
                return NotFound(new { message = "User profile not found" });
            }

            _context.UserProfiles.Remove(userProfile);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "User profile successfully deleted"
            });
    
        }
    }
}