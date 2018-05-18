/*
==============================================================================
                                
 ! 💀 💀 Functional Style PROGRAMMING 101 - The Gilded Rose Example 💀 💀 !

==============================================================================

? What is functional style programming?
? We will try to answer this question with the following Refactoring Kata

? The kata is about a fantasy shop. Each days that pass the items in the shop quality changes,
? the function update_quality simulates the passing of each day

==============================================================================
*                          ===   THE RULES   ===
* 
*  A functional style program should have the following features:
*  
* .1 Every method must always produce the same output given the same inputs. (Purity)
* .2 Try Avoid assignment. (const, avoid mutation in return value, confined mutation)
* .3 Leverage higher order function.

==============================================================================

Notes:

- The kata has small changes in order to make it testable.
- The last test is red because it is not yet implemented (as requested by the kata specs).
*/

const createItem = (name, sell_in, quality) => ({name, sell_in, quality});

const times = (iterations, fn, argument) => 
  iterations <= 0 ? argument : times(iterations - 1, fn, fn(argument));

/*
* Now before diving in this if madness let's do some preparatory simple refactorings
* 1 - Assure update_quality have appropriate arguments and returns.
* 2 - Rewrite tests and times function accordingly.
* 3 - Return a new array avoiding the for loop (the single item are unfortunately the same reference).
* 4 - Break down the array loop from the single element update.
*/

const update_item = (item) => {
  if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
    if (item.quality > 0) {
      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.quality = item.quality - 1;
      }
    }
  } else {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
      if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sell_in < 11) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
        if (item.sell_in < 6) {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }
  if (item.name != 'Sulfuras, Hand of Ragnaros') {
    item.sell_in = item.sell_in - 1;
  }
  if (item.sell_in < 0) {
    if (item.name != 'Aged Brie') {
      if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
          if (item.name != 'Sulfuras, Hand of Ragnaros') {
            item.quality = item.quality - 1;
          }
        }
      } else {
        item.quality = item.quality - item.quality;
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
      }
    }
  }
  return item;
};

const update_quality = (items) => items.map(update_item);

export { update_quality, createItem, times };
