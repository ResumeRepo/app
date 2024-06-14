import moment from "moment";
import { saveAs } from 'file-saver';

export function getFormattedDate(timestamp: number) {
  return moment.unix(timestamp).format('MMMM Do YYYY')
}

/**
 * Export all CSS styling from react-to-print in development
 * mode. When the app is in production mode as a Chrome extension,
 * react-to-print only exports the inlined or injected styling within
 * <style></style> block. To maintain the template UI consistent across
 * development and extension mode, we need to export all of them and then
 * import them in production.
 */
export function exportCss(templateId: number, html: HTMLHtmlElement) {
  if (import.meta.env.MODE === "development") {
    const styleAndLinkNodes = html.querySelectorAll("style");
    for (let i = 0, styleAndLinkNodesLen = styleAndLinkNodes.length; i < styleAndLinkNodesLen; ++i) {
      const node = styleAndLinkNodes[i];
      let id = `${templateId}-${i}`
      if (node.tagName.toLowerCase() === 'style') { // <style> nodes
        if (node.id) id = `${id}-${node.id}`
        id = id + ".css"


        // const sheet = (node as HTMLStyleElement).sheet as CSSStyleSheet

        debugger
      }
    }
    console.log("in dev styling: ", html.style)
  }
}

export function importCss(templateId: number) {
  if (import.meta.env.MODE === "production") {

  }
  return "";
}
