module.exports = function () {
  this.When(/^I call the api$/, function () {
    return this.browser.executeScript(() => {
      window.hello = es6LibraryBoilerplate();
    });
  });

  this.Then(/^I should recieve a string saying hello$/, function () {
    return this.browser
      .executeScript(() => window.hello)
      .should.eventually.deep.equal('hello');
  });
};
