$(document).ready(function() {
  let jobsData = {};

  $("#send-form").click(async function() {
    jobsData.ad = $("#isin-adi").val();
    // jobsData.image = $("#image").val();
    jobsData.tecrube = $("#tecrube").val();
    jobsData.tarix = $("#tarix").val();
    jobsData.maas = $("#maas").val();

    console.log(jobsData);

    let art = await axios
      .post("http://localhost:4004/api/create-jobs", jobsData)
      .then(res => {
        window.location.href = "/jobs";
        return res.data;
      })
      .catch(err => {
        console.log("error from api", err);
      });
    console.log(art);
  });

  $("input[name=job-image]").on("change", function(e) {
    const image = $(this)[0].files[0];

    if (image.size > 1200000) {
      console.log("size is too large");
      $(this).val("");
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = async () => {
        if (!!reader.result) {
          jobsData.image = reader.result;
        } else {
          console.log(Error("Failed converting to base64"));
        }
      };
    }
  });
});
