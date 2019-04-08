using Diagrams.Model;
using Diagrams.Services;
using Microsoft.AspNetCore.Mvc;

namespace Diagrams.Controllers
{
    [Route("api/assotiativeValues")]
    public class AssotiativeValuesController : Controller
    {
        private readonly JsonService _jsonService;
        private readonly XmlService _xmlService;

        public AssotiativeValuesController(JsonService jsonService, XmlService xmlService)
        {
            this._jsonService = jsonService;
            this._xmlService = xmlService;
        }

        [HttpPost("SaveJsonFile")]
        public ContentResult Index([FromBody]AssotiativeValues[] request)
        {
            string jsonString = this._jsonService.GetJsonString(request);
            ContentResult result = new ContentResult();
            result.Content = jsonString;
            result.ContentType = "application/json";
            result.StatusCode = 200;
            return result;
        }

        [HttpPost("SaveXmlFile")]
        public ContentResult SaveXmlFile([FromBody]AssotiativeValues[] request)
        {
            string xmlString = this._xmlService.GetXmlString(request);
            ContentResult result = new ContentResult();
            result.Content = xmlString;
            result.ContentType = "application/xml";
            result.StatusCode = 200;
            return result;
        }
    }
}