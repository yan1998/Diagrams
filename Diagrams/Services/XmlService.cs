using System.IO;
using System.Xml.Serialization;

namespace Diagrams.Services
{
    public class XmlService
    {
        public string GetXmlString<T>(T obj) where T : class
        {
            string result = "";
            using (StringWriter stringwriter = new StringWriter())
            {
                XmlSerializer serializer = new XmlSerializer(obj.GetType());
                serializer.Serialize(stringwriter, obj);
                result = stringwriter.ToString();
            };
            return result;
        }
    }
}
