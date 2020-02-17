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
            // new Order {IdOrder = "100201" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/12/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="1234"},
            // new Order {IdOrder = "100101" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/12/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="6857"},
            // new Order {IdOrder = "100102" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/11/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="7845"},
            // new Order {IdOrder = "100103" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/10/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="7652"},
            // new Order {IdOrder = "100104" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "02/09/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="2547"},
            // new Order {IdOrder = "100105" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/08/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="3148"},
            // new Order {IdOrder = "100106" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/07/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="2365"},
            // new Order {IdOrder = "100107" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/06/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="4900"},
            // new Order {IdOrder = "100108" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "02/05/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="6577"},
            // new Order {IdOrder = "100109" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/04/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="7500"},
            // new Order {IdOrder = "100110" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/03/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="7000"},
            // new Order {IdOrder = "100111" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "03/02/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="5999"},
            // new Order {IdOrder = "100112" , IdProduct = "1", NameProduct = "น้ำมนต์หลวงปู่เค็ม", AmountProduct="1",DateOrder =  "02/01/2563 13:28:15",  Status = "สั่งซื้อ", UserOrder = "admin1",PriceOrder ="8000"},
        };


        public static List<Product> DataProduct = new List<Product>
        {

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

        [HttpGet("{data}")]
        public ActionResult<IEnumerable<Order>> GetOrderbyUsername(string data)
        {
            return DataOrder.ToList().FindAll(it => it.UserOrder == data);
        }

      [HttpGet("{data}/{data2}")]
        public ActionResult<IEnumerable<Order>> GetOrderdatebyfindallbyyrearandmonth(string data, string data2)
        {
            return DataOrder.ToList().FindAll(it => (DateTime.Parse(it.DateOrder).Year.ToString() == data)&&((DateTime.Parse(it.DateOrder).Month.ToString() == data2)));
        }

        [HttpGet("{data}")]
        public ActionResult<IEnumerable<Order>> GetOrderdatebyfindall(string data)
        {
            return DataOrder.ToList().FindAll(it => DateTime.Parse(it.DateOrder).Month.ToString() == data);
        }
         [HttpGet("{data}")]
        public ActionResult<IEnumerable<Order>> GetOrderdatebyfindallbyyear(string data)
        {
            return DataOrder.ToList().FindAll(it => DateTime.Parse(it.DateOrder).Year.ToString() == data);
        }

        [HttpPost]
        public Order AddOrder([FromBody] Order Orderx)
        {

            var text = "OD";
            var textsub = text.Substring(0, 1).ToString();
            var id = Guid.NewGuid().ToString();
            var textid = text + "-" + id.Substring(0, 4);

            // var split = id.Split("",5).ToString();
            // var textID = text + split.ToString() ;
            var item = new Order
            {
                IdOrder = textid,
                IdProduct = Orderx.IdProduct,
                NameProduct = Orderx.NameProduct,
                AmountProduct = Orderx.AmountProduct,
                PriceOrder = Orderx.PriceOrder,
                NameUser = Orderx.NameUser,
                AddressUser = Orderx.AddressUser,
                TelUser = Orderx.TelUser,
                UserOrder = Orderx.UserOrder,
                DateOrder = DateTime.Now.ToString("dd/MM/yyyy"),
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
                UserOrder = Orderx.UserOrder,
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
                SendDate = DateTime.Now.ToString("dd/MM/yyyy"),
                UserOrder = Orderx.UserOrder,
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
                UserOrder = Orderx.UserOrder,
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
                UserOrder = Orderx.UserOrder,
                Status = "ได้รับแล้ว"
            };
            DataOrder.Remove(_id);
            DataOrder.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Order CancelSellTotalProduct(string id, [FromBody] Order Orderx)
        {
            var _id = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            var getcheck = DataOrder.FirstOrDefault(it => it.IdOrder == id.ToString());
            // จำนวนขาย
            int SellTotal = int.Parse(getcheck.AmountProduct);
            int Sell = int.Parse(Orderx.AmountProduct);
            int SellTotals = 0;

            // จำนวนทั้งหมด      
            int AllTotal = int.Parse(getcheck.TotalProduct);
            int All = int.Parse(Orderx.AmountProduct);
            int AllTotals = 0;


            if (getcheck.AmountProduct != "0")
            {
                SellTotals = SellTotal - SellTotal;
                AllTotals = AllTotal + SellTotal;
            }
            else
            {
                SellTotals = SellTotal - SellTotal;
                AllTotals = AllTotal + AllTotal;
            }

            var item = new Order
            {
                IdOrder = id,
                IdProduct = Orderx.IdProduct,
                NameProduct = _id.NameProduct,
                TypeProduct = _id.TypeProduct,
                PriceProduct = _id.PriceProduct,
                TotalProduct = getcheck.AmountProduct,
                Total = AllTotals.ToString(),
                StatusProduct = _id.StatusProduct,
                AmountProduct = SellTotals.ToString(),
                CostProduct = _id.CostProduct,

            };
            DataOrder.Remove(_id);
            DataOrder.Add(item);
            return item;
        }


    }

}