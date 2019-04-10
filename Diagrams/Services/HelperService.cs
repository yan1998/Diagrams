using System.IO;
using System.Text;

namespace Diagrams.Services
{
    public class HelperService
    {
        public string ConvertStreamToString(Stream stream)
        {
            string result;
            byte[] bytes = new byte[stream.Length];
            int b = stream.ReadByte();
            int i = 0;
            while (b != -1)
            {
                bytes[i] = (byte)b;
                i++;
                b = stream.ReadByte();
            }
            result = Encoding.UTF8.GetString(bytes);
            return result;
        }
    }
}
