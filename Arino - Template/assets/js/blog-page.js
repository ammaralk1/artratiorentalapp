(function () {
  if (!document.body || document.body.dataset.page !== "blog") return;

  var container = document.querySelector(".col-lg-8");
  if (!container) return;
  var PAGE_SIZE = 3;
  var normalizedPath = (function (rawPath) {
    var p = rawPath || "/";
    try {
      p = decodeURIComponent(p);
    } catch (e) {}
    p = p.replace(/\/{2,}/g, "/");
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  })(window.location.pathname || "/");
  var isArabic = function () {
    return (document.documentElement.lang || "en").toLowerCase().startsWith("ar");
  };

  var posts = Array.prototype.slice.call(
    container.querySelectorAll(":scope > .cs-post.cs-style2")
  );
  if (!posts.length) return;

  var monthFormatter = function () {
    var lang = (document.documentElement.lang || "en").toLowerCase().startsWith("ar")
      ? "ar"
      : "en";
    return new Intl.DateTimeFormat(lang === "ar" ? "ar-SA" : "en-US", {
      month: "long",
      year: "numeric",
    });
  };

  var parseDate = function (post) {
    var raw = post.getAttribute("data-post-date") || "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return new Date(raw + "T00:00:00");
    var label = post.querySelector(".cs-posted_by");
    var fallback = label ? Date.parse(label.textContent.trim()) : NaN;
    return isNaN(fallback) ? new Date("1970-01-01T00:00:00") : new Date(fallback);
  };

  var postMeta = posts.map(function (post) {
    var raw = post.getAttribute("data-post-date") || "";
    var dateObj = parseDate(post);
    var monthKey = /^\d{4}-\d{2}-\d{2}$/.test(raw)
      ? raw.slice(0, 7)
      : String(dateObj.getFullYear()) + "-" + String(dateObj.getMonth() + 1).padStart(2, "0");
    var category = (post.getAttribute("data-post-category") || "").toLowerCase();
    var mainLink = post.querySelector(".cs-post_title a") || post.querySelector("a[href]");
    var categorySlug = "";
    var postSlug = "";
    if (mainLink) {
      try {
        var parsed = new URL(mainLink.getAttribute("href") || "", window.location.origin);
        var pathParts = (parsed.pathname || "").split("/").filter(Boolean);
        var blogStart = pathParts.indexOf("blog");
        if (blogStart >= 0 && pathParts.length >= blogStart + 3) {
          categorySlug = (pathParts[blogStart + 1] || "").toLowerCase();
          postSlug = (pathParts[blogStart + 2] || "").toLowerCase();
        }
      } catch (e) {}
    }
    return {
      el: post,
      date: dateObj,
      monthKey: monthKey,
      category: category,
      categorySlug: categorySlug,
      postSlug: postSlug,
    };
  });

  postMeta.sort(function (a, b) {
    return b.date.getTime() - a.date.getTime();
  });

  var removeLegacySpacers = function () {
    var legacy = container.querySelectorAll(":scope > .cs-height_95.cs-height_lg_60");
    legacy.forEach(function (node) {
      node.remove();
    });
  };

  var marker =
    container.querySelector(":scope > .cs-height_60.cs-height_lg_40") ||
    container.querySelector(":scope > .cs-pagination_box");
  var pagination = container.querySelector(":scope > .cs-pagination_box");

  var clearInsertedSpacers = function () {
    var added = container.querySelectorAll(":scope > .js-post-spacer");
    added.forEach(function (node) {
      node.remove();
    });
  };

  var parsePathState = function (path) {
    var parts = path.split("/").filter(Boolean);
    if (!parts.length) return { mode: "list" };

    var first = parts[0];
    var langPrefix = first === "en" || first === "ar" ? first : "";
    var rest = langPrefix ? parts.slice(1) : parts.slice(0);
    if (!rest.length) return { mode: "list" };

    var section = rest[0];
    var isBlogSection =
      section === "blog" ||
      section === "المدونة" ||
      section === "كشكولنا" ||
      (section && section.toLowerCase() === "blog.html");
    if (!isBlogSection) return { mode: "list" };

    if (rest.length === 1) return { mode: "list" };

    var second = (rest[1] || "").toLowerCase();
    var third = (rest[2] || "").toLowerCase();
    if (second === "category" || second === "التصنيف") {
      return { mode: "list", category: third };
    }
    if (second === "tag" || second === "وسم") {
      return { mode: "list", tag: third };
    }
    if (rest.length >= 3) {
      return {
        mode: "post",
        categorySlug: second,
        postSlug: third,
      };
    }

    return { mode: "list" };
  };

  var pathState = parsePathState(normalizedPath);
  var pageHeadingActive = document.querySelector(".breadcrumb-item.active");
  var defaultBread = pageHeadingActive ? pageHeadingActive.textContent : "";
  var defaultTitle = document.title;

  var updateSeoTitle = function (titleText) {
    if (!titleText) return;
    document.title = titleText;
    document
      .querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]')
      .forEach(function (meta) {
        meta.setAttribute("content", titleText);
      });
  };

  var getBlogBasePath = function () {
    if (isArabic()) return "/كشكولنا/";
    if (normalizedPath.indexOf("/en/") === 0) return "/en/blog/";
    return "/blog/";
  };

  var renderPosts = function (filtered) {
    removeLegacySpacers();
    clearInsertedSpacers();

    postMeta.forEach(function (meta) {
      meta.el.style.display = "none";
    });

    filtered.forEach(function (meta, idx) {
      container.insertBefore(meta.el, marker || null);
      meta.el.style.display = "";
      if (idx !== filtered.length - 1) {
        var spacer = document.createElement("div");
        spacer.className = "cs-height_95 cs-height_lg_60 js-post-spacer";
        container.insertBefore(spacer, marker || null);
      }
    });

  };

  var getQuery = function () {
    var params = new URLSearchParams(window.location.search);
    var parsedPage = parseInt(params.get("page") || "1", 10);
    var page = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
    var categoryFromPath = pathState.category || "";
    var tagFromPath = pathState.tag || "";
    return {
      category: (params.get("category") || categoryFromPath || "").toLowerCase(),
      month: (params.get("month") || "").toLowerCase(),
      tag: (params.get("tag") || tagFromPath || "").toLowerCase(),
      page: page,
    };
  };

  var buildListHref = function (q, page) {
    var params = new URLSearchParams();
    if (q.category) params.set("category", q.category);
    if (q.month) params.set("month", q.month);
    if (q.tag) params.set("tag", q.tag);
    if (page > 1) params.set("page", String(page));
    var query = params.toString();
    return getBlogBasePath() + (query ? "?" + query : "");
  };

  var renderPagination = function (totalPages, currentPage, q) {
    if (!pagination) return;
    pagination.innerHTML = "";

    if (totalPages <= 1) {
      pagination.style.display = "none";
      return;
    }

    pagination.style.display = "";
    for (var pageNum = 1; pageNum <= totalPages; pageNum += 1) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.className = "cs-pagination_item cs-center" + (pageNum === currentPage ? " active" : "");
      a.href = buildListHref(q, pageNum);
      a.textContent = String(pageNum);
      li.appendChild(a);
      pagination.appendChild(li);
    }
  };

  var buildArchive = function () {
    var archiveList = document.getElementById("js-blog-archive-list");
    if (!archiveList) return;

    var counts = {};
    postMeta.forEach(function (meta) {
      counts[meta.monthKey] = (counts[meta.monthKey] || 0) + 1;
    });

    var months = Object.keys(counts).sort().reverse();
    archiveList.innerHTML = "";

    var langIsAr = (document.documentElement.lang || "en").toLowerCase().startsWith("ar");
    var allLi = document.createElement("li");
    var allA = document.createElement("a");
    allA.href = getBlogBasePath();
    allA.textContent = langIsAr ? "الأرشيف الكامل" : "Full Archive";
    allLi.appendChild(allA);
    archiveList.appendChild(allLi);

    var formatter = monthFormatter();
    months.forEach(function (monthKey) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = getBlogBasePath() + "?month=" + monthKey;
      var date = new Date(monthKey + "-01T00:00:00");
      a.textContent = formatter.format(date) + " (" + counts[monthKey] + ")";
      li.appendChild(a);
      archiveList.appendChild(li);
    });
  };

  var detailsBackNode = null;
  var ensureBackLink = function () {
    if (detailsBackNode) return detailsBackNode;
    var wrapper = document.createElement("div");
    wrapper.className = "cs-height_30 cs-height_lg_20 js-blog-back-wrap";

    var link = document.createElement("a");
    link.className = "cs-text_btn js-blog-back-link";
    link.href = getBlogBasePath();
    wrapper.appendChild(link);
    detailsBackNode = wrapper;
    return detailsBackNode;
  };

  var updateBackLabel = function () {
    if (!detailsBackNode) return;
    var link = detailsBackNode.querySelector(".js-blog-back-link");
    if (!link) return;
    link.href = getBlogBasePath();
    link.textContent = isArabic() ? "العودة إلى كل المقالات" : "Back to all articles";
  };

  var resetDetailView = function () {
    if (detailsBackNode && detailsBackNode.parentNode) detailsBackNode.remove();
    if (pageHeadingActive) pageHeadingActive.textContent = defaultBread;
    updateSeoTitle(defaultTitle);
  };

  var renderSinglePostView = function (meta) {
    if (!meta) return false;
    removeLegacySpacers();
    clearInsertedSpacers();
    postMeta.forEach(function (item) {
      item.el.style.display = "none";
    });
    container.insertBefore(meta.el, marker || null);
    meta.el.style.display = "";
    if (pagination) pagination.style.display = "none";

    var backWrap = ensureBackLink();
    updateBackLabel();
    container.insertBefore(backWrap, meta.el);

    var titleNode = meta.el.querySelector(".cs-post_title a");
    if (pageHeadingActive && titleNode) pageHeadingActive.textContent = titleNode.textContent.trim();
    if (titleNode) {
      updateSeoTitle("Art Ratio - " + titleNode.textContent.trim());
    }
    return true;
  };

  var applyFilter = function () {
    if (pathState.mode === "post") {
      var selected = postMeta.find(function (meta) {
        return (
          meta.categorySlug === (pathState.categorySlug || "") &&
          meta.postSlug === (pathState.postSlug || "")
        );
      });
      if (renderSinglePostView(selected)) return;
    }

    resetDetailView();
    var q = getQuery();
    var filtered = postMeta.filter(function (meta) {
      var catOk = !q.category || meta.category === q.category;
      var monthOk = !q.month || meta.monthKey === q.month;
      var tagsRaw = (meta.el.getAttribute("data-post-tags") || "").toLowerCase();
      var tags = tagsRaw ? tagsRaw.split(",").map(function (t) { return t.trim(); }) : [];
      var tagOk = !q.tag || tags.indexOf(q.tag) !== -1;
      return catOk && monthOk && tagOk;
    });

    var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    var currentPage = q.page > totalPages ? totalPages : q.page;
    var start = (currentPage - 1) * PAGE_SIZE;
    var pagePosts = filtered.slice(start, start + PAGE_SIZE);

    renderPosts(pagePosts);
    renderPagination(totalPages, currentPage, q);
  };

  buildArchive();
  applyFilter();

  var observer = new MutationObserver(function () {
    buildArchive();
    applyFilter();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
})();
