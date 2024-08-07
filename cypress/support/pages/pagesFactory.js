import { AccountPage } from "./account_page";
import { CartPage } from "./cartPage";
import { ShippingPage } from "./shippingPage";
import { CreateNewAccountPage } from "./create_account_page";
import { HomePage } from "./home_page";
import { LogoutPage } from "./logOut_page";
import { LoginPage } from "./login_page";
import { MainPage } from "./main_page";
import { PaymentPage } from "./paymentPage";
import { ProductPage } from "./products/productPage";
import { ProductsPage } from "./products/productsPage";
import { SuccessPage } from "./successPage";
import { ConfigurePage } from "./configurePage";
import { SearchResultPage } from "./search_result_page";

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
        this.shipping_page = new ShippingPage();
        this.payment_page = new PaymentPage();
        this.success_page = new SuccessPage();
        this.logout_page = new LogoutPage();
        this.configure_page = new ConfigurePage();
        this.search_result_page = new SearchResultPage();
    }

}

export default Pages = new Pages();