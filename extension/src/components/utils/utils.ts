import moment from "moment";
import axios from "axios";
import {CSSStyle} from "@src/components/utils/types";
import {PdfApi} from "@src/codegen";
import {headerConfig} from "@src/utils/headerConfig";
import {DEBUG, ERROR} from "@src/utils/utils";

export function getFormattedDate(timestamp: number) {
  return moment.unix(timestamp).format('MMMM Do YYYY')
}

/**
 * Export all CSS styling from react-to-print in development
 * mode. When the app is in production mode as a Chrome extension,
 * react-to-print only exports the inlined or injected styling within
 * <style></style> block. To maintain the template UI consistent across
 * development and extension mode, we need to export all of them and then
 * import them in production on server-side.
 */
export function exportCss(templateId: string, html: HTMLHtmlElement, token: string) {
  if (import.meta.env.MODE === "development") {
    const payload = []
    const styleAndLinkNodes = html.querySelectorAll("style");
    for (let i = 0, styleAndLinkNodesLen = styleAndLinkNodes.length; i < styleAndLinkNodesLen; ++i) {
      const node = styleAndLinkNodes[i];
      let id = `${templateId}-${i}`
      if (node.tagName.toLowerCase() === 'style') { // <style> nodes
        if (node.id) id = `${id}-${node.id}`
        payload.push({
          id,
          css: node.innerHTML
        })
      }
    }
    if (payload) {
      new PdfApi(headerConfig(token)).saveStyle({
        template_id: templateId,
        payload
      })
      .then(response => { DEBUG(`Style saved for templateId=${templateId}`)})
      .catch(e => {
        ERROR('Error saving style:', e);
      })
    }
  }
}

export function cssToReactStyle(css: string): CSSStyle {
  const styles: CSSStyle = {};

  // Split CSS rules by semicolons
  const rules = css.split(';').filter(rule => rule.trim() !== '');

  for (const rule of rules) {
    const [property, value] = rule.trim().split(':').map(part => part.trim());
    // Convert CSS property names to camelCase (e.g., font-size -> fontSize)
    const camelCaseProperty = property.replace(/-([a-z])/g, (match, group1) => group1.toUpperCase());

    // Check for valid property names and handle pixel values
    if (camelCaseProperty in document.documentElement.style) {
      const unit = value.match(/px$/); // Check if value ends with 'px'
      if (unit) {
        const pixelValue = parseInt(value.slice(0, -2), 10); // Extract value without 'px'
        if (!isNaN(pixelValue)) {
          styles[camelCaseProperty] = `${pixelValue}px`;
        } else {
          console.warn(`Invalid pixel value for ${property}: ${value}`);
        }
      } else {
        styles[camelCaseProperty] = value.replace(".00px", "px")
      }
    } else {
      console.warn(`Ignoring invalid CSS property: ${property}`);
    }
  }
  return styles;
}
