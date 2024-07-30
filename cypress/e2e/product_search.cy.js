import { Header } from '../support/elements/header.js';
import Pages from '../support/pages/pagesFactory.js';
import { SearchResultPage } from '../support/pages/search_result_page.js';

const header = new Header();
const mainPage = Pages.main_page;
const searchResultPage = new SearchResultPage();


describe('Sign-out feature', () => {
  beforeEach(() => {
    mainPage.open();
  })

  it('Search bar should be available from all content pages', () => {
    header.checkIfAvailableFromAllContentPages('searchInput');
  })

  it('Verify that user is able to search relevant products', () => {
    header.inputSearchValue('jacket');
    header.clickSearchButton();
    searchResultPage.isProductSearchContains('jacket')
  })

  it('Appropriate message should be displayed when user inputs not existing product name', () => {
    header.inputSearchValue('$$$');
    header.clickSearchButton();
    searchResultPage.searchMessageValue().should((message) => {
      expect(message.trim()).to.equal("Your search returned no results.");
    });
  })

  it.skip('Autocomplete should displayed relevant result', () => {
    header.inputSearchValue('jac');
    searchResultPage.isSearchAutocompleteContains('jacket');
  })

  it('Should be possible to sort the found product by price in ascending order', () => {
    header.searchProduct('jacket');
    searchResultPage.selectSortOption('price');
    searchResultPage.setDirection('Set Ascending Direction');
    searchResultPage.checkIfPriceOrderIs('ascending')
  })

  it('Should be possible to sort the found product by price in descending order', () => {
    header.searchProduct('jacket');
    searchResultPage.selectSortOption('price');
    searchResultPage.setDirection('Set Descending Direction');
    searchResultPage.checkIfPriceOrderIs('descending')
  })

  
  it('Should be possible to sort the found product by name in ascending order', () => {
    header.searchProduct('jacket');
    searchResultPage.selectSortOption('name');
    searchResultPage.setDirection('Set Ascending Direction');
    searchResultPage.checkIfNameOrderIs('ascending')
  })

  it
  ('Should be possible to sort the found product by name in descending order', () => {
    header.searchProduct('jacket');
    searchResultPage.selectSortOption('name');
    searchResultPage.setDirection('Set Descending Direction');
    searchResultPage.checkIfNameOrderIs('descending')
  })
})
