// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
      //讓li的close button在被點擊時讓自己的parent的parent將自己的parent刪掉
      //簡單來說: ul > li > span(close button)，所以就是span叫ul把li刪掉
      //也就是將close button所屬的list刪掉
    this.parentElement.parentElement.removeChild(this.parentElement);
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  if ( $("#myInput").val() === '') {
    alert("You must write something!");
  } else {
  var li = document.createElement("li");
  //For animation of the new element
  li.style.height = "0px";
  li.style.padding = "0px 8px 0px 40px";
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
    let parent = document.getElementById("myUL");
  //將新增的li插入至原本的parent.childNotes[0]之前(即原本的第一個nodes之前)
  parent.insertBefore(li, parent.childNodes[0]);
  //如果是用appendChild()的則會插在最下面(即原本已存在之li的後面):
  //parent.appendChild(li); //<-This also works
  //Display the show animation
  //清空input的內容
  document.getElementById("myInput").value = "";

  //使用一些特別的tag時(例如<span>、<strong>、<h1>等)要另外append一個textnode
  //create一個紀錄時間的element
  var noteDateAndTime = document.createElement("span");
  noteDateAndTime.className = "note-dateAndTime";
  //得到dateAndTime string並存入span
  noteDateAndTime.innerHTML = "<pre>" + getCurrentDateAndTime() + "</pre>";
  li.appendChild(noteDateAndTime);

  //create一個x按鈕
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");  // "\u00D7"是打叉符號的unicode
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function() {
      //讓li的close button在被點擊時讓自己的parent的parent將自己的parent刪掉
      //簡單來說: ul > li > span(close button)，所以就是span叫ul把li刪掉
      //也就是將close button所屬的list刪掉
      this.parentElement.parentElement.removeChild(this.parentElement);

    }
    $('li').first().animate({height: "48px", padding: "12px 8px 12px 40px"}, 200);
    $('li').first().animate({backgroundColor: "black"}, 2000);
  }
  //展開動畫
}

//讓在input輸入時按Enter相當於按了"Add"按鈕
function isEnterPressed(event){
  if (event.keyCode == 13) {  //The keycode of 'Enter' is 13
    //You can visit this website to get all of the corresponding keycodes of the keys
    //http://keycode.info/
    newElement();
  }
}

function getCurrentDateAndTime(){
  var dateObj = new Date();

  //取得目前的年、月、日、時、分、秒
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1; //I don't konw why this need to add 1 XD
  var day = dateObj.getDate();
  var hr = dateObj.getHours();
  var min = dateObj.getMinutes();
  var sec = dateObj.getSeconds();

  var dateAndTime = "Added at: " + "<b>" + year + "/"+ month + "/" + day + "</b>  " 
  + add0(hr) + ":" + add0(min) + ":" + add0(sec);
  function add0(num){
    return (num >= 10)? num : ("0" + num) ;
  }
  return dateAndTime;
}