# Request Viewer
## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## preview
### 로비
![1](https://user-images.githubusercontent.com/5427199/66421310-99c3d500-ea42-11e9-8896-8535fc739048.png)

### 데이터 전송
![2](https://user-images.githubusercontent.com/5427199/66421324-9deff280-ea42-11e9-8030-891fe50763f9.png)

### 결과확인
![3](https://user-images.githubusercontent.com/5427199/66421329-a0eae300-ea42-11e9-8025-37b9a060a632.png)


## 요청방법
### curl post
```bash
$ curl -X POST http://{HOST}:{PORT}/log/{CHANNEL} -d "param1=value1&param2=value2"
```

### curl get
```bash
$ curl -X GET "http://{HOST}:{PORT}/log/{CHANNEL}?param1=value1&param2=value2"
```

### jquery ajax
```javascript
$.ajax({
  data: {
    param1: 'value1',
    param2: 'value2'
  },
  type: 'POST',
  cache: false,
  url: 'http://{HOST}:{PORT}/log/{CHANNEL}',
  success: function(data) {
    console.log(data)
  },
  error:function(request,status,error){
    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
  }
});
```

### axios
```javascript
axios.get('http://{HOST}:{PORT}/log/{CHANNEL}?param1=value1&param2=value2')
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});
```

### php
```php
<?php
function post_curl_basic($url, $data=array()) {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data, '', '&'));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
    curl_setopt($ch, CURLINFO_HEADER_OUT, false);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    $res = curl_exec($ch);
    $hcode = curl_getinfo($ch);
    curl_close($ch);
}
post_curl_basic('http://{HOST}:{PORT}/log/{CHANNEL}', $_REQUEST);
```