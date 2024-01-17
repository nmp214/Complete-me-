using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Server.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ShapesController : ApiController
    {
        CompleteMeDBEntities Context = new CompleteMeDBEntities();

        [HttpGet]
        [ActionName("getShapesByLevel")]
        public IHttpActionResult GetShapesByLevel(int level)
        {
            List<getShapesAccordingToLevel_Result> shapes= Context.getShapesAccordingToLevel(level).ToList();
            return Ok(shapes);
        }

        [HttpGet]
        [ActionName("getShape")]
        public IHttpActionResult GetShape(int shapeId)
        {
            List<getShape_Result> shape = Context.getShape(shapeId).ToList();
            return Ok(shape);
        }
    }
}