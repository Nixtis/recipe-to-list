import { RecipeToListPage } from './app.po';

describe('recipe-to-list App', function() {
  let page: RecipeToListPage;

  beforeEach(() => {
    page = new RecipeToListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
