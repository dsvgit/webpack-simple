import { resolvePromise } from './mathjax.js';

window.MathJax = {
  skipStartupTypeset: true,
  tex2jax: {
    preview: ["[loading...]"]
  },
  AuthorInit() {
    MathJax.Hub.Register.StartupHook('Begin', () => {
      resolvePromise();
    });
  }
};
