document.addEventListener("alpine:init", () => {
  Alpine.data("useForm", () => ({
    formResponse: '',
    formStatus: "",
    formLoading: false,
    data() {
      const formData =  new FormData(this.$el);
      var data = {};
      formData.forEach(function(value, key){
        data[key] = value;
      });
      // add domain
      let currentDomain = window.location.hostname;
      data['domain'] = currentDomain.replace(".chaibuilder.xyz", "").replace(".localhost", "");

      // add page url:
      data['page_url'] = window.location.pathname;
      return data;
    },

    async post() {
      this.formResponse = '';
      this.formStatus = '';
      this.formLoading = true;
      let url = this.$el.action;
      // url = url && url.indexOf('https://') === -1 ? 'https://app.chaibuilder.xyz/api/form/submit' : url;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.data()),
      })
      if(response.status >=  200 && response.status <= 299) {
        this.formResponse = this.$el.getAttribute("data-success");
        this.formStatus = "SUCCESS"
      } else {
        this.formResponse = this.$el.getAttribute("data-error");
        this.formStatus = "ERROR"
      }
      this.formLoading = false;

    },
  }));
});