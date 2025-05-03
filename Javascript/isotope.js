/*
 *Easy selector helper function
 *Help select dom elements quicker
 */

const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

/*
 *Easy event listener function
 *Make it easier to add events listener
 */

const on = (type, el, listener, all = false) => {
  let selectEL = select(el, all);
  if (selectEL) {
    if (all) {
      selectEL.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEL.addEventListener(type, listener);
    }
  }
};

// Here, we need to setup the isotope
window.addEventListener('load', () => {
  let productContainer = select('.product-container');
  if (productContainer) {
    let productIsotope = new Isotope(productContainer, {
      itemSelector: '.product-item',
      layoutMode: 'fitRows',
      percentPosition: true,
      fitRows: {
        gutter: 10,
      },
    });

    let productFilters = select('#product-filters li', true);

    on(
      'click',
      '#product-filters li',
      function (e) {
        e.preventDefault();
        productFilters.forEach((el) => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        let filterValue = this.getAttribute('data-filter');
        productIsotope.arrange({
          filter: filterValue
        });
      },
      true
    );
  }
});

