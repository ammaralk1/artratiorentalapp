(function () {
  "use strict";

  var API_ENDPOINT = "/backend/api/blog-comments/";
  var postSlug = resolvePostSlug();
  if (!postSlug) return;

  var form = document.querySelector(".col-lg-8 form.row");
  if (!form) return;
  form.classList.add("blog-comment-form");

  var fieldMap = resolveFormFields(form);
  if (!fieldMap.name || !fieldMap.comment) return;

  var i18n = getLocaleStrings();
  var ui = mountCommentsUi(form, i18n);

  form.setAttribute("novalidate", "novalidate");
  if (!fieldMap.name.getAttribute("name")) fieldMap.name.setAttribute("name", "author_name");
  if (fieldMap.email && !fieldMap.email.getAttribute("name")) fieldMap.email.setAttribute("name", "author_email");
  if (!fieldMap.comment.getAttribute("name")) fieldMap.comment.setAttribute("name", "content");

  fieldMap.name.setAttribute("required", "required");
  fieldMap.comment.setAttribute("required", "required");
  if (fieldMap.email) {
    fieldMap.email.setAttribute("type", "email");
  }

  loadComments();
  form.addEventListener("submit", onSubmit);
  window.addEventListener("arino:language-changed", onLanguageChanged);

  async function loadComments() {
    setStatus(ui, "");
    setLoading(ui, true, i18n.loadingComments);
    try {
      var payload = await requestJson(API_ENDPOINT + "?post_slug=" + encodeURIComponent(postSlug) + "&limit=100", {
        method: "GET"
      });
      var comments = Array.isArray(payload && payload.data) ? payload.data : [];
      renderComments(ui, comments, i18n);
    } catch (error) {
      renderComments(ui, [], i18n);
      setStatus(ui, normalizeError(error) || i18n.loadFailed, "error");
    } finally {
      setLoading(ui, false);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus(ui, "");

    var authorName = normalizeSingleLine(fieldMap.name.value);
    var authorEmail = fieldMap.email ? String(fieldMap.email.value || "").trim() : "";
    var content = normalizeCommentText(fieldMap.comment.value);

    if (authorName.length < 2) {
      setStatus(ui, i18n.invalidName, "error");
      fieldMap.name.focus();
      return;
    }
    if (authorEmail !== "" && !isValidEmail(authorEmail)) {
      setStatus(ui, i18n.invalidEmail, "error");
      if (fieldMap.email) fieldMap.email.focus();
      return;
    }
    if (content.length < 3) {
      setStatus(ui, i18n.invalidComment, "error");
      fieldMap.comment.focus();
      return;
    }

    setSubmitting(form, true);
    try {
      var payload = await requestJson(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          post_slug: postSlug,
          author_name: authorName,
          author_email: authorEmail,
          content: content
        })
      });

      var comment = payload && payload.data ? payload.data : null;
      var approved = !!(payload && payload.meta && payload.meta.approved);

      form.reset();
      if (approved && comment) {
        prependComment(ui, comment, i18n);
        setStatus(ui, i18n.submitSuccess, "success");
      } else {
        setStatus(ui, i18n.submitPending, "success");
      }
    } catch (error) {
      setStatus(ui, normalizeError(error) || i18n.submitFailed, "error");
    } finally {
      setSubmitting(form, false);
    }
  }

  function resolvePostSlug() {
    var pathname = "";
    try {
      pathname = decodeURIComponent(window.location.pathname || "");
    } catch (_) {
      pathname = window.location.pathname || "";
    }

    var cleaned = pathname.replace(/\/index\.html?$/i, "").replace(/^\/+|\/+$/g, "");
    if (!cleaned) return "";

    var segments = cleaned.split("/").filter(Boolean);
    if (!segments.length) return "";

    var start = 0;
    if (segments[0] === "blog") {
      start = 1;
    } else if (segments[0] === "en" && segments[1] === "blog") {
      start = 2;
    } else if (segments[0] === "ar" && (segments[1] === "المدونة" || segments[1] === "كشكولنا")) {
      start = 2;
    } else {
      var blogIndex = segments.indexOf("blog");
      if (blogIndex >= 0) start = blogIndex + 1;
    }

    var slugSegments = segments.slice(start);
    if (!slugSegments.length) return "";
    if (slugSegments[0] === "category" || slugSegments[0] === "tag") return "";

    return slugSegments.join("/");
  }

  function resolveFormFields(targetForm) {
    var inputs = Array.prototype.slice.call(targetForm.querySelectorAll("input.cs-form_field"));
    return {
      name: inputs[0] || null,
      email: inputs[1] || null,
      comment: targetForm.querySelector("textarea.cs-form_field")
    };
  }

  function mountCommentsUi(targetForm, strings) {
    var section = document.createElement("div");
    section.className = "blog-comments-section";

    var heading = document.createElement("h2");
    heading.className = "cs-font_50 cs-m0";
    heading.textContent = strings.commentsTitle;
    section.appendChild(heading);

    var spacer = document.createElement("div");
    spacer.className = "cs-height_30 cs-height_lg_30";
    section.appendChild(spacer);

    var list = document.createElement("div");
    list.className = "blog-comments-list";
    section.appendChild(list);

    var host = targetForm.parentElement;
    var replyHeading = host ? host.querySelector("h2.cs-font_50") : null;
    if (host && replyHeading) {
      host.insertBefore(section, replyHeading);
    } else if (host) {
      host.insertBefore(section, targetForm);
    }

    var status = document.createElement("p");
    status.className = "blog-comments-status";
    status.setAttribute("aria-live", "polite");

    var submitContainer = targetForm.querySelector(".cs-btn") ? targetForm.querySelector(".cs-btn").closest(".col-lg-12") : null;
    if (submitContainer && submitContainer.parentNode) {
      submitContainer.parentNode.insertBefore(status, submitContainer);
    } else {
      targetForm.appendChild(status);
    }

    return {
      root: section,
      heading: heading,
      list: list,
      status: status,
      comments: []
    };
  }

  function renderComments(uiState, comments, strings) {
    uiState.comments = Array.isArray(comments) ? comments.slice() : [];
    uiState.list.innerHTML = "";
    uiState.heading.textContent = buildCommentsTitle(strings, uiState.comments.length);

    if (!uiState.comments.length) {
      var empty = document.createElement("p");
      empty.className = "blog-comments-empty";
      empty.textContent = strings.emptyComments;
      uiState.list.appendChild(empty);
      return;
    }

    var fragment = document.createDocumentFragment();
    uiState.comments.forEach(function (comment) {
      fragment.appendChild(buildCommentCard(comment, strings));
    });
    uiState.list.appendChild(fragment);
  }

  function buildCommentsTitle(strings, count) {
    var template = strings.commentsTitleCount || (strings.commentsTitle + " ({count})");
    return template.replace("{count}", String(count));
  }

  function prependComment(uiState, comment, strings) {
    if (!comment) return;
    uiState.comments = Array.isArray(uiState.comments) ? uiState.comments : [];
    uiState.comments.unshift(comment);
    renderComments(uiState, uiState.comments, strings);
  }

  function onLanguageChanged() {
    i18n = getLocaleStrings();
    renderComments(ui, ui.comments || [], i18n);
  }

  function buildCommentCard(comment, strings) {
    var card = document.createElement("article");
    card.className = "blog-comment-card";

    var head = document.createElement("div");
    head.className = "blog-comment-head";

    var author = document.createElement("strong");
    author.className = "blog-comment-author";
    author.textContent = String(comment.author_name || strings.anonymous);
    head.appendChild(author);

    var date = document.createElement("span");
    date.className = "blog-comment-date";
    date.textContent = formatDate(comment.created_at, strings);
    head.appendChild(date);

    card.appendChild(head);

    var body = document.createElement("p");
    body.className = "blog-comment-body";
    body.textContent = String(comment.content || "");
    card.appendChild(body);

    return card;
  }

  function setLoading(uiState, isLoading, label) {
    if (!isLoading) return;
    uiState.list.innerHTML = "";
    var loading = document.createElement("p");
    loading.className = "blog-comments-empty";
    loading.textContent = label;
    uiState.list.appendChild(loading);
  }

  function setStatus(uiState, message, tone) {
    uiState.status.textContent = message || "";
    uiState.status.classList.remove("is-error", "is-success");
    if (tone === "error") uiState.status.classList.add("is-error");
    if (tone === "success") uiState.status.classList.add("is-success");
  }

  function setSubmitting(targetForm, submitting) {
    var button = targetForm.querySelector("button.cs-btn, button[type='submit']");
    if (!button) return;
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent || "";
    }
    button.disabled = !!submitting;
    button.classList.toggle("is-disabled", !!submitting);

    if (submitting) {
      button.setAttribute("aria-busy", "true");
    } else {
      button.removeAttribute("aria-busy");
    }
  }

  function normalizeSingleLine(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function normalizeCommentText(value) {
    return String(value || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function formatDate(rawValue, strings) {
    var date = parseDateValue(rawValue);
    if (!date) return strings.unknownDate;
    try {
      var locale = isArabicPage() ? "ar-SA" : "en-US";
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric"
      }).format(date);
    } catch (_) {
      return date.toISOString().slice(0, 10);
    }
  }

  function parseDateValue(value) {
    if (!value) return null;
    var text = String(value);
    var direct = new Date(text);
    if (!isNaN(direct.getTime())) return direct;
    var normalized = new Date(text.replace(" ", "T"));
    if (!isNaN(normalized.getTime())) return normalized;
    return null;
  }

  function normalizeError(error) {
    if (!error) return "";
    if (typeof error === "string") return error;
    return String(error.message || "").trim();
  }

  async function requestJson(url, options) {
    var response = await fetch(url, Object.assign({
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }, options || {}));

    var payload = null;
    try {
      payload = await response.json();
    } catch (_) {
      payload = null;
    }

    if (!response.ok || (payload && payload.ok === false)) {
      var message = payload && payload.error ? payload.error : "Request failed";
      throw new Error(message);
    }

    return payload || { ok: true, data: null };
  }

  function isArabicPage() {
    try {
      var stored = localStorage.getItem("arinoLang");
      if (stored === "ar") return true;
      if (stored === "en") return false;
    } catch (_) {}

    var htmlLang = String((document.documentElement && document.documentElement.lang) || "").toLowerCase();
    var dir = String((document.documentElement && document.documentElement.dir) || "").toLowerCase();
    if (htmlLang.indexOf("ar") === 0 || dir === "rtl") return true;
    if (htmlLang.indexOf("en") === 0 && dir === "ltr") return false;

    var probe = document.querySelector(".cs-post_title, .breadcrumb .active, h2.cs-font_50");
    var text = probe ? String(probe.textContent || "") : "";
    return /[\u0600-\u06FF]/.test(text);
  }

  function getLocaleStrings() {
    var ar = isArabicPage();
    function t(key, fallback) {
      var getter = typeof window !== "undefined" ? window.getArinoTranslation : null;
      if (typeof getter === "function") {
        var translated = getter(key, fallback);
        if (translated) return translated;
      }
      return fallback;
    }

    return {
      commentsTitle: t("blog_comments_title", ar ? "التعليقات" : "Comments"),
      commentsTitleCount: t("blog_comments_title_count", ar ? "التعليقات ({count})" : "Comments ({count})"),
      emptyComments: t("blog_comments_empty", ar ? "لا يوجد تعليقات حتى الآن." : "No comments yet."),
      loadingComments: t("blog_comments_loading", ar ? "جاري تحميل التعليقات..." : "Loading comments..."),
      loadFailed: t("blog_comments_load_failed", ar ? "تعذر تحميل التعليقات." : "Unable to load comments."),
      submitSuccess: t("blog_comments_submit_success", ar ? "تم نشر تعليقك بنجاح." : "Your comment was published."),
      submitPending: t("blog_comments_submit_pending", ar ? "تم استلام تعليقك وهو بانتظار المراجعة." : "Your comment was submitted and is awaiting moderation."),
      submitFailed: t("blog_comments_submit_failed", ar ? "تعذر إرسال التعليق." : "Unable to submit your comment."),
      invalidName: t("blog_comments_invalid_name", ar ? "الاسم مطلوب (حرفين على الأقل)." : "Name is required (at least 2 characters)."),
      invalidEmail: t("blog_comments_invalid_email", ar ? "البريد الإلكتروني غير صحيح." : "Please enter a valid email."),
      invalidComment: t("blog_comments_invalid_comment", ar ? "التعليق مطلوب (3 أحرف على الأقل)." : "Comment is required (at least 3 characters)."),
      anonymous: t("blog_comments_anonymous", ar ? "زائر" : "Visitor"),
      unknownDate: t("blog_comments_unknown_date", ar ? "تاريخ غير معروف" : "Unknown date")
    };
  }
})();
