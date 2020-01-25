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

        // public static List<Stock> DataStock = new List<Stock>
        // {
        // };
        public static List<DataStockPerMonth> DataProductStock = new List<DataStockPerMonth>
        {
        };
        [HttpGet]
        public ActionResult<IEnumerable<DataStockPerMonth>> GetStockAll()
        {
            return DataProductStock.ToList();
        }

        [HttpGet]
        // public ActionResult<IEnumerable<Stock>> GetStockAll2()
        // {
        //     return DataStock.ToList();
        // }

        [HttpGet("{id}")]
        public ActionResult<DataStockPerMonth> GetStockById(string id)
        {
            return DataProductStock.FirstOrDefault(it => it.IdStock == id.ToString());
        }
        // [HttpPost]
        // public Stock AddStock([FromBody] Product Stockx)
        // {
        //     Guid id = Guid.NewGuid();
        //     var addDate = DateTime.Now;

        //     var item = new Stock
        //     {

        //         // IdStock = id.ToString(),
        //         IdProduct = Stockx.IdProduct,
        //         NameProduct = Stockx.NameProduct,
        //         TotalProduct = Stockx.TotalProduct,
        //         TypeProduct = Stockx.TypeProduct,
        //         PriceProduct = Stockx.PriceProduct,
        //         CostProduct = Stockx.CostProduct,
        //         Total = Stockx.Total,
        //         AmountProduct = Stockx.AmountProduct,
        //         // DataProductPerMonth = DataStock.ToArray(),
        //         // StockPerMonth = addDate

        //     };

        //     DataStock.Add(item);
        //     return item;

        // }
        [HttpPost]
        public DataStockPerMonth AddStock2()
        {
            Guid id = Guid.NewGuid();
            var addDate = DateTime.Now;


            var item2 = new DataStockPerMonth
            {

                IdStock = id.ToString(),
                DataProductPerMonth = DataProductStock.ToArray(),
                StockPerMonth = addDate

            };

            DataProductStock.Add(item2);
            return item2;

        }

    }
}

