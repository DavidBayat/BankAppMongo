using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace TypescriptReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IMongoCollection<User> _bankAccountCollection;
        private IMongoClient _client;

        public UserController(IMongoClient client)
        {
            _client = client;
            var database = client.GetDatabase("Bank");
            _bankAccountCollection = database.GetCollection<User>("BankAccount");
        }

        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            var results = await _bankAccountCollection.FindAsync(_ => true);
            return results.ToList();
        }

        [HttpPost]
        public async Task<bool> CreateUser(string name)
        {
            try
            {
                var user = new User { Name = name, CurrentBalance = 0 };
                await _bankAccountCollection.InsertOneAsync(user);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        [HttpGet("{id:length(24)}")]
        public List<Transaction> GetAllTransactions(string id)
        {
            var results =
                   from user in _bankAccountCollection.AsQueryable()
                   where user.Id == id
                   from trans in user.Transactions
                   select trans;

            return results.ToList();
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, int amount)
        {
            using (var session = await _client.StartSessionAsync())
            {
                session.StartTransaction();
                try
                {
                    var filter = Builders<User>.Filter.Eq("Id", id);
                    var addNewTransaction = Builders<User>.Update.Push("Transactions", new Transaction { CreatedAt = DateTime.Now, Amount = amount });

                    var currentBalance = from user in _bankAccountCollection.AsQueryable()
                                         where user.Id == id
                                         select user.CurrentBalance;

                    int updatedBalance = currentBalance.First() + amount;

                    var updateCurrentBalance = Builders<User>.Update.Set("CurrentBalance", updatedBalance);
                    await _bankAccountCollection.FindOneAndUpdateAsync(filter, addNewTransaction);
                    await _bankAccountCollection.UpdateOneAsync(filter, updateCurrentBalance);
                    await session.CommitTransactionAsync();
                    return NoContent();
                }
                catch (Exception)
                {
                    await session.AbortTransactionAsync();
                    return NotFound();
                }
            }

        }

    }
}