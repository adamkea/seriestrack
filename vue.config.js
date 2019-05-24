const tailwind = require('tailwindcss')

const postcssPlugins = [
  tailwind(),
]

module.exports = {
    runtimeCompiler: true,
    css: {
      loaderOptions: {
        postcss: {
          plugins: postcssPlugins
        }
      }
    }
  }