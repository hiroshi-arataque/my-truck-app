using Microsoft.AspNetCore.Mvc;
using my_app_back_end.Controllers;
using my_app_back_end.Models;
using my_app_back_end_test.DbContext;
using my_app_back_end_test.Utils.Arrange;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace my_app_back_end_test
{
    public class ModelsControllerTest
    {
        [Fact()]
        public void GetAllModelsTest() {
            //ARRANGE
            using var context = InMemoryContext.InitContext(Guid.NewGuid(), ArrangeModel.Models);
            ModelsController controller = new ModelsController(context);

            //ACT
            List<Model> actualList = controller.GetModels().Result.Value as List<Model>;
            List<Model> expectedList = context.Models.ToList();

            //ASSERT
            Assert.Equal(ArrangeModel.Models.Count, actualList.Count);
            Assert.Equal(expectedList, actualList);
        }
    }
}
