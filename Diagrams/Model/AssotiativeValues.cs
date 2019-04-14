namespace Diagrams.Model
{
    public class AssotiativeValues
    {
        public string Title { get; set; }
        public double[] Values { get; set; }
    }

    public class AssotiativeValuesTable
    {
        public AssotiativeValues[] Rows { get; set; }
        public string[] SetNames { get; set; }
    }
}
