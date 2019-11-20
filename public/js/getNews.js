$(document).ready(async function() {
  let news = await axios
    .get("http://localhost:4004/api/get-news")
    .then(res => res.data.news);

  news.map(n => {
    $(".container-news").append(`
        <div class="card-container">
        <div class="X" id="${n._id}">
          <div class="line-1"></div>
          <div class="line-2"></div>
        </div>
        <div class="image">
        <img
            src="${n.image}"
            alt="">
        </div>
        <div class="card-body">
        <div class="news-title">
            <h3>${n.title}</h3>
        </div>
        <div class="author">
            <i>${n.author}</i>
        </div>
        <div class="about-news">
            <p>${n.desc}</p>
        </div>
        </div>
        <div class="add-something">
          <a href="/news-form-edit"><i class="fas fa-plus"></i></a>
        </div>
        </div>
    `);
  });
  let newsId = "";
  $(".X").click(function(e) {
    newsId = $(this).attr("id");
    console.log(newsId);
    $("dialog").addClass("alert");
  });
  $("#no").click(function() {
    newsId = "";
    $("dialog").removeClass("alert");
  });
  $("#yes").click(async function() {
    const res = await axios.delete(
      `http://localhost:4004/api/delete-news/${newsId}`
    );
    if (res.data.err) {
    } else {
      $(`.container-news div[id=${newsId}]`)
        .parent()
        .remove();
      $("dialog").removeClass("alert");
      newsId = "";
    }
  });

  $(".add-something").click(function() {
    let id = $(this)
      .parent()
      .find($(".X"))
      .attr("id");
    let oneNews = news.filter(n => n._id === id)[0];
    localStorage.setItem("editedNews", JSON.stringify(oneNews));
  });
});
