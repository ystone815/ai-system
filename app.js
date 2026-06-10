// app.js - Controller Logic for AI System Knowledge Base (UI Redesign)

class App {
  constructor() {
    this.data = window.aiSystemData || [];
    this.currentSmallId = null;
    this.favorites = this.loadFavorites();
    this.searchQuery = "";
    
    // DOM Elements - Left Pane (Treemap)
    this.treemapContainer = document.getElementById("treemap-container");
    
    // DOM Elements - Right Pane (Content Screens)
    this.welcomeScreen = document.getElementById("welcome-screen");
    this.articleScreen = document.getElementById("article-screen");
    this.searchScreen = document.getElementById("search-screen");
    this.favoritesScreen = document.getElementById("favorites-screen");
    this.contentPane = document.querySelector(".content-pane");
    
    // DOM Elements - Header Search & Action
    this.searchInput = document.getElementById("search-input");
    this.searchClearBtn = document.getElementById("search-clear-btn");
    this.favoritesToggleBtn = document.getElementById("favorites-toggle");
    
    // DOM Elements - Modal Popup
    this.subcategoryModal = document.getElementById("subcategory-modal");
    this.modalLargeBadge = document.getElementById("modal-large-badge");
    this.modalTitle = document.getElementById("modal-title");
    this.modalCloseBtn = document.getElementById("modal-close-btn");
    this.modalItemList = document.getElementById("modal-item-list");
    
    // DOM Elements - Article TOC
    this.tocListItems = document.getElementById("toc-list-items");
    
    this.init();
  }
  
  init() {
    this.renderTreemap();
    this.bindEvents();
    this.updateFavoritesCount();
    this.updateArticlesCountBadge();
    
    // Show welcome screen initially
    this.showScreen("welcome");
    
    // Setup Scroll Spy for Table of Contents
    this.setupScrollSpy();
  }
  
  // Event Bindings
  bindEvents() {
    // Search event
    this.searchInput.addEventListener("input", (e) => {
      this.handleSearch(e.target.value);
    });
    
    // Clear search
    this.searchClearBtn.addEventListener("click", () => {
      this.searchInput.value = "";
      this.handleSearch("");
      this.searchInput.focus();
    });
    
    // Favorites screen toggle
    this.favoritesToggleBtn.addEventListener("click", () => {
      this.clearSearch();
      this.renderFavoritesScreen();
      this.showScreen("favorites");
      this.closeMobileDrawer();
    });
    
    // Bookmark article toggle
    document.getElementById("article-bookmark-btn").addEventListener("click", () => {
      if (this.currentSmallId) {
        this.toggleBookmark(this.currentSmallId);
      }
    });
    
    // Modal Close handlers
    this.modalCloseBtn.addEventListener("click", () => {
      this.closeSubcategoryModal();
    });
    
    // Close modal on clicking overlay backdrop
    this.subcategoryModal.addEventListener("click", (e) => {
      if (e.target === this.subcategoryModal) {
        this.closeSubcategoryModal();
      }
    });
    
    // Close modal on ESC key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeSubcategoryModal();
      }
    });
    
    // Mobile responsive drawers
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const backdrop = document.getElementById("sidebar-backdrop");
    
    if (mobileToggle) {
      mobileToggle.addEventListener("click", () => {
        document.body.classList.toggle("sidebar-open");
      });
    }
    
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        this.closeMobileDrawer();
      });
    }
    
    // Welcome card clicks linking to treemap sectors
    const welcomeCardApp = document.getElementById("welcome-card-app");
    const welcomeCardCompute = document.getElementById("welcome-card-compute");
    const welcomeCardMemory = document.getElementById("welcome-card-memory");
    
    if (welcomeCardApp) {
      welcomeCardApp.addEventListener("click", () => {
        const targetSector = document.querySelector(".sector-app");
        if (targetSector) {
          targetSector.scrollIntoView({ behavior: "smooth" });
          targetSector.style.transform = "scale(1.02)";
          setTimeout(() => targetSector.style.transform = "scale(1)", 400);
        }
      });
    }
    
    if (welcomeCardCompute) {
      welcomeCardCompute.addEventListener("click", () => {
        const targetSector = document.querySelector(".sector-compute");
        if (targetSector) {
          targetSector.scrollIntoView({ behavior: "smooth" });
          targetSector.style.transform = "scale(1.02)";
          setTimeout(() => targetSector.style.transform = "scale(1)", 400);
        }
      });
    }
    
    if (welcomeCardMemory) {
      welcomeCardMemory.addEventListener("click", () => {
        const targetSector = document.querySelector(".sector-memory");
        if (targetSector) {
          targetSector.scrollIntoView({ behavior: "smooth" });
          targetSector.style.transform = "scale(1.02)";
          setTimeout(() => targetSector.style.transform = "scale(1)", 400);
        }
      });
    }
  }
  
  closeMobileDrawer() {
    document.body.classList.remove("sidebar-open");
  }
  
  // Screen Switching
  showScreen(screenType) {
    this.welcomeScreen.classList.add("hidden");
    this.articleScreen.classList.add("hidden");
    this.searchScreen.classList.add("hidden");
    this.favoritesScreen.classList.add("hidden");
    
    if (screenType !== "article") {
      this.currentSmallId = null;
      document.querySelectorAll(".treemap-block").forEach(block => block.classList.remove("active"));
    }
    
    if (screenType === "welcome") {
      this.welcomeScreen.classList.remove("hidden");
    } else if (screenType === "article") {
      this.articleScreen.classList.remove("hidden");
    } else if (screenType === "search") {
      this.searchScreen.classList.remove("hidden");
    } else if (screenType === "favorites") {
      this.favoritesScreen.classList.remove("hidden");
    }
    
    // Scroll content pane back to top
    this.contentPane.scrollTop = 0;
    
    // Re-render Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  // 1. Render Treemap Layout (Left Panel)
  renderTreemap() {
    this.treemapContainer.innerHTML = "";
    
    this.data.forEach(largeCat => {
      // Create Sector (대분류)
      const sectorDiv = document.createElement("div");
      sectorDiv.className = `treemap-sector sector-${largeCat.id}`;
      
      // Header for sector
      const sectorHeader = document.createElement("div");
      sectorHeader.className = "treemap-sector-header";
      sectorHeader.innerHTML = `<i data-lucide="${largeCat.icon || 'layers'}"></i><span>${largeCat.title}</span>`;
      sectorDiv.appendChild(sectorHeader);
      
      // Grid for subcategories
      const sectorGrid = document.createElement("div");
      sectorGrid.className = "treemap-sector-grid";
      
      largeCat.subcategories.forEach(sub => {
        // Create Block (중분류)
        const block = document.createElement("div");
        block.className = "treemap-block";
        block.setAttribute("data-large-id", largeCat.id);
        block.setAttribute("data-sub-id", sub.id);
        
        // Calculate dynamic size/weight indicators if necessary (e.g. badge count)
        const itemsCount = sub.items.length;
        
        block.innerHTML = `
          <div class="treemap-block-label">${sub.title}</div>
          <div class="treemap-block-count">
            <i data-lucide="book-open" style="width: 12px; height: 12px;"></i>
            <span>${itemsCount} 토픽</span>
          </div>
        `;
        
        // Click opens popup modal
        block.addEventListener("click", () => {
          this.openSubcategoryModal(largeCat.id, sub.id);
        });
        
        sectorGrid.appendChild(block);
      });
      
      sectorDiv.appendChild(sectorGrid);
      this.treemapContainer.appendChild(sectorDiv);
    });
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  // 2. Manage Modal Popup
  openSubcategoryModal(largeId, subId) {
    const largeCat = this.data.find(c => c.id === largeId);
    if (!largeCat) return;
    
    const sub = largeCat.subcategories.find(s => s.id === subId);
    if (!sub) return;
    
    // Set titles
    this.modalLargeBadge.textContent = largeCat.title;
    this.modalTitle.textContent = sub.title;
    
    // Populate items (소분류)
    this.modalItemList.innerHTML = "";
    
    sub.items.forEach(item => {
      const itemCard = document.createElement("div");
      itemCard.className = "modal-item";
      itemCard.setAttribute("data-id", item.id);
      
      itemCard.innerHTML = `
        <div class="modal-item-title">${item.title}</div>
        <div class="modal-item-desc">${item.summary}</div>
      `;
      
      itemCard.addEventListener("click", () => {
        this.closeSubcategoryModal();
        this.selectArticle(item.id);
      });
      
      this.modalItemList.appendChild(itemCard);
    });
    
    // Show Modal
    this.subcategoryModal.classList.remove("hidden");
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  closeSubcategoryModal() {
    this.subcategoryModal.classList.add("hidden");
  }
  
  // 3. Render Article & Dynamic TOC (Right Pane)
  selectArticle(smallId) {
    this.currentSmallId = smallId;
    
    // Find item and path
    let foundLarge = null;
    let foundMiddle = null;
    let foundItem = null;
    
    for (const large of this.data) {
      for (const middle of large.subcategories) {
        const item = middle.items.find(i => i.id === smallId);
        if (item) {
          foundLarge = large;
          foundMiddle = middle;
          foundItem = item;
          break;
        }
      }
      if (foundItem) break;
    }
    
    if (!foundItem) return;
    
    // Render breadcrumbs
    document.getElementById("breadcrumb-large").textContent = foundLarge.title;
    document.getElementById("breadcrumb-middle").textContent = foundMiddle.title;
    document.getElementById("breadcrumb-small").textContent = foundItem.title;
    
    // Render title and summary
    document.getElementById("article-title").textContent = foundItem.title;
    document.getElementById("article-summary").textContent = foundItem.summary;
    
    // Bookmark status setup
    const bookmarkBtn = document.getElementById("article-bookmark-btn");
    if (this.favorites.includes(smallId)) {
      bookmarkBtn.classList.add("bookmarked");
    } else {
      bookmarkBtn.classList.remove("bookmarked");
    }
    
    // Render HTML content safely
    const bodyContainer = document.getElementById("article-body");
    bodyContainer.innerHTML = foundItem.content || "<p>설명 문건이 아직 존재하지 않습니다.</p>";
    
    // Create Dynamic Table of Contents (TOC) from h3 headers in body
    this.generateTOC(bodyContainer);
    
    // Render research papers
    const papersSection = document.getElementById("article-papers-section");
    const papersList = document.getElementById("article-papers-list");
    papersList.innerHTML = "";
    
    if (foundItem.papers && foundItem.papers.length > 0) {
      papersSection.classList.remove("hidden");
      
      foundItem.papers.forEach(paper => {
        const card = document.createElement("div");
        card.className = "paper-card";
        
        card.innerHTML = `
          <div class="paper-header">
            <h3 class="paper-title">${paper.title}</h3>
            <a href="${paper.link}" target="_blank" rel="noopener noreferrer" class="btn-paper-link" title="논문 바로가기">
              <i data-lucide="external-link" style="width:16px; height:16px;"></i>
            </a>
          </div>
          <div class="paper-meta">
            <span class="paper-tag-author">${paper.authors}</span>
            <span class="paper-tag-venue">${paper.venue}</span>
          </div>
          ${paper.note ? `<p class="paper-note">${paper.note}</p>` : ""}
        `;
        
        papersList.appendChild(card);
      });
    } else {
      papersSection.classList.add("hidden");
    }
    
    // Render other resources
    const resourcesSection = document.getElementById("article-resources-section");
    const resourcesList = document.getElementById("article-resources-list");
    resourcesList.innerHTML = "";
    
    if (foundItem.resources && foundItem.resources.length > 0) {
      resourcesSection.classList.remove("hidden");
      
      foundItem.resources.forEach(res => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${res.link}" target="_blank" rel="noopener noreferrer">${res.title}</a>`;
        resourcesList.appendChild(li);
      });
    } else {
      resourcesSection.classList.add("hidden");
    }
    
    // Show Screen
    this.showScreen("article");
    
    // Refresh LaTeX math formatting if MathJax is loaded
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }
  
  // 4. Generate Table of Contents (TOC) dynamically
  generateTOC(contentContainer) {
    this.tocListItems.innerHTML = "";
    
    // Grab all h3 elements inside article-body
    const headers = contentContainer.querySelectorAll("h3");
    
    if (headers.length === 0) {
      document.getElementById("article-toc-sidebar").classList.add("hidden");
      return;
    }
    
    document.getElementById("article-toc-sidebar").classList.remove("hidden");
    
    headers.forEach((header, index) => {
      // Assign unique ID to header if not present
      const headerId = `section-${index}`;
      header.id = headerId;
      
      const li = document.createElement("li");
      li.className = "toc-item";
      li.setAttribute("data-target", headerId);
      
      // Create clickable anchor link
      const anchor = document.createElement("a");
      anchor.href = `#${headerId}`;
      anchor.textContent = header.textContent;
      
      // Smooth scrolling to section headers
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        header.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // Highlight active link immediately
        document.querySelectorAll(".toc-item").forEach(item => item.classList.remove("active"));
        li.classList.add("active");
      });
      
      li.appendChild(anchor);
      this.tocListItems.appendChild(li);
    });
  }
  
  // Scroll Spy for TOC active highlighting
  setupScrollSpy() {
    this.contentPane.addEventListener("scroll", () => {
      if (this.articleScreen.classList.contains("hidden")) return;
      
      const headers = document.getElementById("article-body").querySelectorAll("h3");
      if (headers.length === 0) return;
      
      let currentActiveId = "";
      
      // Find which header is currently in viewport
      headers.forEach(header => {
        const rect = header.getBoundingClientRect();
        // Since contentPane is scrolling, we offset top check slightly (e.g. 150px offset)
        if (rect.top <= 150) {
          currentActiveId = header.id;
        }
      });
      
      if (currentActiveId) {
        document.querySelectorAll(".toc-item").forEach(li => {
          if (li.getAttribute("data-target") === currentActiveId) {
            li.classList.add("active");
          } else {
            li.classList.remove("active");
          }
        });
      }
    });
  }
  
  // 5. Search Functionality
  handleSearch(query) {
    this.searchQuery = query.trim().toLowerCase();
    
    if (!this.searchQuery) {
      this.searchClearBtn.classList.add("hidden");
      if (this.currentSmallId) {
        this.showScreen("article");
      } else {
        this.showScreen("welcome");
      }
      return;
    }
    
    this.searchClearBtn.classList.remove("hidden");
    this.performSearch();
  }
  
  clearSearch() {
    this.searchInput.value = "";
    this.searchQuery = "";
    this.searchClearBtn.classList.add("hidden");
  }
  
  performSearch() {
    const query = this.searchQuery;
    const results = [];
    
    this.data.forEach(large => {
      large.subcategories.forEach(middle => {
        middle.items.forEach(item => {
          let score = 0;
          
          // Check match points
          if (item.title.toLowerCase().includes(query)) score += 10;
          if (item.summary.toLowerCase().includes(query)) score += 5;
          if (item.content.toLowerCase().includes(query)) score += 2;
          
          // Check papers
          if (item.papers) {
            item.papers.forEach(p => {
              if (p.title.toLowerCase().includes(query)) score += 4;
              if (p.note && p.note.toLowerCase().includes(query)) score += 2;
            });
          }
          
          if (score > 0) {
            results.push({
              large,
              middle,
              item,
              score
            });
          }
        });
      });
    });
    
    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    
    // Render results
    document.getElementById("search-query-text").textContent = query;
    document.getElementById("search-results-meta").textContent = `총 ${results.length}개의 항목이 매칭되었습니다.`;
    
    const listDiv = document.getElementById("search-results-list");
    listDiv.innerHTML = "";
    
    if (results.length > 0) {
      results.forEach(res => {
        const card = document.createElement("div");
        card.className = "result-card";
        card.innerHTML = `
          <div class="result-breadcrumbs">${res.large.title} &rsaquo; ${res.middle.title}</div>
          <h3>${res.item.title}</h3>
          <p>${res.item.summary}</p>
        `;
        card.addEventListener("click", () => {
          this.clearSearch();
          this.selectArticle(res.item.id);
        });
        listDiv.appendChild(card);
      });
    } else {
      listDiv.innerHTML = `<div class="info-box"><h4>검색 매칭 없음</h4><p>"${query}"에 대한 검색 결과가 존재하지 않습니다. 다른 단어로 검색해 보세요.</p></div>`;
    }
    
    this.showScreen("search");
  }
  
  // 6. Bookmark (Favorites) Handling
  loadFavorites() {
    const favs = localStorage.getItem("ai_system_kb_favs");
    return favs ? JSON.parse(favs) : [];
  }
  
  saveFavorites() {
    localStorage.setItem("ai_system_kb_favs", JSON.stringify(this.favorites));
  }
  
  toggleBookmark(id) {
    const index = this.favorites.indexOf(id);
    const bookmarkBtn = document.getElementById("article-bookmark-btn");
    
    if (index > -1) {
      // Remove
      this.favorites.splice(index, 1);
      bookmarkBtn.classList.remove("bookmarked");
    } else {
      // Add
      this.favorites.push(id);
      bookmarkBtn.classList.add("bookmarked");
    }
    
    this.saveFavorites();
    this.updateFavoritesCount();
    
    // Re-render favorites screen if currently viewing it
    if (!this.favoritesScreen.classList.contains("hidden")) {
      this.renderFavoritesScreen();
    }
  }
  
  updateFavoritesCount() {
    document.getElementById("favorites-count").textContent = this.favorites.length;
  }
  
  renderFavoritesScreen() {
    const listDiv = document.getElementById("favorites-list");
    listDiv.innerHTML = "";
    
    const favItems = [];
    
    // Find all matching articles
    this.data.forEach(large => {
      large.subcategories.forEach(middle => {
        middle.items.forEach(item => {
          if (this.favorites.includes(item.id)) {
            favItems.push({ large, middle, item });
          }
        });
      });
    });
    
    if (favItems.length > 0) {
      favItems.forEach(res => {
        const card = document.createElement("div");
        card.className = "fav-card";
        card.innerHTML = `
          <div class="fav-breadcrumbs">${res.large.title} &rsaquo; ${res.middle.title}</div>
          <h3>${res.item.title}</h3>
          <p>${res.item.summary}</p>
        `;
        card.addEventListener("click", () => {
          this.selectArticle(res.item.id);
        });
        listDiv.appendChild(card);
      });
    } else {
      listDiv.innerHTML = `<div class="info-box"><h4>북마크 목록이 비어 있습니다.</h4><p>기사 페이지 제목 옆의 북마크 아이콘을 클릭하여 중요한 토픽들을 여기에 따로 보관해 두세요.</p></div>`;
    }
  }
  
  // Total stats loader
  updateArticlesCountBadge() {
    let total = 0;
    this.data.forEach(large => {
      large.subcategories.forEach(middle => {
        total += middle.items.length;
      });
    });
    document.getElementById("articles-count-badge").textContent = `${total} Articles`;
  }
}

// Instantiate App
window.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});
