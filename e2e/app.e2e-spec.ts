import { PeepopiPage } from './app.po';

describe('peepopi App', function() {
  let page: PeepopiPage;

  beforeEach(() => {
    page = new PeepopiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
