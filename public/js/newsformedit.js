$(document).ready(function() {
  if (window.location.pathname === "/news-form-edit") {
    let formData = {};

    let oneNews = JSON.parse(localStorage.getItem("editedNews"));
    $("input[name=title-e]").val(oneNews.title);
    $("input[name=author-e]").val(oneNews.author);
    $("input[name=img-e]").val(oneNews.image);
    $("textarea[name=description-e]").val(oneNews.desc);

    $(".edit-btn").click(async function() {
      formData.title = $('input[name="title-e"]').val();
      formData.author = $('input[name="author-e"]').val();
      formData.image = $('input[name="img-e"]').val();
      formData.desc = $('textarea[name="description-e"]').val();

      await axios.put(
        `http://localhost:4004/api/update-news/${oneNews._id}`,
        formData
      );
      window.location.href = "/news";
    });
  }
});
