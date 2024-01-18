using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace Server.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DB
    {
        public static List<user> Responses { get; set; } = new List<user> { new user() { userId=0, name="nechama", password="nm11111" } };

    }
    public class UsersController : ApiController
    {
        CompleteMeDBEntities Context;

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(DB.Responses);
        }

        public UsersController(CompleteMeDBEntities context)
        {
            Context = context;
        }


        // POST api/values
        [HttpPost]
        public void AddUser([FromBody] string name, string password)
        {
            Context.addUser(name, password);
        }

        [HttpPost]
        public ActionResult<string> Login([FromBody] user user)
        {
            user newUser;
        }

        //// POST api/values
        //[HttpPost]
        //public void AddExample([FromBody] string drawing)
        //{
        //}

        //// PUT api/values/5
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/values/5
        //public void Delete(int id)
        //{
        //}
    }
}
