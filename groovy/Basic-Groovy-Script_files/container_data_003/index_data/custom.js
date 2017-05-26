
/**
 * @fileoverview Custom functionality to apply throughout every adsize. This
 * has a dependency on common.js and utils.js
 */
var custom = (function() {

  /**
   * Classes which our JS hooks into. Add more class names as necessary.
   * @enum
   * @private
   */
  var elementClass_ = {
    item: 'js-item',
    itemPriceS: 'js-item-prices',
    itemPricePrefix: 'js-item-prefix',
    itemPrice: 'js-item-price',
    itemSalePrice: 'js-item-saleprice',
    itemRegularPrice: 'js-item-regularprice',
    itemCta: 'js-item-cta',
    itemBorder: 'js-item-border'
  };

  /**
   * Initialization. Called from handleAdInitialized on each page.
   */
  function init() {
    utils.log('custom.init()');
    var data = common.getAdData();
    if (!data) return;

    // If you're using the swipe gallery to display feed items.
    initItemsUsingGallery_();

    // If you're NOT using the swipe gallery to display feed items.
    //initItemsWithoutGallery_();


  }

  /**
   * Find all items used in the swipe gallery and initialize custom behavior.
   * @private
   */
  function initItemsUsingGallery_() {
    var gallery = common.getGallery();

    // Apply settings to each item in the gallery
    var items = gallery.querySelectorAll('.' + elementClass_.item);
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      initItemDisplay_(item);
    }
  }

  /**
   * Find all items used outside the gallery and initialize custom behavior.
   * @private
   */
  function initItemsWithoutGallery_() {
    // Apply settings to each item
    var items = document.querySelectorAll('.' + elementClass_.item);
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      initItemDisplay_(item);
    }
  }

  /**
   * Set the display settings for each item.
   * Add any custom functionality you need applied on load.
   * @param {Element} item Item element.
   * @private
   */
  function initItemDisplay_(item) {

    // if you're using sales prices.
    setSalePricesDisplay_(item);

    // Set mouseout.
    itemMouseOut(item);
  }

  /**
   * Sets the 3 price elements to display correctly when using sales price.
   * Find your price elements and set into common functionality.
   * @param {Element} item Item element.
   * @private
   */
  function setSalePricesDisplay_(item) {
    // Get reference to each price element.
    var itemPrice = item.querySelector('.' + elementClass_.itemPrice);
    var itemSalePrice = item.querySelector('.' + elementClass_.itemSalePrice);
    var itemRegularPrice = item.querySelector('.' + elementClass_.itemRegularPrice);

    // Sets each item to display correct prices.
    common.displayCorrectPrices(itemPrice, itemSalePrice, itemRegularPrice);
  }

  /**
   * Custom Item Mouse Interactions. Add your own behavior.
   */

  /**
   * Custom Mouseover interaction functionality.
   * @param {Element} item
   */
  function itemMouseOver(item) {


    // Show / hide border:
    var border = item.querySelector('.' + elementClass_.itemBorder);
    if (border) {
      border.style.opacity = 1;
    }

    // Show Item CTA button:
    var cta = item.querySelector('.' + elementClass_.itemCta);
    if (cta) {
      var ctaOn = cta.children[1];
      if (ctaOn) utils.showElement(ctaOn, true);
    }
  }

  /**
   * Custom Mouseout interaction functionality.
   * @param {Element} item
   */
  function itemMouseOut(item) {
    // Show / hide border:
    var border = item.querySelector('.' + elementClass_.itemBorder);
    if (border) {
      border.style.opacity = 0;
    }

    // Hide Item CTA button:
    var cta = item.querySelector('.' + elementClass_.itemCta);
    if (cta) {
      var ctaOn = cta.children[1];
      if (ctaOn) utils.showElement(ctaOn, false);
    }
  }

  return {
    init: init,
    itemMouseOver: itemMouseOver,
    itemMouseOut: itemMouseOut
  };

})();
