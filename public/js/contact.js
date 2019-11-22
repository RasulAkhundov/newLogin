$(document).ready(function() {
  let formData = {};

  $("#contact-btn").click(async function() {
    formData.ad = $("#name").val();
    formData.soyad = $("#surname").val();
    formData.email = $("#email").val();
    formData.message = $("#text-box").val();

    console.log(formData);

    let email = await axios
      .post("http://localhost:4004/api/post-contact", formData)
      .then(res => {
        $("#name").val("");
        $("#surname").val("");
        $("#email").val("");
        $("#text-box").val("");
      });
   
  });
});
