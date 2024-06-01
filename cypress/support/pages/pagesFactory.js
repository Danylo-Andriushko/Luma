import { AccountPage } from "./account_page";
import { CartPage } from "./cartPage";
import { CreateNewAccountPage } from "./create_account_page";
import { HomePage } from "./home_page";
import { LoginPage } from "./login_page";
import { MainPage } from "./main_page";
import { ProductPage } from "./products/productPage";
import { ProductsPage } from "./products/productsPage";

class Pages{
    constructor(){
        this.main_page = new MainPage();
        this.home_page = new HomePage();
        this.products_page = new ProductsPage();
        this.product_page = new ProductPage();
        this.account_page = new AccountPage();
        this.login_page = new LoginPage();
        this.create_account_page = new CreateNewAccountPage(); 
        this.cart_page = new CartPage();
    }

}

export default Pages = new Pages();