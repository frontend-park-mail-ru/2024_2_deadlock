(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates['cards.hbs'] = template({
    1: function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = 'function',
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '<div class="card">\n' +
        ((stack1 = lookupProperty(helpers, 'if').call(
          alias1,
          depth0 != null ? lookupProperty(depth0, 'imageUrl') : depth0,
          {
            name: 'if',
            hash: {},
            fn: container.program(2, data, 0),
            inverse: container.noop,
            data: data,
            loc: { start: { line: 3, column: 4 }, end: { line: 7, column: 11 } },
          },
        )) != null
          ? stack1
          : '') +
        '    <div class="card-content">\n        <p class="card-content-header">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, 'title') ||
              (depth0 != null ? lookupProperty(depth0, 'title') : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: 'title',
                hash: {},
                data: data,
                loc: { start: { line: 9, column: 39 }, end: { line: 9, column: 48 } },
              })
            : helper),
        ) +
        '</p>\n        <p class="card-content-text">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, 'description') ||
              (depth0 != null ? lookupProperty(depth0, 'description') : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: 'description',
                hash: {},
                data: data,
                loc: { start: { line: 10, column: 37 }, end: { line: 10, column: 52 } },
              })
            : helper),
        ) +
        '</p>\n    </div>\n</div>\n'
      );
    },
    2: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '    <div class="card-img">\n        <img src="' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, 'imageUrl') ||
              (depth0 != null ? lookupProperty(depth0, 'imageUrl') : depth0)) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === 'function'
            ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
                name: 'imageUrl',
                hash: {},
                data: data,
                loc: { start: { line: 5, column: 18 }, end: { line: 5, column: 30 } },
              })
            : helper),
        ) +
        '">\n    </div>\n'
      );
    },
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, 'each').call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, 'items') : depth0,
        {
          name: 'each',
          hash: {},
          fn: container.program(1, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 1, column: 0 }, end: { line: 13, column: 9 } },
        },
      )) != null
        ? stack1
        : '';
    },
    useData: true,
  });
})();
