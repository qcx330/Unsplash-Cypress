class Element {
  constructor(selector, isXpath = false) {
    this.selector = selector;
    this.isXpath = isXpath;
  }
  // || this.selector.startsWith('(.') || this.selector.startsWith('(/')
  getElement() {
    if (this.selector.startsWith('//') ||
      this.selector.startsWith('(')) {
      return cy.xpath(this.selector);
    } else {
      return cy.get(this.selector);
    }
  }

  click() {
    return this.getElement().should('be.visible').first().click();
  //   return this;
  }

  forceClick() {
    this.getElement().should('be.visible').click({ force: true });
    return this;
  }

  dblclick() {
    this.getElement().dblclick();
    return this;
  }

  rightclick() {
    this.getElement().rightclick();
    return this;
  }

  hover() {
    return this.getElement().eq(0).scrollIntoView()
      .realHover();
  }

  type(text) {
    this.getElement().type(text);
    return this;
  }

  clear() {
    this.getElement().clear();
    return this;
  }

  check() {
    this.getElement().check();
    return this;
  }

  uncheck() {
    this.getElement().uncheck();
    return this;
  }

  select(option) {
    this.getElement().select(option);
    return this;
  }

  scrollIntoView() {
    return this.getElement().first().scrollIntoView({ block: "end" });
  }

  trigger(event) {
    this.getElement().trigger(event);
    return this;
  }

  selectFile(filePath) {
    this.getElement().selectFile(filePath);
    return this;
  }

  contains(text) {
    this.getElement().contains(text);
    return this;
  }

  isVisible() {
    return this.getElement().should('be.visible');
  }

  waitForElementToBeVisible(timeout = 10000) {
    return cy.wrap(null, { timeout }).then(() => {
      this.getElement().should('be.visible');
    });
  }

  waitForElementToExist(timeout = 10000) {
    return cy.wrap(null, { timeout }).then(() => {
      this.getElement().should('exist');
    });
  }

  getAttribute(attribute) {
    return this.getElement().should('be.visible')
                            .invoke('attr', attribute)
  }

  getText() {
    return this.getElement().invoke("text");
  }

  isNotExist() {
    return this.getElement().should('not.exist');
  }

  isExist() {
    this.getElement().should('exist')
    return this;
  }

  getElementCount() {
    return this.getElement().its('length');
  }
}

export default Element;
