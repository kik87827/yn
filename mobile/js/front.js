if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	layoutFunc();
});
window.addEventListener("load",() => {
});

function commonInit() {
	let touchstart = "ontouchstart" in window;
	let userAgent = navigator.userAgent.toLowerCase();
	let checkitem = [];
	if (touchstart) {
		browserAdd("touchmode");
	}
	if (userAgent.indexOf('samsung') > -1) {
		browserAdd("samsung");
	}

	if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
		browserAdd("window");
	}

	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		// iPad or iPhone
		browserAdd("ios");
	}

	window.onload = function() {}

	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}
}

function layoutFunc(){
	const floating_layer = document.querySelector(".floating_layer");
	const footer_wrap = document.querySelector(".footer_wrap");
	const footer_wrap_height = footer_wrap.getBoundingClientRect().height;
	window.addEventListener("scroll",()=>{
		floatLayerScroll();
	});
	window.addEventListener("touchmove",()=>{
		floatLayerScroll();
	});
    function floatLayerScroll(){
		// if(document.body.scrollHeight - Math.abs(window.scrollY) === document.body.clientHeight){
		// 	floating_layer.classList.remove("active");
		// }else{
		// 	floating_layer.classList.add("active");
		// }
		if(window.scrollY >= document.body.clientHeight - (window.innerHeight + footer_wrap_height/3)){
			floating_layer.classList.remove("active");
		}else{
			floating_layer.classList.add("active");
		}
		
	}
	// mobile total
    function mbTotal(){
        var btn_htotal = document.querySelector(".btn_hdtotal"),
            mobile_mainmenu_zone = document.querySelector(".mobile_mainmenu_zone"),
            mainmenu_dim = document.querySelector(".mainmenu_dim"),
            mbmenu_toggle_one = document.querySelectorAll(".mbmenu_toggle_one"),
            mbmenu_two = document.querySelectorAll(".mbmenu_two"),
            btn_mbmenuclose = document.querySelector(".btn_mbmenuclose"),
            domHtml = document.querySelector("html"),
            domBody = document.querySelector("body");
		
		const mbmenu_one = document.querySelectorAll(".mbmenu_one");


        // init 
        if(mobile_mainmenu_zone === null){return;}
        btn_htotal.addEventListener("click",function(e){
            e.preventDefault();
            totalOpen();
        },false);
        btn_mbmenuclose.addEventListener("click",function(e){
            e.preventDefault();
            totalClose();
        },false);
		mbmenu_toggle_one.forEach((element)=>{
			element.addEventListener("click",function(e){
				e.preventDefault();
				let thisEventObj = e.currentTarget;
				let thisNextObj = thisEventObj.nextElementSibling;
				thisEventObj.classList.toggle("active");
				thisNextObj.classList.toggle("active");
			},false);
		});
		mbmenu_two.forEach((element)=>{
			element.addEventListener("click",function(e){
				e.preventDefault();
				let thisEventObj = e.currentTarget;
				let thisNextObj = thisEventObj.nextElementSibling;
				thisEventObj.classList.toggle("active");
				thisNextObj.classList.toggle("active");
			},false);
		});
        mainmenu_dim.addEventListener("click",function(e){
            e.preventDefault();
            totalClose();
        },false);
        function totalOpen(){
            mobile_mainmenu_zone.classList.add("active")
            setTimeout(function(){
                mobile_mainmenu_zone.classList.add("motion");
                if(touchstart){
                    domBody.setAttribute("data-scr", window.pageYOffset);
                    domBody.style.marginTop = -window.pageYOffset + "px";
                    domHtml.classList.add("touchDis");
                }
            },30);
        }
        function totalClose(){
            mobile_mainmenu_zone.classList.remove("motion");
            setTimeout(function(){
                mobile_mainmenu_zone.classList.remove("active");
                domHtml.classList.remove("touchDis");
                domBody.style.marginTop = 0;
                window.scrollTo(0, parseInt(domBody.getAttribute("data-scr")));
            },500);
        }

		mbmenu_one.forEach((item)=>{
			const thisItem = item;
			const thisItemTwoWrap = thisItem.nextElementSibling;
			if(!!thisItemTwoWrap){
				thisItem.classList.add("has_two");
			}
			thisItem.addEventListener("click",(e)=>{
				e.preventDefault();
				thisItem.classList.toggle("active");
				thisItemTwoWrap.classList.toggle("active");
			});
		})
    }

    mbTotal();
}


function mainVisual(){
	let main_visual_obj = null;
	const mv_wrap = document.querySelector(".mv_wrap");
	const main_visual_container = document.querySelector(".mv_container");
	const swipercount = document.querySelector(".mv_wrap .swiper-count");
	const swiperlength = document.querySelector(".mv_wrap .swiper-length");
	const main_visual_slide = main_visual_container.querySelectorAll(".mv_container .swiper-slide");
	if(main_visual_slide.length>1){
		main_visual_obj = new Swiper(".mv_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
                nextEl: '.mv_wrap .btn_mv_control.next_control',
                prevEl: '.mv_wrap .btn_mv_control.prev_control',
            },
		});
	}else{
		mv_wrap.classList.add("nodata");
	}

	// heightControl();
	
	// window.addEventListener("resize",()=>{
	// 	heightControl();
	// });

	// function heightControl(){
	// 	let windowHeight = window.innerHeight;
	// 	let controlHeight = 0;
	// 	if(windowHeight<700){
	// 		controlHeight = 700;
	// 	}else{
	// 		controlHeight = windowHeight;
	// 	}
	// 	mv_wrap.style.height = controlHeight + "px";
	// }
}

function showPopup(target){
	const targetDom = document.querySelector(target);
	const targetDomDim = targetDom.querySelector(".dim");
	const targetCloseDom = targetDom.querySelector(".btn_modal_close");
	const targetTriggerDom = targetDom.querySelectorAll(".close_trigger");
	const htmlDom = document.querySelector("html");
	const bodyDom = document.querySelector("body");
	const htmlbodyMultiDom = [htmlDom,bodyDom];
	htmlbodyMultiDom.forEach((item)=>{
		item.classList.add("touch_disabled");
	});
	targetDom.classList.add("active");
	targetCloseDom.addEventListener("click",(e)=>{
		e.preventDefault();
		hidePopup(e.currentTarget.closest(".modal_zone"));
	});
	targetTriggerDom.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			hidePopup(e.currentTarget.closest(".modal_zone"));
		});
	});
	targetDomDim.addEventListener("click",(e)=>{
		hidePopup(e.currentTarget.closest(".modal_zone"));
	});
}

function hidePopup(target){
	const targetDom = target;
	const htmlDom = document.querySelector("html");
	const bodyDom = document.querySelector("body");
	const htmlbodyMultiDom = [htmlDom,bodyDom];
	targetDom.classList.remove("active");
	htmlbodyMultiDom.forEach((item)=>{
		item.classList.remove("touch_disabled");
	});
}


function segmentBox(target,callBtn){
	const targetDom = document.querySelector(target);
	const callBtnDom = document.querySelector(callBtn);
	const targetDomBtn = targetDom.querySelectorAll('.btn_segment_box');
	let activeDom = targetDom.querySelector('.btn_segment_box.active');
	targetDomBtn.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			if(activeDom && activeDom !== e.currentTarget){
				activeDom.classList.remove("active");
			}
			e.currentTarget.classList.add("active");
			activeDom = e.currentTarget;
			callBtnDom.textContent = e.currentTarget.textContent;
			//hidePopup(targetDom);
		})
	});
}


function mcProFunc01(){
	let data_container_slide = document.querySelectorAll(".mc_card_container .swiper-slide");
	let data_swiper_obj = null;
	if(data_swiper_obj !== null){
		data_swiper_obj.update();
	}else{
		if(data_container_slide.length>1){
			data_swiper_obj = new Swiper(".mc_card_container", {
				speed : 1000,
				pagination: {
					el: '.mc_card_container .mc-pagination',
				}
			});
		}
	}
}

