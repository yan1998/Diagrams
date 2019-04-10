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
        private readonly HelperService _helperService;

        public AssotiativeValuesController(JsonService jsonService, XmlService xmlService, HelperService helperService)
        {
            this._jsonService = jsonService;
            this._xmlService = xmlService;
            this._helperService = helperService;
        }

        [HttpPost("SaveJsonFile")]
        public ContentResult Index([FromBody]AssotiativeValues[] request)
        {
            string jsonString = this._jsonService.SerializeToJson(request);
            ContentResult result = new ContentResult();
            result.Content = jsonString;
            result.ContentType = "application/json";
            result.StatusCode = 200;
            return result;
        }

        [HttpPost("UploadJsonFile"), DisableRequestSizeLimit]
        public AssotiativeValues[] UploadJsonFile()
        {
            string str = this._helperService.ConvertStreamToString(Request.Form.Files[0].OpenReadStream());
            AssotiativeValues[] result = this._jsonService.DeserializeAssotiativeValuesArray(str);
            return result;
        }

        [HttpPost("SaveXmlFile")]
        public ContentResult SaveXmlFile([FromBody]AssotiativeValues[] request)
        {
            string xmlString = this._xmlService.SerializeToXml(request);
            ContentResult result = new ContentResult();
            result.Content = xmlString;
            result.ContentType = "application/xml";
            result.StatusCode = 200;
            return result;
        }

        [HttpPost("UploadXmlFile"), DisableRequestSizeLimit]
        public AssotiativeValues[] UploadXmlFile()
        {
            string str = this._helperService.ConvertStreamToString(Request.Form.Files[0].OpenReadStream());
            AssotiativeValues[] result = this._xmlService.DeserializeAssotiativeValuesArray(str);
            return result;
        }
    }
}