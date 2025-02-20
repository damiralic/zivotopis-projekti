using Microsoft.AspNetCore.Mvc;
using ReminderApp.Data;
using ReminderApp.Models;
using ReminderApp.Models.DTOs;

namespace ReminderApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RemainderController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public RemainderController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet] public IActionResult GetAllRemainders()
        {
            var remainders = dbContext.Remainders.ToList();
            return Ok(remainders);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetRemainder(Guid id)
        {
            var remainder = dbContext.Remainders.FirstOrDefault(x => x.Id == id);

            if(remainder != null)
            {
                return Ok(remainder);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult AddRemainder(RemainderDTO remainderDto) {
            var remainder = new Remainder
            {
                Name = remainderDto.Name,
                isCompleted = remainderDto.isCompleted,
                StartDateTime = remainderDto.StartDateTime
            };

            dbContext.Add(remainder);
            dbContext.SaveChanges();
            return Ok(remainder);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateRemainder(Guid id, RemainderDTO remainderDto)
        {
            var remainder = dbContext.Remainders.FirstOrDefault(x => x.Id == id);

            if(remainder != null)
            {
                remainder.Name = remainderDto.Name;
                remainder.isCompleted = remainderDto.isCompleted;
                remainder.StartDateTime = remainderDto.StartDateTime;
                dbContext.SaveChanges();
                return Ok(remainder);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteRemainder([FromRoute]Guid id)
        {
            var remainder = dbContext.Remainders.FirstOrDefault(x => x.Id == id);
            if(remainder != null)
            {
                dbContext.Remove(remainder);
                dbContext.SaveChanges();
                return Ok(remainder);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
