# Refactoring Portfolio Pages to Component-Based Architecture

Most pages in this repository share a template (headers, footers, head meta tags, navigation links) with minor content differences (titles, descriptions, images, slideshow links). Refactoring to a component-based model will make maintenance significantly easier.

Here are the two primary paths we can take:

---

## Option 1: Native HTML Web Components (Vanilla JS)
We create native Custom Elements (e.g. `<portfolio-header>` and `<portfolio-footer>`) in JavaScript.
These elements dynamically render the header and footer on page load.

### How it works:
1. Define custom components in a new file `js/components.js`:
   ```javascript
   class PortfolioHeader extends HTMLElement {
     connectedCallback() {
       this.innerHTML = `
         <header>
           <div class="logo"><img src="" alt="" /></div>
           <button class="nav-toggle" aria-label="toggle navigation">
             <span class="hamburger"></span>
           </button>
           ...
         </header>
       `;
     }
   }
   customElements.define('portfolio-header', PortfolioHeader);
   ```
2. In all HTML files, replace the hardcoded header with `<portfolio-header></portfolio-header>`.

### Pros & Cons:
* **Pros**:
  * Zero build tools or npm dependencies needed.
  * Pages still work via the simple `file://` protocol (no server needed).
  * Extremely fast and lightweight.
* **Cons**:
  * Client-side rendering means a tiny Flash of Unstyled Content (FOUC) could occur before JS registers the elements.
  * SEO crawlers that do not execute JavaScript might not read the header/navigation links.

---

## Option 2: Static Site Generator (Eleventy / 11ty)
We keep the website fully static, but use a template-compiling build tool. We extract the layout into a template file, and render each page's specific content through Markdown or dynamic front-matter.

### How it works:
1. Set up Eleventy and create a base layout `_includes/layout.njk` containing the shared `<head>`, `<header>`, and `<footer>`.
2. Each page becomes a simplified template (e.g., `angular-library.njk` or markdown):
   ```html
   ---
   layout: layout.njk
   title: Personal Bookshelf
   techIcons: ['html5', 'css3-alt', 'js', 'angular', 'bootstrap', 'github']
   introImg: "img/angular-books/localhost_4200_bookshelf_2.png"
   ---
   <section class="portfolio-item-individual">
     <p>Page content here...</p>
   </section>
   ```
3. Running a build command compiles them into plain HTML pages in a `_site/` directory.

### Pros & Cons:
* **Pros**:
  * Perfect static compilation (ideal for SEO, page load speed, no FOUC).
  * High flexibility: template inheritance, page data loops, modular component files.
  * Very easy to add new portfolio items in the future.
* **Cons**:
  * Introduces Node.js dependencies (`package.json`, `node_modules`).
  * Requires a build step (e.g., `npm run build` or running a dev server).
