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

const times = (iterations, fn, argument) => {
  if (iterations <= 0) {
    return;
  }
  
  fn(argument);
  times(iterations - 1, fn, argument);
};

/*
* Now before diving in this if madness let's do some preparatory simple refactorings
* 1 - Assure update_quality have appropriate arguments and returns.
* 2 - Rewrite tests and times function accordingly
*/

function update_quality(items) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1;
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1;
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1;
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1;
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality;
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1;
        }
      }
    }
  }
}

export { update_quality, createItem, times };
