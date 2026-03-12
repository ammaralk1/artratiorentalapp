(function () {
  var archiveList = document.getElementById("js-blog-archive-list");
  if (!archiveList) return;

  // blog.html has its own archive/filter controller.
  if (document.body && document.body.dataset.page === "blog") return;

  var posts = [
    { date: "2026-02-22" },
    { date: "2026-02-15" },
    { date: "2026-02-08" },
    { date: "2026-02-01" },
  ];

  var monthFormatter = function () {
    var isAr = (document.documentElement.lang || "en").toLowerCase().startsWith("ar");
    return new Intl.DateTimeFormat(isAr ? "ar-SA" : "en-US", {
      month: "long",
      year: "numeric",
    });
  };

  var buildArchive = function () {
    var counts = {};
    posts.forEach(function (post) {
      var monthKey = post.date.slice(0, 7);
      counts[monthKey] = (counts[monthKey] || 0) + 1;
    });

    var months = Object.keys(counts).sort().reverse();
    archiveList.innerHTML = "";

    var isAr = (document.documentElement.lang || "en").toLowerCase().startsWith("ar");
    var allLi = document.createElement("li");
    var allA = document.createElement("a");
    allA.href = "blog.html";
    allA.textContent = isAr ? "الأرشيف الكامل" : "Full Archive";
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

  buildArchive();

  var observer = new MutationObserver(function () {
    buildArchive();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
})();
