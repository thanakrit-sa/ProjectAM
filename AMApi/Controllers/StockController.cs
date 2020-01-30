using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace AMApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]

    public class StockController : ControllerBase
    {   
        public static List<Stock> Stock = new List<Stock>
        {
        };
        [HttpGet]
        public ActionResult<IEnumerable<Stock>> GetStockAll()
        {
            return Stock.ToList();
        }
       
        

        [HttpGet("{id}")]
        public ActionResult<Stock> GetStockById(string id)
        {
            return Stock.FirstOrDefault(it => it.IdStock == id.ToString());
        } 
    
        [HttpPost]
        public Stock AddStockTest([FromBody] Stock Stockx)
        {
            Guid id = Guid.NewGuid();
            var addDate = DateTime.Now;           
            var item = new Stock
            {
                IdStock = id.ToString(),
                DataProductPerMonth = Stockx.DataProductPerMonth.ToArray(),
                StockPerMonth = addDate.ToString()
            };

            Stock.Add(item);
            return item;

        }

    }
}

