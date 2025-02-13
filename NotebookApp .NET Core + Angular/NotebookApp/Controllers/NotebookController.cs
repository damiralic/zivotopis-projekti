using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NotebookApp.Data;
using NotebookApp.Models;
using NotebookApp.Models.DTOs;

namespace NotebookApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotebookController : ControllerBase
    {
        private readonly AppDbContext dbContext;

        public NotebookController(AppDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllNotebooks()
        {
            var notebook = dbContext.Notebooks.ToList();
            return Ok(notebook);
        }

        [HttpGet("GetNotebooksByPage")]
        public IActionResult GetNotebooksByPage(int pageIndex, int pageSize, string? sortColumn, string? sortOrder, string? filterValue)
        {
            var query = dbContext.Notebooks.Select(n => n);

            if (!string.IsNullOrEmpty(filterValue))
            {
                query = query.Where(n => n.Name.ToLower().Contains(filterValue.ToLower()));
            }

            switch (sortColumn)
            {
                case "name":
                    query = sortOrder == "desc" ? query.OrderByDescending(n => n.Name) : query.OrderBy(n=>n.Name);
                    break;
                default:
                    query = query.OrderBy(n => n.Id);
                    break;
            }

            // query to get data for one page
            var onePageNotebooksQuery = query.Skip(pageSize * pageIndex).Take(pageSize);
            //  query is excecuted
            var pageNotebookResult = onePageNotebooksQuery.ToList();
            // query is executed - getting total number of records
            var totalCount = query.Count();

            var notebookPageDto = new NotebookPageDTO();
            notebookPageDto.NotebookCount = totalCount;
            notebookPageDto.allNotebooks = pageNotebookResult;

            return Ok(notebookPageDto);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetNotebook(Guid id)
        {
            var notebook = dbContext.Notebooks.FirstOrDefault(x => x.Id == id);

            if (notebook != null)
            {
                return Ok(notebook);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult AddNotebook(NotebookDTO requestNotebook)
        {
            var notebook = new Notebook
            {
                Name = requestNotebook.Name,
                Text = requestNotebook.Text
            };

            dbContext.Add(notebook);
            dbContext.SaveChanges();
            return Ok(notebook);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteNotebook([FromRoute] Guid id)
        {
            var notebook = dbContext.Notebooks.FirstOrDefault(x => x.Id == id);
            if (notebook != null)
            {
                dbContext.Remove(notebook);
                dbContext.SaveChanges();

                return Ok(notebook);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateNotebook([FromRoute]Guid id, NotebookDTO newRequest)
        {
            var notebook = dbContext.Notebooks.FirstOrDefault(y => y.Id == id);

            if (notebook != null) { 
                notebook.Name = newRequest.Name;
                notebook.Text = newRequest.Text;
                dbContext.SaveChanges();
                return Ok(notebook);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
