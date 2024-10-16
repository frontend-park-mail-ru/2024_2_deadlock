export default function registerHelpers() {
  Handlebars.registerHelper('isEqual', function (arg1, arg2) {
    return arg1 === arg2;
  });
}
