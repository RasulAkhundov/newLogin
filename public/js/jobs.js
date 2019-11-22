$(document).ready(async function() {
  let jobs = await axios
    .get("http://localhost:4004/api/get-jobs")
    .then(res => res.data.jobs);

  jobs.map(j => {
    console.log(j);
    $(".jobs-container").append(`
            <div class="job-box">
                <div class="X" id="${j._id}">
                    <div class="line-1"></div>
                    <div class="line-2"></div>
                </div>
                <img src="/routes/upload/${j.image}" alt="">

                <div class="job-box-body">
                    <div class="is-adi box" style="display: flex;">
                        <h5>isin adi:</h5><h2>${j.ad}</h2>
                    </div>
                    <div class="tecrube box" style="display: flex;">
                        <h5>Tecrube:</h5><h2>${j.tecrube}<span>il</span></h2>
                    </div>
                    <div class="time box" style="display: flex;">
                        <h5>is vaxti:</h5><h2>${j.tarix}</h2>
                    </div>
                    <div class="maas box" style="display: flex;">
                        <h5>Maas:</h5><h2>${j.maas}<span>AZN</span></h2>
                    </div>
                </div>
            </div>
        `);
  });
  let jobsId = "";
  $(".X").click(async function(e) {
    jobsId = $(this).attr("id");
    const res = await axios.delete(
      `http://localhost:4004/api/delete-jobs/${jobsId}`
    );
    if (res.data.err) {
    } else {
      $(`.jobs-container div[id=${jobsId}]`)
        .parent()
        .remove();
      alert("silim?");
    }
  });
});
