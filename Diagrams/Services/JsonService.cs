using Newtonsoft.Json;

namespace Diagrams.Services
{
    public class JsonService
    {
        public string GetJsonString<T>(T obj) where T:class
        {
            string result = JsonConvert.SerializeObject(obj);
            return result;
        }
    }
}
