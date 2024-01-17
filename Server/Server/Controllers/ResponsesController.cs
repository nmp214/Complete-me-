using Server;
using Server.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Server.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ResponsesController : ApiController
    {
        // GET: api/Responses
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(DB.Responses);
        }

        // GET: api/Responses/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Responses
        [HttpPost]
        public IHttpActionResult Post([FromBody] user response)
        {
            DB.Responses.Add(response);
            return Ok(DB.Responses);
        }
        //[HttpPut]
        //// PUT: api/Responses/5
        //public IHttpActionResult Put([FromBody] Response response)
        //{
        //    for (int i = 0; i < DB.Responses.Count; i++)
        //    {
        //        if (DB.Responses[i].firstName == response.firstName &&
        //            DB.Responses[i].lastName == response.lastName &&
        //            DB.Responses[i].description == response.description &&
        //            DB.Responses[i].phonNumber == response.phonNumber &&
        //            DB.Responses[i].Email == response.Email &&
        //            DB.Responses[i].likes == response.likes - 1)
        //        {
        //            DB.Responses[i] = response;
        //            return Ok(DB.Responses);
        //        }

        //    }
        //    return Ok(DB.Responses);
        //}

        // DELETE: api/Responses/5
        public void Delete(int id)
        {
        }
    }
}
