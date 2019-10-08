<template>
<div class="container">
  <div class="row my-3 my-md-5 js_loger">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <div class="card-status bg-red js_connection"></div>
          <div class="input-group">
            <input type="text" v-bind:value="channel" class="form-control" disabled="disabled">
            <div class="input-group-append">
              <button type="button" class="btn btn-secondary" disabled="disabled" style="z-index:1"><i class="fe fe-user"></i></button>
            </div>
          </div>
        </div>
        <div class="card-body">

          <div class="card my-md-2" v-if="logs.length <= 0">
            <div class="card-status card-status-left bg-blue"></div>
            <div class="card-header">
              <div class="card-title">
                <h3>Request 정보 수신 대기중입니다.</h3>
              </div>
            </div>
            <div class="card-body">
              <div class="active">
                <!-- <div class="loader"></div> -->
                <div class="dimmer-content">

                  <div class="mb-md-7">
                    <h6>CURL</h6>
                    <p>
                      <code>curl -X POST {{socket_url}} -d "param1=value1&amp;param2=value2"</code>
                    </p>
                    <p>
                      <code>curl -X GET "{{socket_url}}?param1=value1&amp;param2=value2"</code>
                    </p>
                  </div>

                  <div class="mb-md-7">
                    <h6>PHP</h6>
                    <div style="background: rgba(0, 0, 0, 0.025); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 3px; padding: 3px; position: relative;">
                        <iframe src="about:blank" class="js_php" style="width: 100%; height: 531px; border: 0;"></iframe>
                    </div>
                  </div>

                  <div class="mb-md-7">
                    <h6>AJAX</h6>
                    <pre><code>$.ajax({
  data: {
    param1: 'value1',
    param2: 'value2'
  },
  type: 'POST',
  cache: false,
  url: '{{socket_url}}',
  success: function(data) {
    console.log(data)
  },
  error:function(request,status,error){
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  }
});</code></pre>
                </div>

                <div class="mb-md-7">
                  <h6>AXIOS</h6>
                  <pre><code>axios.get('{{socket_url}}?param1=value1&amp;param2=value2')
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});</code></pre>
                </div>

                </div>
              </div>
            </div>
          </div>

          <div class="js_rendering" style="display: none;">
            <div class="card my-md-2 js_log_card" v-for="(v, k) in logs">
              <div class="card-status card-status-left bg-blue"></div>
              <div class="card-header">
                <div class="card-title">
                  <h3>{{v.sender}}</h3>
                  <small class="text-muted" style="margin: -.75rem 0 0;">{{v.method}} :: {{v.date}}</small>
                </div>
                <div class="card-options">
                  <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
                  <a href="#" class="card-options-camera" data-toggle="card-camera"><i class="fe fe-camera"></i></a>
                  <a href="#" class="card-options-maximize" data-toggle="card-fullscreen"><i class="fe fe-maximize"></i></a>
                  <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
                </div>
              </div>
              <div class="card-body" v-html="v.data" style="overflow-x: scroll;"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import io from '~/plugins/socket.io.js'
export default {
  data() {
    return {
      channel: this.$route.params.channel,
      socket_url: '',
      logs: []
    }
  },
  mounted: function(e) {

  	$('.js_rendering').show()
    this.socket_url = location.protocol+'//'+location.host+'/log/'+this.channel;

    // php 소스
    var url = "https://carbon.now.sh/embed/?bg=rgba(171%2C%20184%2C%20195%2C%201)&t=seti&wt=none&l=text%2Fx-php&ds=true&dsyoff=20px&dsblur=68px&wc=true&wa=true&pv=48px&ph=32px&ln=false&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=1x&wm=false&code=%253C%253Fphp%250Afunction%2520post_curl_basic(%2524url%252C%2520%2524data%253Darray())%2520%257B%250A%250A%2509%2524ch%2520%253D%2520curl_init()%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_URL%252C%2520%2524url)%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_POST%252C%25201)%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_POSTFIELDS%252C%2520http_build_query(%2524data%252C%2520''%252C%2520'%2526'))%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_HTTPHEADER%252C%2520array('Content-Type%253A%2520application%252Fx-www-form-urlencoded'))%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLINFO_HEADER_OUT%252C%2520false)%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_HEADER%252C%2520false)%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_RETURNTRANSFER%252C%25201)%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_SSL_VERIFYPEER%252C%25201)%253B%250A%2509curl_setopt(%2524ch%252C%2520CURLOPT_TIMEOUT%252C%25203)%253B%250A%2509%2524res%2520%253D%2520curl_exec(%2524ch)%253B%250A%2509%2524hcode%2520%253D%2520curl_getinfo(%2524ch)%253B%250A%2509curl_close(%2524ch)%253B%250A%257D%250Apost_curl_basic('"+this.socket_url+"'%252C%2520%2524_REQUEST)%253B";
    $('.js_php').attr('src', url);
  },
  beforeMount()  {

    var su = this;

    // 소켓처리
    var LogSocket = io('//'+location.host, {query: { user: this.channel }})
    LogSocket.on('connect', function() {
      $('.js_connection').removeClass('bg-red').addClass('bg-green')
    })
    LogSocket.on('disconnect', function() {
      $('.js_connection').removeClass('bg-green').addClass('bg-red')
    })
    LogSocket.on('log', function(data) {
      var JData = JSON.parse(data)
      var RData = JSON.stringify(JData.data)
      var RTarget = document.createElement('div')
      var Rlog = []

      console.log(RData);
      $(RTarget).jsonView(RData)
      JData.data = $(RTarget).html()

      Rlog = su.logs
      Rlog.unshift(JData)
      su.logs = Rlog
    })

    // 스크린캡쳐
    $(document).on('click', '[data-toggle="card-camera"]', function(e) {
      html2canvas(this.closest('div.card')).then(canvas => {
          var saveName = 'z9n_'+su.channel+'_'+$(this).closest('div.card').find('.card-title > .text-muted').text()
          var url = canvas.toDataURL('image/png')
        var link = document.createElement('a')
        link.setAttribute('href', url)
        link.setAttribute('download', saveName+'.png')
        link.setAttribute('target', '_blank')
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      });
      e.preventDefault()
      return false
    });
  }
}
</script>
