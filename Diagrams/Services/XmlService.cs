using Diagrams.Model;
using System.IO;
using System.Xml.Serialization;

namespace Diagrams.Services
{
    public class XmlService
    {
        public string SerializeToXml<T>(T obj) where T : class
        {
            string result;
            using (StringWriter stringWriter = new StringWriter())
            {
                XmlSerializer serializer = new XmlSerializer(typeof(T));
                serializer.Serialize(stringWriter, obj);
                result = stringWriter.ToString();
            };
            return result;
        }

        public TwoColumns[] DeserializeTwoColumnsArray(string xml)
        {
            TwoColumns[] result;
            using (StringReader stringReader = new StringReader(xml))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(TwoColumns[]));
                result = (TwoColumns[])serializer.Deserialize(stringReader);
            };
            return result;
        }

        public AssotiativeValuesTable DeserializeAssotiativeValuesTableArray(string xml)
        {
            AssotiativeValuesTable result;
            using (StringReader stringReader = new StringReader(xml))
            {
                XmlSerializer serializer = new XmlSerializer(typeof(AssotiativeValuesTable));
                result = (AssotiativeValuesTable)serializer.Deserialize(stringReader);
            };
            return result;
        }
    }
}
