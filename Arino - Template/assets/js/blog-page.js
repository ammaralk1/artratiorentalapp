(function () {
  if (!document.body || document.body.dataset.page !== "blog") return;

  var container = document.querySelector(".col-lg-8");
  if (!container) return;
  var PAGE_SIZE = 3;

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
    return {
      el: post,
      date: dateObj,
      monthKey: monthKey,
      category: category,
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
    return {
      category: (params.get("category") || "").toLowerCase(),
      month: (params.get("month") || "").toLowerCase(),
      tag: (params.get("tag") || "").toLowerCase(),
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
    return "blog.html" + (query ? "?" + query : "");
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
    allA.href = "blog.html";
    allA.textContent = langIsAr ? "الأرشيف الكامل" : "Full Archive";
    allLi.appendChild(allA);
    archiveList.appendChild(allLi);

    var formatter = monthFormatter();
    months.forEach(function (monthKey) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "blog.html?month=" + monthKey;
      var date = new Date(monthKey + "-01T00:00:00");
      a.textContent = formatter.format(date) + " (" + counts[monthKey] + ")";
      li.appendChild(a);
      archiveList.appendChild(li);
    });
  };

  var applyFilter = function () {
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
