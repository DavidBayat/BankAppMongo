using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TypescriptReact
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Name { get; set; } = null!;

        public int CurrentBalance { get; set; }

        public List<Transaction> Transactions { get; set; } = new List<Transaction>();
    }
}