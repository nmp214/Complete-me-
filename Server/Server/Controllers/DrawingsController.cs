using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Server.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]

    public class DrawingsController : ApiController
    {
        CompleteMeDBEntities Context = new CompleteMeDBEntities();

        [HttpGet]
        [ActionName("getMyDrawings")]

        public IHttpActionResult GetDrawingsByUser(int userId)
        {
            List<getDrawingsByUser_Result> myDrawings = Context.getDrawingsByUser(userId).ToList();
            return Ok(myDrawings);
        }

        [HttpGet]
        [ActionName("getExampleDrawings")]

        public IHttpActionResult GetDrawingsByShape(int shapeId)
        {
            List<getDrawingsByShape_Result> exampleDrawings = Context.getDrawingsByShape(shapeId).ToList();
            return Ok(exampleDrawings);
        }

        [HttpPost]
        public void AddDrawing([FromBody] drawing drawing)
        {
            Context.addDrawing(drawing.name, drawing.shapeId, drawing.userId, drawing.displayDrawingUrl, drawing.drawingUrl, drawing.isPublished);
        }

        [HttpPut]
        public void UpdateDrawing(int id, bool isPublished)
        {
            Context.updateDrawing(id, isPublished);
        }

        [HttpDelete]
        public void Delete(int id)
        {
            Context.deleteDrawing(id);
        }
    }
}