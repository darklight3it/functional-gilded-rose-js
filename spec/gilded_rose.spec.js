import { update_quality, times, Item } from '../src/gilded_rose';
import chai from 'chai';

const assert = chai.assert;

/**
 * First an introduction to our system:
 * - All items have a sell_in value which denotes the number of days we have to sell the item
 * - All items have a quality value which denotes how valuable the item is
 * - At the end of each day our system lowers both values for every item
 
 Specs
 * - Once the sell_in days is less then zero, quality degrades twice as fast
 * - The quality of an item is never negative
 * - "Aged Brie" actually increases in quality the older it gets
 * - The quality of an item is never more than 50
 * - "Sulfuras", being a legendary item, never has to be sold nor does it decrease in quality
 * - "Backstage passes", like aged brie, increases in quality as it's sell_in value decreases; quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert
 * - "Conjured" items degrade in quality twice as fast as normal items
*/

describe('Gilded Rose', function() {
  let items;

  const qualityNotUpdatedMsg = 'Quality was not updated correctly';
  const sellInNotUpdatedMsg = 'Sell_In was not updated correctly';

  beforeEach(() => {
    items = [];

    items.push(new Item('+5 Dexterity Vest', 10, 20));
    items.push(new Item('Aged Brie', 2, 0));
    items.push(new Item('Elixir of the Mongoose', 5, 7));
    items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
    items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
    items.push(new Item('Conjured Mana Cake', 3, 6));

  });

  it('should lower sell_in and quality for +5 Dexterity Vest by 1', () => {
    update_quality(items);
    const item = items.find(x => x.name === '+5 Dexterity Vest');

    assert.equal(19, item.quality, qualityNotUpdatedMsg);
    assert.equal(9, item.sell_in, sellInNotUpdatedMsg);
  });

  it('Once the sell_in days is less then zero, quality degrades twice as fast', () => {
    times(11, update_quality, items);
    const item = items.find(x => x.name === '+5 Dexterity Vest');

    assert.equal(8, item.quality, qualityNotUpdatedMsg);
    assert.equal(-1, item.sell_in, sellInNotUpdatedMsg);
  });

  it('The quality of an item is never negative', () => {
    times(23, update_quality, items);
    const item = items.find(x => x.name === '+5 Dexterity Vest');

    assert.equal(0, item.quality, qualityNotUpdatedMsg);
  });

  it('"Aged Brie" actually increases in quality the older it gets', () => {
    update_quality(items);
    const item = items.find(x => x.name === 'Aged Brie');

    assert.equal(1, item.quality, qualityNotUpdatedMsg);
  });

  
  it('The quality of an item is never over 50 (except for artifact)', () => {
  
    times(50, update_quality, items);

    const item = items.find(x => x.name === 'Aged Brie');

    assert.equal(50, item.quality, qualityNotUpdatedMsg)
  });


  it('"Sulfuras", being a legendary item, never has to be sold nor does it decrease in quality', () => {
    update_quality(items);
    const item = items.find(x => x.name === 'Sulfuras, Hand of Ragnaros');

    assert.equal(0, item.sell_in, sellInNotUpdatedMsg);
    assert.equal(80, item.quality, qualityNotUpdatedMsg);
  });

  it('"Backstage passes", like aged brie, increases in quality as it\'s sell_in value decreases; \
  quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert', () => {
    times(15, update_quality, items);

    const item = items.find(x => x.name === 'Backstage passes to a TAFKAL80ETC concert');

    assert.equal(50, item.quality, qualityNotUpdatedMsg);

    times(15, update_quality, items)

    const item2 = items.find(x => x.name === 'Backstage passes to a TAFKAL80ETC concert');

    assert.equal(0, item2.quality, qualityNotUpdatedMsg);
  });

  it('"Conjured" items degrade in quality twice as fast as normal items.', () => {
    update_quality(items);
    const item = items.find(x => x.name === 'Conjured Mana Cake');

    assert.equal(2, item.sell_in, sellInNotUpdatedMsg);
    assert.equal(4, item.quality, qualityNotUpdatedMsg);
  });
});
