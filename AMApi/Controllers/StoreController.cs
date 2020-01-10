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

    public class StoreController : ControllerBase
    {

        public static List<Store> DataStore = new List<Store>
        {
            new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",TotalProduct="20",AddProductStore = DateTime.Now}


        };


        [HttpGet]
        public ActionResult<IEnumerable<Store>> GetStoreAll()
        {
            return DataStore.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Store> GetStoreById(string id)
        {
            return DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
        }

        [HttpPost]
        public Store AddStore([FromBody] Store Storex)
        {

            var addDate = DateTime.Now;
            var item = new Store
            {

                IdUser = Storex.IdStore,
                NameUser = Storex.NameUser,
                IdProduct = Storex.IdProduct,
                NameProduct = Storex.NameProduct,
                TotalProduct = Storex.TotalProduct,
                UnitProduct = Storex.UnitProduct,
                StatusProduct = Storex.StatusProduct,
                AddProductStore = addDate

            };

            DataStore.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public Store EditStore(string id, [FromBody] Store Storex)
        {
            var idx = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var editDate = DateTime.Now;
            var item = new Store
            {
                IdStore = id.ToString(),
                IdUser = Storex.IdUser,
                NameUser = Storex.NameUser,
                IdProduct = Storex.IdProduct,
                NameProduct = Storex.NameProduct,
                statusclear = Storex.statusclear,
                TotalProduct = Storex.TotalProduct,
                UnitProduct = Storex.UnitProduct,
                EditProductStore = editDate
            };
            DataStore.Remove(idx);
            DataStore.Add(item);
            return item;

        }

        [HttpPut("{id}")]

        public Store EditStore2(string id, [FromBody] Store Storex)
        {
            var idx = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var editDate = DateTime.Now;
            var item = new Store
            {
                NameProduct = idx.NameProduct,
                IdProduct = idx.IdProduct,
                TotalProduct = idx.TotalProduct,
                statusclear = Storex.statusclear
            };
            DataStore.Remove(idx);
            DataStore.Add(item);
            return item;

        }

        [HttpPut("{id}")]


        public Store ClearStore(string id, [FromBody] Store Storex)

        {

            var idx = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());

            var clearDate = DateTime.Now;

            var item = new Store

            {
                IdStore = id.ToString(),
                ClearProductStore = clearDate
            };
            DataStore.Remove(idx);
            return item;
        }

        [HttpPut("{id}")]
        public Store SellTotalStore(string id, [FromBody] Store Storex)
        {
            var _id = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int Sell = int.Parse(Storex.TotalProduct);
            int Totals = 0;

            if (getcheck.TotalProduct != "0")
            {
                Totals = Total - Sell;
            }
            var item = new Store
            {
                IdProduct = _id.IdProduct,
                NameProduct = _id.NameProduct,
                TotalProduct = Totals.ToString(),
            };
            DataStore.Remove(_id);
            DataStore.Add(item);
            return item;

        }

        [HttpPut("{id}")]
        public Store TotalStore(string id, [FromBody] Store Storex)
        {
            var _id = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            var getcheck = DataStore.FirstOrDefault(it => it.IdProduct == id.ToString());
            int Total = int.Parse(getcheck.TotalProduct);
            int Add = int.Parse(Storex.TotalProduct);
            int Totals = 0;

            if (getcheck.Total == "0")
            {
                Total = 0;
                Totals = Total + Add;
            }
            else
            {
                Totals = Total + Add;
            }

            var item = new Store
            {
                IdUser = Storex.IdStore,
                NameUser = Storex.NameUser,
                IdProduct = Storex.IdProduct,
                NameProduct = Storex.NameProduct,
                TotalProduct = Storex.TotalProduct,
                UnitProduct = Storex.UnitProduct,
                Total = Totals.ToString(),



            };
            DataStore.Remove(_id);
            DataStore.Add(item);
            return item;
        }
    }


}

