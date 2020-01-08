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

    public class ProductController : ControllerBase
    {
        public static List<Product> DataProduct = new List<Product>
        {
            new Product {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TypeProduct = "เครื่องราง",PriceProduct = "5999",CostProduct = "2999" ,TotalProduct = "20"},
            new Product {IdProduct = "B7784",NameProduct = "น้ำยาล้างจานปู่เค็ม",TypeProduct = "ของใช้",PriceProduct = "299",CostProduct = "199" ,TotalProduct = "0"},
            new Product {IdProduct = "R5596",NameProduct = "ไข่แดงเค็มปู่เค็ม",TypeProduct = "อาหาร",PriceProduct = "9",CostProduct = "1" ,TotalProduct = "0"},
            new Product {IdProduct = "H8897",NameProduct = "ขนมปู่เค็ม",TypeProduct = "ขนม",PriceProduct = "99",CostProduct = "29" ,TotalProduct = "0"},
            new Product {IdProduct = "S0015",NameProduct = "ครีมหลวงปู่เค็ม",TypeProduct = "เครื่องสำอาง",PriceProduct = "999",CostProduct = "499" ,TotalProduct = "0"},
            new Product {IdProduct = "A8895",NameProduct = "เสื้อยืดหลวงปู่เค็ม",TypeProduct = "เสื้อผ้า",PriceProduct = "999",CostProduct = "299" ,TotalProduct = "0"}
        };

        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProductAll()
        {
            return DataProduct.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProductById(string id)
        {
            return DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
        }

        [HttpPost]
        public Product AddProduct([FromBody] Product Productx)
        {
            // Guid g = Guid.NewGuid();            
            var item = new Product
            {
                IdProduct = Productx.IdProduct,
                NameProduct = Productx.NameProduct,
                TypeProduct = Productx.TypeProduct,
                PriceProduct = Productx.PriceProduct,
                TotalProduct = "0",
                SellTotalProduct = Productx.SellTotalProduct,
                statusclear = Productx.statusclear,
                CostProduct = Productx.CostProduct
            };

            DataProduct.Add(item);

            // User.Id = id;

            // data.Add(Userx);
            return item;
        }

        [HttpPut("{id}")]
        public Product EditProduct(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = _id.TotalProduct,
                unitProduct = Productx.unitProduct,
                CostProduct = _id.CostProduct
            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;

        }

        
        [HttpDelete("{id}")]
        public void DeleteProduct(string id)
        {
            var delete = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            DataProduct.Remove(delete);
        }

        [HttpPut("{id}")]
        public Product EditAddTotalProduct(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int Add = int.Parse(Productx.TotalProduct);
            int Totals = 0;

            if (getcheck.TotalProduct == "0")
            {
                Total = 0;
                Totals = Total + Add;
            }
            else
            {
                Totals = Total + Add;
            }

            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = Totals.ToString(),
                CostProduct = _id.CostProduct
            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Product SellTotalProduct(string id, [FromBody] Product Productx)
        {
            var _id = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataProduct.FirstOrDefault(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int Sell = int.Parse(Productx.SellTotalProduct);
            int Totals = 0;

            
                Totals = Total - Sell;
            

            var item = new Product
            {
                IdProduct = id,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = Totals.ToString(),
                CostProduct = _id.CostProduct
            };
            DataProduct.Remove(_id);
            DataProduct.Add(item);
            return item;

        }

       

    }
}