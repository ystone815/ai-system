// app.js - Controller Logic for AI System Knowledge Base

class App {
  constructor() {
    this.data = window.aiSystemData || [];
    this.currentLargeId = null;
    this.currentSmallId = null;
    this.favorites = this.loadFavorites();
    this.searchQuery = "";
    this.viewMode = localStorage.getItem("ai_system_kb_view_mode") || "list";
    
    // DOM Elements
    this.largeCategoryList = document.getElementById("large-category-list");
    this.subCategoryList = document.getElementById("sub-category-list");
    this.selectedLargeTitle = document.getElementById("selected-large-title");
    this.selectedLargeCount = document.getElementById("selected-large-count");
    
    this.welcomeScreen = document.getElementById("welcome-screen");
    this.articleScreen = document.getElementById("article-screen");
    this.searchScreen = document.getElementById("search-screen");
    this.favoritesScreen = document.getElementById("favorites-screen");
    
    this.searchInput = document.getElementById("search-input");
    this.searchClearBtn = document.getElementById("search-clear-btn");
    this.favoritesToggleBtn = document.getElementById("favorites-toggle");
    
    // View Toggle Elements
    this.toggleListBtn = document.getElementById("view-toggle-list");
    this.toggleDiagramBtn = document.getElementById("view-toggle-diagram");
    this.sidebarDiagram = document.getElementById("sidebar-diagram");
    this.diagramWrapper = document.getElementById("diagram-wrapper");
    
    this.init();
  }
  
  init() {
    this.renderLargeSidebar();
    this.renderBlockDiagram();
    this.bindEvents();
    this.updateFavoritesCount();
    this.updateArticlesCountBadge();
    
    // Set view mode
    this.setViewMode(this.viewMode);
    
    // Show welcome screen initially
    this.showScreen("welcome");
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
    
    // View Mode Toggles
    this.toggleListBtn.addEventListener("click", () => this.setViewMode("list"));
    this.toggleDiagramBtn.addEventListener("click", () => this.setViewMode("diagram"));
    
    // Mobile responsive drawers
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const backdrop = document.getElementById("sidebar-backdrop");
    
    mobileToggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
    
    backdrop.addEventListener("click", () => {
      this.closeMobileDrawer();
    });
  }
  
  closeMobileDrawer() {
    document.body.classList.remove("sidebar-open");
  }
  
  // View Mode Handler
  setViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem("ai_system_kb_view_mode", mode);
    
    if (mode === "diagram") {
      document.body.classList.add("mode-diagram");
      this.sidebarDiagram.classList.remove("hidden");
      this.toggleListBtn.classList.remove("active");
      this.toggleDiagramBtn.classList.add("active");
    } else {
      document.body.classList.remove("mode-diagram");
      this.sidebarDiagram.classList.add("hidden");
      this.toggleListBtn.classList.add("active");
      this.toggleDiagramBtn.classList.remove("active");
      
      // Sync list view sidebar state
      if (this.currentLargeId) {
        this.selectLargeCategory(this.currentLargeId);
      }
    }
    
    // Re-render Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  // Screen Switching
  showScreen(screenType) {
    this.welcomeScreen.classList.add("hidden");
    this.articleScreen.classList.add("hidden");
    this.searchScreen.classList.add("hidden");
    this.favoritesScreen.classList.add("hidden");
    
    // Remove active state from sub-category tree elements and diagram blocks
    if (screenType !== "article") {
      document.querySelectorAll(".nav-tree-item").forEach(item => item.classList.remove("active"));
      document.querySelectorAll(".diagram-block").forEach(block => block.classList.remove("active"));
      this.currentSmallId = null;
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
    
    // Re-render Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  // 1. Render Large Category Sidebar (대분류)
  renderLargeSidebar() {
    this.largeCategoryList.innerHTML = "";
    
    this.data.forEach((largeCat, index) => {
      const btn = document.createElement("button");
      btn.className = "nav-large-item";
      btn.setAttribute("data-tooltip", largeCat.title);
      btn.setAttribute("aria-label", largeCat.title);
      btn.innerHTML = `<i data-lucide="${largeCat.icon || 'layers'}"></i>`;
      
      btn.addEventListener("click", () => {
        this.selectLargeCategory(largeCat.id);
        this.closeMobileDrawer();
      });
      
      this.largeCategoryList.appendChild(btn);
    });
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  // 1b. Render Visual Block Diagram
  renderBlockDiagram() {
    this.diagramWrapper.innerHTML = "";
    
    this.data.forEach(largeCat => {
      // Create a layer representing the Large Category
      const layer = document.createElement("div");
      layer.className = `diagram-layer layer-${largeCat.id}`;
      
      const header = document.createElement("div");
      header.className = "layer-header";
      header.innerHTML = `<i data-lucide="${largeCat.icon || 'layers'}"></i><span>${largeCat.title}</span>`;
      layer.appendChild(header);
      
      const content = document.createElement("div");
      content.className = "layer-content";
      
      largeCat.subcategories.forEach(sub => {
        const group = document.createElement("div");
        group.className = "diagram-group";
        
        const groupTitle = document.createElement("div");
        groupTitle.className = "diagram-group-title";
        groupTitle.textContent = sub.title;
        group.appendChild(groupTitle);
        
        const grid = document.createElement("div");
        grid.className = "diagram-block-grid";
        
        sub.items.forEach(item => {
          const block = document.createElement("div");
          block.className = "diagram-block";
          block.setAttribute("data-id", item.id);
          block.textContent = item.title;
          
          block.addEventListener("click", () => {
            this.selectArticle(item.id);
          });
          
          grid.appendChild(block);
        });
        
        group.appendChild(grid);
        content.appendChild(group);
      });
      
      layer.appendChild(content);
      this.diagramWrapper.appendChild(layer);
    });
    
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
  
  // Action when a Large Category is selected
  selectLargeCategory(largeId) {
    this.currentLargeId = largeId;
    
    // Update active class on large sidebar buttons
    const buttons = this.largeCategoryList.querySelectorAll(".nav-large-item");
    this.data.forEach((largeCat, index) => {
      if (largeCat.id === largeId) {
        buttons[index].classList.add("active");
        this.selectedLargeTitle.textContent = largeCat.title;
        
        // Count subcategories
        let count = 0;
        largeCat.subcategories.forEach(sub => count += sub.items.length);
        this.selectedLargeCount.textContent = `${count} Topics`;
      } else {
        buttons[index].classList.remove("active");
      }
    });
    
    this.renderSubCategorySidebar(largeId);
  }
  
  // Helper for welcome cards to auto-select
  selectCategory(largeId) {
    this.selectLargeCategory(largeId);
    
    // Select first article of this category automatically
    const largeCat = this.data.find(c => c.id === largeId);
    if (largeCat && largeCat.subcategories.length > 0 && largeCat.subcategories[0].items.length > 0) {
      const firstItem = largeCat.subcategories[0].items[0];
      this.selectArticle(firstItem.id);
    }
  }
  
  // 2. Render Sub-Category Sidebar (중분류 -> 소분류)
  renderSubCategorySidebar(largeId) {
    this.subCategoryList.innerHTML = "";
    const largeCat = this.data.find(c => c.id === largeId);
    if (!largeCat) return;
    
    largeCat.subcategories.forEach(sub => {
      const groupDiv = document.createElement("div");
      groupDiv.className = "nav-tree-group";
      
      const titleDiv = document.createElement("div");
      titleDiv.className = "nav-tree-title";
      titleDiv.textContent = sub.title;
      groupDiv.appendChild(titleDiv);
      
      const itemsDiv = document.createElement("div");
      itemsDiv.className = "nav-tree-items";
      
      sub.items.forEach(item => {
        const itemLink = document.createElement("a");
        itemLink.className = "nav-tree-item";
        itemLink.textContent = item.title;
        itemLink.setAttribute("data-id", item.id);
        
        if (this.currentSmallId === item.id) {
          itemLink.classList.add("active");
        }
        
        itemLink.addEventListener("click", () => {
          this.selectArticle(item.id);
          this.closeMobileDrawer();
        });
        
        itemsDiv.appendChild(itemLink);
      });
      
      groupDiv.appendChild(itemsDiv);
      this.subCategoryList.appendChild(groupDiv);
    });
  }
  
  // 3. Select & Render Article Content (소분류 상세)
  selectArticle(smallId) {
    this.currentSmallId = smallId;
    
    // Find item and its path
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
    
    // Ensure large category sidebar is synchronized
    if (this.currentLargeId !== foundLarge.id) {
      this.selectLargeCategory(foundLarge.id);
    }
    
    // Highlight small category link in the middle navigation
    document.querySelectorAll(".nav-tree-item").forEach(link => {
      if (link.getAttribute("data-id") === smallId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    
    // Highlight corresponding block in the diagram view
    document.querySelectorAll(".diagram-block").forEach(block => {
      if (block.getAttribute("data-id") === smallId) {
        block.classList.add("active");
      } else {
        block.classList.remove("active");
      }
    });
    
    // Render breadcrumbs
    document.getElementById("breadcrumb-large").textContent = foundLarge.title;
    document.getElementById("breadcrumb-middle").textContent = foundMiddle.title;
    document.getElementById("breadcrumb-small").textContent = foundItem.title;
    
    // Render title and summary
    document.getElementById("article-title").textContent = foundItem.title;
    document.getElementById("article-summary").textContent = foundItem.summary;
    
    // Bookmark status visual setup
    const bookmarkBtn = document.getElementById("article-bookmark-btn");
    if (this.favorites.includes(smallId)) {
      bookmarkBtn.classList.add("bookmarked");
    } else {
      bookmarkBtn.classList.remove("bookmarked");
    }
    
    // Render HTML content safely
    document.getElementById("article-body").innerHTML = foundItem.content || "<p>설명 문건이 아직 존재하지 않습니다.</p>";
    
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
              <i data-lucide="external-link"></i>
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
    
    // Show the screen
    this.showScreen("article");
    
    // Refresh LaTeX math formatting if MathJax is loaded
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }
  
  // 4. Search Functionality
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
  
  // 5. Bookmark (Favorites) Handling
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
