import sanitizeHTML from "sanitize-html";

/**
 * Shorthand for using dangerouslySetInnerHTML as an element prop:
 *   <div {...setHTML(title)}> </div>
 *
 * @param  {String} html - Raw html to insert
 * @return {Object}
 */
export const setHTML = (html) => {
  return {
    dangerouslySetInnerHTML: {
      __html: sanitizeHTML(html),
    },
  };
};
