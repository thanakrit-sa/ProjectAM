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

    public class OrderController : ControllerBase
    {
        public static List<Order> DataOrder = new List<Order>
        {
            new Order {IdOrder = "100101" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", DateOrder = DateTime.Now, Status = "สั่งซื้อ"},
            new Order {IdOrder = "100102" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", DateOrder = DateTime.Now, Status = "รับสั่งซื้อ"},
            new Order {IdOrder = "100103" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", DateOrder = DateTime.Now, Status = "ยกเลิก"},
            new Order {IdOrder = "100104" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", DateOrder = DateTime.Now, SendDate = DateTime.Now, Status = "ส่งสินค้า"},
            new Order {IdOrder = "100105" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", DateOrder = DateTime.Now, SendDate = DateTime.Now, Status = "ได้รับแล้ว"},
        };

         [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrderAll()
        {
            return DataOrder.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Order> GetOrderById(string id)
        {
            return DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
        }

         [HttpPost]
        public Order AddOrder([FromBody] Order Orderx)
        {
            var id = Guid.NewGuid().ToString();
            var item = new Order
            {
               IdOrder = id,
               IdProduct = Orderx.IdProduct,
               NameProduct = Orderx.NameProduct,
               AmountProduct = Orderx.AmountProduct,
               PriceOrder = Orderx.PriceOrder,
               NameUser = Orderx.NameUser,
               AddressUser = Orderx.AddressUser,
               TelUser = Orderx.TelUser,
               DateOrder = DateTime.Now,
               Status = "สั่งซื้อ"
            };

            DataOrder.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Order EditOkOrder(string id, [FromBody] Order Orderx)
        {
            var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            var item = new Order
            {
               IdOrder = id,
               IdProduct = Orderx.IdProduct,
               NameProduct = Orderx.NameProduct,
               AmountProduct = Orderx.AmountProduct,
               PriceOrder = Orderx.PriceOrder,
               NameUser = Orderx.NameUser,
               AddressUser = Orderx.AddressUser,
               TelUser = Orderx.TelUser,
               DateOrder = Orderx.DateOrder,
               Status = "รับสั่งซื้อ"
            };
            DataOrder.Remove(_id);
            DataOrder.Add(item);
            return item;

        }

        [HttpPut("{id}")]
        public Order EditSendOrder(string id, [FromBody] Order Orderx)
        {
            var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            var item = new Order
            {
               IdOrder = id,
               IdProduct = Orderx.IdProduct,
               NameProduct = Orderx.NameProduct,
               AmountProduct = Orderx.AmountProduct,
               PriceOrder = Orderx.PriceOrder,
               NameUser = Orderx.NameUser,
               AddressUser = Orderx.AddressUser,
               TelUser = Orderx.TelUser,
               DateOrder = Orderx.DateOrder,
               SendDate = DateTime.Now,
               Status = "ส่งสินค้า"
            };
            DataOrder.Remove(_id);
            DataOrder.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Order EditCancelOrder(string id, [FromBody] Order Orderx)
        {
            var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            var item = new Order
            {
               IdOrder = id,
               IdProduct = Orderx.IdProduct,
               NameProduct = Orderx.NameProduct,
               AmountProduct = Orderx.AmountProduct,
               PriceOrder = Orderx.PriceOrder,
               NameUser = Orderx.NameUser,
               AddressUser = Orderx.AddressUser,
               TelUser = Orderx.TelUser,
               DateOrder = Orderx.DateOrder,
               Status = "ยกเลิก"
            };
            DataOrder.Remove(_id);
            DataOrder.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Order EditAcceptOrder(string id, [FromBody] Order Orderx)
        {
            var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            var item = new Order
            {
               IdOrder = id,
               IdProduct = Orderx.IdProduct,
               NameProduct = Orderx.NameProduct,
               AmountProduct = Orderx.AmountProduct,
               PriceOrder = Orderx.PriceOrder,
               NameUser = Orderx.NameUser,
               AddressUser = Orderx.AddressUser,
               TelUser = Orderx.TelUser,
               DateOrder = Orderx.DateOrder,
               SendDate = Orderx.SendDate,
               Status = "ได้รับแล้ว"
            };
            DataOrder.Remove(_id);
            DataOrder.Add(item);
            return item;
        }

    }

}