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
        private readonly HelperService _helperService;

        public TwoColumnsController(JsonService jsonService, XmlService xmlService, HelperService helperService)
        {
            this._jsonService = jsonService;
            this._xmlService = xmlService;
            this._helperService = helperService;
        }

        [HttpPost("SaveJsonFile")]
        public ContentResult SaveJsonFile([FromBody]TwoColumns[] request)
        {
            string jsonString = this._jsonService.SerializeToJson(request);
            ContentResult result = new ContentResult();
            result.Content = jsonString;
            result.ContentType = "application/json";
            result.StatusCode = 200;
            return result;
        }

        [HttpPost("UploadJsonFile"), DisableRequestSizeLimit]
        public TwoColumns[] UploadJsonFile()
        {
            string str = this._helperService.ConvertStreamToString(Request.Form.Files[0].OpenReadStream());
            TwoColumns[] result = this._jsonService.DeserializeTwoColumnsArray(str);
            return result;
        }

        [HttpPost("SaveXmlFile")]
        public ContentResult SaveXmlFile([FromBody]TwoColumns[] request)
        {
            string xmlString = this._xmlService.SerializeToXml(request);
            ContentResult result = new ContentResult();
            result.Content = xmlString;
            result.ContentType = "application/xml";
            result.StatusCode = 200;
            return result;
        }

        [HttpPost("UploadXmlFile"), DisableRequestSizeLimit]
        public TwoColumns[] UploadXmlFile()
        {
            string str = this._helperService.ConvertStreamToString(Request.Form.Files[0].OpenReadStream());
            TwoColumns[] result = this._xmlService.DeserializeTwoColumnsArray(str);
            return result;
        }
    }
}