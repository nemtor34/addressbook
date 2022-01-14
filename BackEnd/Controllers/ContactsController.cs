#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using BackEnd;
using BackEnd.Data;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly DataContext _context;

        public ContactsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts([FromQuery] ContactParameters qparam)
        {
            var contacts = from s in _context.Contacts
                           select s;
            if (!String.IsNullOrEmpty(qparam.SearchKey)) { 
                switch (qparam.SearchType) {
                    case 1: 
                        contacts = contacts.Where(s => s.FirstName.Contains(qparam.SearchKey));
                        break;
                    case 2:
                        contacts = contacts.Where(s => s.LastName.Contains(qparam.SearchKey));
                        break;
                    case 3:
                        contacts = contacts.Where(s => s.Address.Contains(qparam.SearchKey));
                        break;
                    case 4:
                        contacts = contacts.Where(s => s.Phone.Contains(qparam.SearchKey));
                        break;
                    default:
                        break;
            }
            }
            contacts = contacts.OrderBy(s => s.LastName).ThenBy(s => s.Id);
            var result = await PaginatedList<Contact>.CreateAsync(contacts.AsNoTracking(), qparam.PageNumber, qparam.PageSize);
            var metadata = new {
                result.TotalPages,
                result.PageIndex,
                result.HasNextPage,
                result.HasPreviousPage
            };
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));
            return result;
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }
            if (NumberExists(contact.Phone, id)) {
                return BadRequest("Phone number is already taken");
            }
            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            if (NumberExists(contact.Phone, 0)) {
                return BadRequest("Phone number is already taken");
            } else {
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync(); 
            return CreatedAtAction("GetContact", new { id = contact.Id }, contact);
            }
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            var reponse = await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }

        private bool NumberExists(string num, int currId) {
            return _context.Contacts.Any(e => e.Phone == num && e.Id != currId);
        }
    }
}
