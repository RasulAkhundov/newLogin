$(document).ready(function() {

    let formData = {};
    
    $('.form-container-flex button').on("click", async function() {

      formData.title = $('.form-container-flex input[name="title"]').val();
      formData.author = $('.form-container-flex input[name="author"]').val();
      formData.desc = $('.form-container-flex textarea[name="description"]').val();


      let article = await axios.post("http://localhost:4004/api/create-news", formData)
        .then(res => {
          return res.data
        })
        .catch(err => {
          console.log('error from api', err)
        })

      console.log(article)  

    })

})