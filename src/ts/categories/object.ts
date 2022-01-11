const objectCategory = {
  isObject(item, callback?) {
    if ((item
      && !Array.isArray(item)
      && item !== null && typeof item === 'object'
      && !(item instanceof Element)
      && Object.create(item))
    ) {
      if (callback instanceof Function) {
        return callback();
      }

      return true
    }

    return false;
  }
}

for (let i in objectCategory) {
  // Exports every separately method
  exports[i] = objectCategory[i];
}

// Exports all methods
export default objectCategory;