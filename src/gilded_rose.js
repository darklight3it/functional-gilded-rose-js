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

/*
*  In order to differentiate the logic between the different item we can mark each one of them
*  with two updater functions (one for quality and one for sell_in). These function should
*  take an item object and return the new updated quality/sell_in. For now we can default them
*  to a simple identity function.
*  Using this strategy makes the update_item function useless (we can directly use create item)
*/

import {pipe} from 'ramda';


const createItem = (name, sell_in, quality, qualityUpdater = x => x, sellInUpdater = x => x.sell_in - 1) => 
  ({ name, sell_in, quality, qualityUpdater, sellInUpdater });

const times = (iterations, fn, argument) => 
  iterations <= 0 ? argument : times(iterations - 1, fn, fn(argument));


/* 
* The "Sulfuras" item which do not change both sell_in and quality property is now a trivial consequence of what we have done since now.
*/

const updaters =  {
  updateQualityBy: (value) => (item) =>  item.quality + (item.sell_in - 1 < 0 ? value * 2 : value),
  setMinLimit: (value) => Math.max(value, 0),
  setMaxLimit: (value) => Math.min(value, 50),
  noQualityUpdate: (item) => item.quality,
  noSellInUpdate: (item) => item.sell_in,
};

const update_quality = (items) => 
  items.map(item => 
    createItem(item.name, 
      item.sellInUpdater(item), 
      item.qualityUpdater(item), 
      item.qualityUpdater, 
      item.sellInUpdater));

export { update_quality, createItem, times, updaters, pipe };
