module.exports = function(eleventyConfig) {
  // Copy static assets from root to output
  eleventyConfig.addPassthroughCopy({"styles.css": "styles.css"});
  eleventyConfig.addPassthroughCopy({"styles-pro.css": "styles-pro.css"});
  eleventyConfig.addPassthroughCopy({"app.jsx": "app.jsx"});
  eleventyConfig.addPassthroughCopy({"images": "images"});

  // Set custom directories for input, output, includes, and data
  return {
    dir: {
      input: "src",           // Source files
      includes: "_includes",  // Template partials
      output: "_site"         // Build output
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};