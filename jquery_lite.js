(function() {
  if (typeof jquery === "undefined") {
    window.jquery = {};
  }
  document.addEventListener("DOMContentLoaded", runCallbacks);
  var callbackArray = [];

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

  DOMNodeCollection.prototype.children = function() {
    var childrenArray = [];
    this.array.forEach( function(el) {
      childrenArray = childrenArray.concat([].slice.call(el.children));
    });

    return new DOMNodeCollection(childrenArray);
  };

  DOMNodeCollection.prototype.parent = function () {
    var parentArray = [];
    this.array.forEach( function(el) {
      console.log(el.parentElement);
      parentArray = parentArray.concat([el.parentElement]);
    });

    return new DOMNodeCollection(parentArray);
  };

  DOMNodeCollection.prototype.find = function(selector) {
    var nodes = [];
    this.array.forEach( function(el) {
      var childNodeArr = el.querySelectorAll(selector);
      nodes = nodes.concat([].slice.call(childNodeArr));
    });
    return new DOMNodeCollection(nodes);
  };

DOMNodeCollection.prototype.remove = function () {
  this.array.forEach( function(el) {
    el.outerHTML = "";
  });
  this.array = [];
};

DOMNodeCollection.prototype.on = function(type, callback) {
  this.array.forEach( function (el) {
    el.addEventListener(type, callback);
  });
};

DOMNodeCollection.prototype.off = function(type, callback) {
  this.array.forEach( function (el) {
    el.removeEventListener(type, callback);
  });
};

function $l(selector) {
  if (typeof selector === "string") {
    var nodeList = document.querySelectorAll(selector);
    var elementArray = [].slice.call(nodeList);
  } else if (typeof selector === "object" && selector instanceof HTMLElement) {
    var elementArray = [selector];
  } else if (typeof selector === "function") {
    callbackArray.push(selector);
    if (document.readyState === "complete") {
      selector();
    }
  }
  if (elementArray) {
    return new DOMNodeCollection(elementArray);
  }
}

var extend = function () {
  var args = [].slice.apply(arguments);
  var returnObject = args.shift();

  args.forEach(function (el) {
    var currentElKeys = Object.keys(el);
    currentElKeys.forEach( function (key) {
      returnObject[key] = el[key];
    });
  });

  return returnObject;
};

var ajax = function (options) {
  var defaults = {
    type: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: function (data) {alert("success"); console.log(data);},
    error: function () {alert("error");}
  };

  var newOptions = extend(defaults, options);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      if (xmlhttp.status === 200) {
        var data = JSON.parse(xmlhttp.responseText);
        newOptions.success(data);
      } else {
      newOptions.error();
      }
    }
  };

  xmlhttp.open(newOptions['type'], newOptions['url']);
  xmlhttp.send();

};

function runCallbacks() {
  callbackArray.forEach( function(el) {
    el();
  });
  callbackArray = [];
}

  window.$l = $l;
  window.$l.extend = extend;
  window.$l.ajax = ajax;
})();
