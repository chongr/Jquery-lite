(function() {
  if (typeof jquery === "undefined") {
    window.jquery = {};
  }

  function DOMNodeCollection (array) {
    this.array = array;
  }

  DOMNodeCollection.prototype.html = function(str) {
    if (typeof str === "undefined") {
      return this.array[0].innerHTML;
    } else {
      this.array.forEach( function(el) {
        el.innerHTML = str;
      });
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    this.array.forEach(function(el) {
      el.innerHTML = "";
    });
  };

  DOMNodeCollection.prototype.append = function(input) {
    if (typeof input === "string") {
      this.html(input);
    } else if (input instanceof HTMLElement) {
      this.array.forEach(function (el) {
        el.insertAdjacentHTML('beforeend', input.outerHTML);
      });
    } else if (input instanceof DOMNodeCollection) {
      this.array.forEach( function(el) {
        input.array.forEach( function(inputEl) {
          el.insertAdjacentHTML('beforeend', inputEl.outerHTML);
        });
      });
    }
  };

  DOMNodeCollection.prototype.attr = function(name, value) {
    if (typeof value === "undefined") {
      return this.array[0].getAttribute(name);
    } else {

      this.array.forEach( function (el) {
        el.removeAttribute(name);
        el.setAttribute(name, value);
      });

    }
  };

  DOMNodeCollection.prototype.addClass = function (className) {
    this.array.forEach( function(el) {
      var currentClasses = el.className;
      if (currentClasses) {
        el.className = currentClasses + " " + className;
      } else {
        el.className = className;
      }
    });
  };

  DOMNodeCollection.prototype.removeClass = function (className) {
    this.array.forEach( function(el) {
      var classArray = el.className.split(" ");
      classArray.forEach( function(name, idx, array) {
        if (name === className) {
          array.splice(idx, 1);
        }
      });
      el.className = classArray.join(" ");
    });
  };

  function $l(selector) {
    if (typeof selector === "string") {
      var nodeList = document.querySelectorAll(selector);
      var elementArray = [].slice.call(nodeList);
    } else if (typeof selector === "object" && selector instanceof HTMLElement) {
      var elementArray = [selector];
    }

    return new DOMNodeCollection(elementArray);

  }

  window.jquery.$l = $l;
})();
