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

    public class UserController : ControllerBase
    {
        public static List<User> DataUser = new List<User>
        {
            new User { IdUser = "1", NameUser = "admin1" , Username =  "1234", Password = "1234" ,TelUser = "0165466516" , LevelUser = "Admin" ,AddressUser = "15/8 ขอนแก่น"},
            new User { IdUser = "2", NameUser = "admin2" , Username =  "12345", Password = "12345" ,TelUser = "0665606411" , LevelUser = "Meneger" ,AddressUser = "8/1 นครพนม"},
            new User { IdUser = "3", NameUser = "admin3" , Username =  "123456", Password = "123456" ,TelUser = "0916113237" , LevelUser = "Head" ,AddressUser = "15/8 นครราชสีมา"}
        };

        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUserAll()
        {
            return DataUser.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserById(string id)
        {
            return DataUser.FirstOrDefault(it => it.IdUser == id.ToString());
        }

        [HttpPost]
        public User AddUser([FromBody] User Userx)
        {
            var id = Guid.NewGuid().ToString();
            var item = new User
            {
                IdUser = id,
                NameUser = Userx.NameUser,
                TelUser = Userx.TelUser,
                Username = Userx.Username,
                Password = Userx.Password,
                LevelUser = Userx.LevelUser,
                AddressUser = Userx.AddressUser
            };

            DataUser.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public User EditUser(string id, [FromBody] User Userx)
        {
            var _id = DataUser.FirstOrDefault(it => it.IdUser == id.ToString());
            var item = new User
            {
                IdUser = id,
                NameUser = Userx.NameUser,
                TelUser = Userx.TelUser,
                Username = Userx.Username,
                Password = Userx.Password,
                LevelUser = Userx.LevelUser,
                AddressUser = Userx.AddressUser
            };
            DataUser.Remove(_id);
            DataUser.Add(item);
            return item;

        }

        [HttpDelete("{id}")]
        public void DeleteUser(string id)
        {
            var delete = DataUser.FirstOrDefault(it => it.IdUser == id.ToString());
            DataUser.Remove(delete);
        }


    }

}