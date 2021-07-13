using my_app_back_end.Models;
using my_app_back_end_test.Utils.Constants;
using System.Collections.Generic;

namespace my_app_back_end_test.Utils.Arrange
{
    class ArrangeModel
    {
        public static Model Model1 => new Model { Id = 1, Name = GeneralConstants.ModelName_1};
        public static Model Model2 => new Model { Id = 2, Name = GeneralConstants.ModelName_2};
        public static List<Model> Models => new List<Model> { Model1, Model2 };
    }
}
