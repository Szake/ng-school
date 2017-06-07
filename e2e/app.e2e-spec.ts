import { NgSchoolPage } from './app.po';

describe('ng-school App', () => {
  let page: NgSchoolPage;

  beforeEach(() => {
    page = new NgSchoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
