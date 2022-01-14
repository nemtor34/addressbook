namespace BackEnd.Models {
    public class ContactParameters {
         const int maxPageSize = 50;
         public int PageNumber {get; set;} = 1;
         private int _pageSize = 3;

         public string SearchKey {get; set;}= string.Empty;
         public int SearchType {get; set;} = 1;
         public int PageSize{
             get
             {
                 return _pageSize;
             }
             set
             {
                 _pageSize = (value > maxPageSize) ? maxPageSize : value;
             }
         }
    }   
}