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

    public class ClearController : ControllerBase
    {
        public static List<Clear> DataProduct = new List<Clear>
        {
            new Clear {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="0"}           
        };

        [HttpGet]
        public ActionResult<IEnumerable<Clear>> GetClearAll()
        {
            return DataProduct.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Clear> GetCleartById(string id)
        {
            return DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
        }

        [HttpPost]
        public Clear AddProductClear([FromBody] Clear Productx)        {
                     
                     
            var item = new Clear
            {
                IdProduct = Productx.IdProduct,
                NameProduct = Productx.NameProduct,                
                TotalProduct = Productx.TotalProduct,                          
                statusclear = Productx.statusclear,                
            };
            DataProduct.Add(item);
            
            return item;
        }

        [HttpPut("{id}")]
        public Clear AddTotalClear(string id, [FromBody] Clear Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int Add = int.Parse(Productx.TotalProduct);
            int Totals = 0;

            if (getcheck.Total == null)
            {
                Total = 0;
                Totals = Total + Add;
            }
            else
            {
                Totals = Total + Add;
            }

            var item = new Clear
            {
                
                IdProduct = id,            
                TotalProduct = Productx.TotalProduct,                          
                statusclear = Productx.statusclear,                  
                NameProduct = _id.NameProduct,                
                Total = Totals.ToString(),
                
            };
            
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;
        }

        
    }

        
}