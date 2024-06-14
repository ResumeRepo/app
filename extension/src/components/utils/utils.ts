import moment from "moment";
import axios from "axios";

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
export function exportCss(templateId: number, html: HTMLHtmlElement) {
  const endpoint = "/save-styling"
  const baseUrl = "http://localhost:4000"
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
    const data = {
      templateId: templateId,
      payload: payload
    }
    if (payload) {
      axios.post(`${baseUrl}${endpoint}`, data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
      })
      .catch(error => {
        console.error('Error converting HTML to PDF:', error);
      });
    }
  }
}
