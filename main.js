/* =====================================================
   구름고등학교 홈페이지
   main.js v2.0
===================================================== */


/* =====================================================
   메인 이미지 슬라이드
===================================================== */

const images = [
    "images/main.jpg",
    "images/main2.jpg",
    "images/main3.jpg"
];

let current = 0;

const mainVisual = document.getElementById("mainVisual");

function changeSlide(){

    current++;

    if(current >= images.length){

        current = 0;

    }

    mainVisual.style.opacity = 0;

    setTimeout(()=>{

        mainVisual.src = images[current];

        mainVisual.style.opacity = 1;

    },400);

}

setInterval(changeSlide,5000);


/* =====================================================
   시간대 인사말
===================================================== */

const greeting = document.querySelector(".visualText p");

function updateGreeting(){

    const hour = new Date().getHours();

    if(hour < 6){

        greeting.innerHTML = "새벽에도 빛나는 구름고등학교";

    }

    else if(hour < 12){

        greeting.innerHTML = "좋은 아침입니다.";

    }

    else if(hour < 18){

        greeting.innerHTML = "오늘도 즐거운 학교생활 되세요.";

    }

    else{

        greeting.innerHTML = "편안한 저녁 보내세요.";

    }

}

updateGreeting();


/* =====================================================
   오늘의 급식
===================================================== */

const meal = {

    breakfast:[
        "백미밥",
        "콩나물국",
        "스크램블에그",
        "배추김치",
        "우유"
    ],

    lunch:[
        "찰보리밥",
        "육개장",
        "돈까스",
        "양배추샐러드",
        "깍두기",
        "요구르트"
    ],

    dinner:[
        "김치볶음밥",
        "유부장국",
        "치킨너겟",
        "단무지",
        "사과주스"
    ]

};

const mealBox = document.getElementById("todayMeal");

mealBox.innerHTML = `

<div class="mealCard">

<h3>🌅 조식</h3>

<p>${meal.breakfast.join("<br>")}</p>

</div>

<div class="mealCard">

<h3>☀️ 중식</h3>

<p>${meal.lunch.join("<br>")}</p>

</div>

<div class="mealCard">

<h3>🌙 석식</h3>

<p>${meal.dinner.join("<br>")}</p>

</div>

`;

/* =====================================================
   달력 생성
===================================================== */

const calendar = document.getElementById("calendar");

const schedule = {

    2:"1학기 기말고사",

    10:"교내 체육대회",

    18:"여름방학식",

    25:"학생회 선거"

};

function createCalendar(){

    const today = new Date();

    const year = today.getFullYear();

    const month = today.getMonth();

    const date = today.getDate();

    const firstDay = new Date(year,month,1);

    const lastDay = new Date(year,month+1,0);

    let html = "";

    html += `<h3 style="margin-bottom:15px;">${year}년 ${month+1}월</h3>`;

    html += "<table>";

    html += `
    <tr>
        <th>일</th>
        <th>월</th>
        <th>화</th>
        <th>수</th>
        <th>목</th>
        <th>금</th>
        <th>토</th>
    </tr>
    `;

    let day = 1;

    for(let row=0; row<6; row++){

        html += "<tr>";

        for(let col=0; col<7; col++){

            if(row===0 && col<firstDay.getDay()){

                html += "<td></td>";

            }

            else if(day>lastDay.getDate()){

                html += "<td></td>";

            }

            else{

                let className="";

                if(day===date){

                    className+=" today";

                }

                if(schedule[day]){

                    className+=" event";

                }

                html += `<td class="${className}" data-day="${day}">${day}</td>`;

                day++;

            }

        }

        html+="</tr>";

    }

    html+="</table>";

    html+=`<div class="scheduleBox"></div>`;

    calendar.innerHTML=html;

}

createCalendar();



/* =====================================================
   일정 표시
===================================================== */

document.addEventListener("click",function(e){

    if(e.target.dataset.day){

        const day=e.target.dataset.day;

        const box=document.querySelector(".scheduleBox");

        if(schedule[day]){

            box.innerHTML=`
            <div style="
                margin-top:18px;
                background:#f5f7fb;
                padding:14px;
                border-radius:10px;
                border-left:5px solid #424963;
            ">

                <strong>${day}일</strong>

                <p style="margin-top:8px;">
                    ${schedule[day]}
                </p>

            </div>
            `;

        }

        else{

            box.innerHTML=`
            <p style="margin-top:15px;color:#888;">
                등록된 일정이 없습니다.
            </p>
            `;

        }

    }

});


/* =====================================================
   스크롤 애니메이션
===================================================== */

const cards=document.querySelectorAll(".card");

function reveal(){

    cards.forEach(card=>{

        const top=card.getBoundingClientRect().top;

        if(top<window.innerHeight-120){

            card.style.opacity=1;

            card.style.transform="translateY(0)";

        }

    });

}

cards.forEach(card=>{

    card.style.opacity=0;

    card.style.transform="translateY(30px)";

    card.style.transition=".6s";

});

window.addEventListener("scroll",reveal);

reveal();



/* =====================================================
   헤더 축소
===================================================== */

window.addEventListener("scroll",()=>{

    const header=document.querySelector(".header");

    if(window.scrollY>80){

        header.style.boxShadow="0 10px 30px rgba(0,0,0,.12)";

        header.style.transform="scaleY(.97)";

    }

    else{

        header.style.boxShadow="0 5px 20px rgba(0,0,0,.05)";

        header.style.transform="scaleY(1)";

    }

});

/* =====================================================
   팝업존
===================================================== */

const popupImages=[

    "images/popup1.jpg",

    "images/popup2.jpg",

    "images/popup3.jpg"

];

let popupIndex=0;

const popup=document.getElementById("popupImage");

function popupSlide(){

    popupIndex++;

    if(popupIndex>=popupImages.length){

        popupIndex=0;

    }

    popup.src=popupImages[popupIndex];

}

setInterval(popupSlide,4000);

document.getElementById("nextPopup").onclick=()=>{

    popupSlide();

}

document.getElementById("prevPopup").onclick=()=>{

    popupIndex--;

    if(popupIndex<0){

        popupIndex=popupImages.length-1;

    }

    popup.src=popupImages[popupIndex];

}