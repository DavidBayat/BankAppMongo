using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TypescriptReact
{
    public class Transaction
    {
        public DateTime CreatedAt { get; set; }
        public int Amount { get; set; }
    }
}
