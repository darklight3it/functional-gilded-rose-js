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
* 5 - Ensure new item are create every time (avoid mutating item)
*/

const update_item = (name, sell_in, quality) => {
  if (name != 'Aged Brie' && name != 'Backstage passes to a TAFKAL80ETC concert') {
    if (quality > 0) {
      if (name != 'Sulfuras, Hand of Ragnaros') {
        quality = quality - 1;
      }
    }
  } else {
    if (quality < 50) {
      quality = quality + 1;
      if (name == 'Backstage passes to a TAFKAL80ETC concert') {
        if (sell_in < 11) {
          if (quality < 50) {
            quality = quality + 1;
          }
        }
        if (sell_in < 6) {
          if (quality < 50) {
            quality = quality + 1;
          }
        }
      }
    }
  }
  if (name != 'Sulfuras, Hand of Ragnaros') {
    sell_in = sell_in - 1;
  }
  if (sell_in < 0) {
    if (name != 'Aged Brie') {
      if (name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (quality > 0) {
          if (name != 'Sulfuras, Hand of Ragnaros') {
            quality = quality - 1;
          }
        }
      } else {
        quality = quality - quality;
      }
    } else {
      if (quality < 50) {
        quality = quality + 1;
      }
    }
  }
  return createItem(name, sell_in, quality);
};

const update_quality = (items) => items.map(item => update_item(item.name, item.sell_in, item.quality));

export { update_quality, createItem, times };
