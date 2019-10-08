<template>
  <div class="container">
    <div class="row my-3 my-md-5 js_loger">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-status bg-red"></div>
          <div class="card-body p-6 js_login">
            <div class="form-group">
              <label class="form-label">채널입력</label>
              <form @submit="checkFrom">
                <div class="row gutters-xs">
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="channel" placeholder="채널이름">
                    <span class="input-group-append">
                      <button class="btn btn-primary" type="submit">Go!</button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channel: ''
    }
  },
  methods: {
    checkFrom(e) {
      e.preventDefault();

      var trigger = true;
      var channel = this.channel;

      if(channel == '') {

        alert('채널이름을 입력하세요.');
        trigger = false;
      }
      else if(this.validateChannel(channel) === false) {

        alert('채널이름은 영문 또는 숫자만 가능하며 공백을 허용하지 않습니다.');
        trigger = false;
      }
      //else if(channel.length > 10) {
      //  alert('채널이름은 최대 10자까지만 사용가능합니다.');
      //  trigger = false;
      //}

      if(trigger === true) this.$router.push('/'+channel);
    },
    validateChannel: function(name) {
      var ck = /^[A-Za-z0-9_\-+]*$/;
      return ck.test(name);
    }
  }
}
</script>