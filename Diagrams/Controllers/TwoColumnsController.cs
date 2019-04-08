using Diagrams.Model;
using Diagrams.Services;
using Microsoft.AspNetCore.Mvc;

namespace Diagrams.Controllers
{
    [Route("api/twoColumns")]
    public class TwoColumnsController : Controller
    {
        private readonly JsonService _jsonService;
        private readonly XmlService _xmlService;

        public TwoColumnsController(JsonService jsonService, XmlService xmlService)
        {
            this._jsonService = jsonService;
            this._xmlService = xmlService;
        }

        [HttpPost("SaveJsonFile")]
        public ContentResult SaveJsonFile([FromBody]TwoColumns[] request)
        {
            string jsonString = this._jsonService.GetJsonString(request);
            ContentResult result = new ContentResult();
            result.Content = jsonString;
            result.ContentType = "application/json";
            result.StatusCode = 200;
            return result;
        }

        [HttpPost("SaveXmlFile")]
        public ContentResult SaveXmlFile([FromBody]TwoColumns[] request)
        {
            string xmlString = this._xmlService.GetXmlString(request);
            ContentResult result = new ContentResult();
            result.Content = xmlString;
            result.ContentType = "application/xml";
            result.StatusCode = 200;
            return result;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}