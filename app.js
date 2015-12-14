if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworkertest/sw.js', { scope: '/serviceworkertest/' }).then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};


getUpComingMovies = function(url){
   
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        var result = JSON.parse(request.response);
        var movieData = result.result.data;
        resolve(movieData);
      } else {
        reject(Error(' error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

window.onload = function(){
    
    var url ='http://staging.matrix.popkorn.in/v1/movielanding?tab=1&city_id=1&city_name=Delhi+NCR&lat=28.5664852&lng=77.31830479999999&page=1&limit=18&source=web&device=Mozilla&deviceId=b37817ce&rid=b37817ce&city_id=1&city_name=Delhi';
    getUpComingMovies(url).then(function(res){
        console.log(res.length);
        console.log(res);
        if(res !=='undefined')
        {
            var div = document.getElementById('movielist');
            
            res.forEach(function(ele, index){
                var mainDiv = document.createElement('div');
                mainDiv.style.float = 'left';
                mainDiv.style.paddingRight = '15px';
                mainDiv.style.paddingLight = '15px';
                mainDiv.style.outline = "medium none";
                var childDiv = document.createElement('div');
                var imgEelement = document.createElement('img');
                imgEelement.src = (ele.media.portraits[0].url!='' && typeof ele.media.portraits[0].url)?ele.media.portraits[0].url:ele.media.images[0].url;
                var childDiv2 = document.createElement('div');
                childDiv2.style.float = "left";
                //childDiv2.style.float= 'left';
                childDiv2.appendChild(imgEelement);
                var childDiv3 = document.createElement('div');
                childDiv3.style.float="left";
                var textdiv = document.createElement('div');
                textdiv.appendChild(document.createTextNode(ele.movie_name));
                childDiv3.appendChild(textdiv);
                
                mainDiv.appendChild(childDiv2);
                mainDiv.appendChild(childDiv3);
                //div.appendChild(childDiv2);
                //div.appendChild(childDiv3);
                div.appendChild(mainDiv);
 
                
                
                
            });
        }
        
    });
    
}


