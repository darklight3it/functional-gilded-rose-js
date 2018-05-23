import { update_quality, times, createItem, updaters, pipe } from '../src/gilded_rose';
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

describe('Gilded Rose', () => {
  let items;

  const qualityNotUpdatedMsg = 'Quality was not updated correctly';
  const sellInNotUpdatedMsg = 'Sell_In was not updated correctly';

  beforeEach(() => {
    items = [
      createItem('+5 Dexterity Vest', 10, 20, pipe(updaters.updateQualityBy(-1), updaters.setMinLimit, updaters.setMaxLimit)),
      createItem('Aged Brie', 2, 0, pipe(updaters.updateQualityBy(1), updaters.setMinLimit, updaters.setMaxLimit)),
      createItem('Elixir of the Mongoose', 5, 7, pipe(updaters.updateQualityBy(-1), updaters.setMinLimit, updaters.setMaxLimit)),
      createItem('Sulfuras, Hand of Ragnaros', 0, 80, updaters.noQualityUpdate, updaters.noSellInUpdate),
      createItem('Backstage passes to a TAFKAL80ETC concert', 15, 20, pipe(updaters.backStageQualityUpdater, updaters.setMinLimit, updaters.setMaxLimit)),
      createItem('Conjured Mana Cake', 3, 6)];
  });

  it('should lower sell_in and quality for +5 Dexterity Vest by 1', () => {
    const result = update_quality(items);
    const item = result.find(x => x.name === '+5 Dexterity Vest');

    assert.equal(19, item.quality, qualityNotUpdatedMsg);
    assert.equal(9, item.sell_in, sellInNotUpdatedMsg);
  });

  it('Once the sell_in days is less then zero, quality degrades twice as fast', () => {
    const result = times(11, update_quality, items);
    const item = result.find(x => x.name === '+5 Dexterity Vest');

    assert.equal(8, item.quality, qualityNotUpdatedMsg);
    assert.equal(-1, item.sell_in, sellInNotUpdatedMsg);
  });

  it('The quality of an item is never negative', () => {
    const result = times(23, update_quality, items);
    const item = result.find(x => x.name === '+5 Dexterity Vest');

    assert.equal(0, item.quality, qualityNotUpdatedMsg);
  });

  it('"Aged Brie" actually increases in quality the older it gets', () => {
    const result = update_quality(items);
    const item = result.find(x => x.name === 'Aged Brie');

    assert.equal(1, item.quality, qualityNotUpdatedMsg);
  });

  
  it('The quality of an item is never over 50 (except for artifact)', () => {
  
    const result = times(50, update_quality, items);

    const item = result.find(x => x.name === 'Aged Brie');

    assert.equal(50, item.quality, qualityNotUpdatedMsg);
  });

  it('"Sulfuras", being a legendary item, never has to be sold nor does it decrease in quality', () => {
    const result = update_quality(items);
    const item = result.find(x => x.name === 'Sulfuras, Hand of Ragnaros');

    assert.equal(0, item.sell_in, sellInNotUpdatedMsg);
    assert.equal(80, item.quality, qualityNotUpdatedMsg);
  });

  it('"Backstage passes", like aged brie, increases in quality as it\'s sell_in value decreases; \
  quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert', () => {
    const result = times(15, update_quality, items);

    const item = result.find(x => x.name === 'Backstage passes to a TAFKAL80ETC concert');

    assert.equal(50, item.quality, qualityNotUpdatedMsg);

    const anotherResult = times(16, update_quality, items);

    const item2 = anotherResult.find(x => x.name === 'Backstage passes to a TAFKAL80ETC concert');

    assert.equal(0, item2.quality, qualityNotUpdatedMsg);
  });

  it('"Conjured" items degrade in quality twice as fast as normal items.', () => {
    const result = update_quality(items);
    const item = result.find(x => x.name === 'Conjured Mana Cake');

    assert.equal(2, item.sell_in, sellInNotUpdatedMsg);
    assert.equal(4, item.quality, qualityNotUpdatedMsg);
  });
});
