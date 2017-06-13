import $ from 'jquery';

const mathjaxUrl = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML';
const hiddenFormulaClass = 'hiddenFormula';
const preloadingIconClass = 'preloadingIcon';

let resolveLoadPromise = null;
const loadPromise = new Promise(resolve => {
  resolveLoadPromise = resolve;
});

export function init() {
  debugger;
  window.MathJax = {
    messageStyle: "none",
    skipStartupTypeset: true,
    tex2jax: {
      preview: ["[loading...]"]
    },
    AuthorInit() {
      MathJax.Hub.Register.StartupHook('Begin', () => {
        resolveLoadPromise();
      });
    }
  };
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src  = mathjaxUrl;
  document.getElementsByTagName('head')[0].appendChild(script);
}

function getSpinnerHtml(text) {
  return (`
      <span class="${hiddenFormulaClass}">
        ${text}
      </span>
      <i class="${preloadingIconClass} fa fa-spinner fa-spin" aria-hidden="true"></i>
  `);
}

function toSpinners(element) {
  $(element).html((index, oldHtml) => {
    return oldHtml.replace(/\$\$.*\$\$|\$.*\$|\\\(.*\\\)/g, getSpinnerHtml);
  })
}

function toFormulas(element) {
  $(element).children(`.${hiddenFormulaClass}`).removeClass(hiddenFormulaClass);
  $(element).children().remove(`.${preloadingIconClass}`);
}

export function renderMath(element) {
  toSpinners(element);
  loadPromise.then(() => {
    element && MathJax.Hub.Queue(['Typeset', MathJax.Hub, element], () => {
      toFormulas(element);
    });
  });
};
