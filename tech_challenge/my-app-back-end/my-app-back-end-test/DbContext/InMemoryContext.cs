using Microsoft.EntityFrameworkCore;
using my_app_back_end.Models;
using System;
using System.Collections.Generic;

namespace my_app_back_end_test.DbContext
{
    class InMemoryContext
    {
        public static AppDbContext InitContext(Guid guid) {
            var options = new DbContextOptionsBuilder<AppDbContext>().UseInMemoryDatabase(databaseName: $"AppDbContext_{guid}").Options;
            AppDbContext context = new AppDbContext(options);
            return context;
        }

        public static AppDbContext InitContext<T>(Guid guid, List<T> list) {
            AppDbContext context = InitContext(guid);

            if (list != null && list.Count > 0) {
                AddData(list, context);
            }

            return context;
        }

        public static void AddData<T>(List<T> list, AppDbContext context) {
            foreach (var item in list) {
                AddData(item, context);
            }
            context.SaveChanges();
        }

        public static void AddData(Object data, AppDbContext context) {
            context.Entry(data).State = EntityState.Added;
            context.SaveChanges();
        }
    }
}
