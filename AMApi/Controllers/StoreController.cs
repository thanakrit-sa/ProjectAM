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
            new Store {IdProduct = "C0015",NameProduct = "น้ำมนต์หลวงปู่เค็ม",UnitProduct="20"}
            

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
                UnitProduct = Storex.UnitProduct,
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
                UnitProduct = Storex.UnitProduct,
                EditProductStore = editDate
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



    }


}

