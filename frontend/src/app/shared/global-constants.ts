export class GlobalConstants {

  // Message
  public static genericError: string = "Something went wrong. Prease try again later";

  public static unauthorized: string = "You are not authorized person to access this page";

  public static productExistError: string = "Product already exists";

  

  public static productAdded: string = "Product Added Successfully";

  //Regex
  public static nameRegex: string = "[a-zA-Z ]*";

  public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

  public static contactNumberRegex: string = "^[e0-9]{7,15}$";

  public static priceRegex: string = "^\\d+(.\\d{1,2})?$";

  //Variable
  public static error: string = "error";

  public static round(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
