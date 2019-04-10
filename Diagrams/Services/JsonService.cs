using Diagrams.Model;
using Newtonsoft.Json;

namespace Diagrams.Services
{
    public class JsonService
    {
        public string SerializeToJson<T>(T obj) where T:class
        {
            string result = JsonConvert.SerializeObject(obj);
            return result;
        }

        public TwoColumns[] DeserializeTwoColumnsArray(string json)
        {
            TwoColumns[] result = JsonConvert.DeserializeObject<TwoColumns[]>(json);
            return result;
        }

        public AssotiativeValues[] DeserializeAssotiativeValuesArray(string json)
        {
            AssotiativeValues[] result = JsonConvert.DeserializeObject<AssotiativeValues[]>(json);
            return result;
        }
    }
}
