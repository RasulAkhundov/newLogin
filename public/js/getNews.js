$(document).ready(async function() {
  const news = await axios
    .get("http://localhost:4004/api/get-news")
    .then(res => res.data.news);

  news.map(n => {
    $(".container-news").append(`
        <div class="card-container">
        <div class="X">
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
          <a href="/news-form"><i class="fas fa-plus"></i></a>
        </div>
        </div>
    `);
  });
  $(".X").click(function() {
    $("dialog").addClass('alert');
  })
  $("#no").click(function() {
    $("dialog").removeClass('alert');
  })
});
