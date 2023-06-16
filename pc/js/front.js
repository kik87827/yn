if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	commonInit();
	layoutFunc();
});
window.addEventListener("load",() => {
	headerPc();
});
$(window).on("load",function(){
	posLayerEvent();
	commonResize();
});

function commonResize(){
	var $window_width = 0;
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
		posLayerResize();
	}).resize();
}


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

	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}
}


function layoutFunc(){
	function btnTop(){
		let btn_gotop = document.querySelector(".btn_pagetop");
		if(btn_gotop ===null){return;}
		btn_gotop.addEventListener("click",(e)=>{
			e.preventDefault();
			window.scrollTo(0,0);
		});
	}
	btnTop();
}


function headerPc(){
	const head_two_bg = document.querySelector(".head_two_bg");
	const header_zone = document.querySelector(".header_zone");
	const gnb_one_menu = document.querySelectorAll(".gnb_one_menu");
	//const total_menu = document.querySelector(".total_menu");
	const two_menu_list_wrap = document.querySelectorAll(".two_menu_list_wrap");
	let twoArray = [];
	let maxHeight = 0;
	two_menu_list_wrap.forEach((item)=>{
		twoArray.push(item.getBoundingClientRect().height);
	});
	maxHeight = Math.max.apply(null,twoArray);
	head_two_bg.style.height = maxHeight + "px";

	header_zone.classList.add("ready");

	gnb_one_menu.forEach((item)=>{
		item.addEventListener("mouseenter",()=>{
			menuOpen();
		});
	});
	header_zone.addEventListener("mouseleave",()=>{
		menuClose();
	});
	// total_menu.addEventListener("click",()=>{
	// 	header_zone.classList.toggle("active");
	// });

	function menuOpen(){
		header_zone.classList.add("active");
	}

	function menuClose(){
		header_zone.classList.remove("active");
	}
}





function mainVisual(){
	let mv_obj = null;
	const mv_wrap = document.querySelector(".mv_wrap");
	const mv_slide = mv_wrap.querySelectorAll(".swiper-slide");

	

	heightControl();

	if(mv_slide.length>1){
		mv_obj = new Swiper(".mv_container", {
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
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
	}else{
		mv_wrap.classList.add("nodata_type");
	}
	
	
	window.addEventListener("resize",()=>{
		heightControl();
	});

	function heightControl(){
		let windowHeight = window.innerHeight;
		let controlHeight = 0;
		// if(url_2 === "case02"){
		// 	mv_wrap.style.height = "635px";
		// 	return;
		// }

		if(windowHeight<635){
			controlHeight = 635;
		}else{
			controlHeight = windowHeight;
		}
		mv_wrap.style.height = controlHeight + "px";
	}
}



function posLayerEvent(){
	var posCallBtn = $("[data-poslayer]");
	var poslayer_z = $(".poslayer_z");
	
	$("body").append(poslayer_z);

	
	
	posCallBtn.on("click",function(e){
		var $this = $(this),
			$t_t = $($this.attr("data-poslayer"));
		e.preventDefault();
		posLayerShow($t_t,$this);
	});
	poslayer_z.on("click",".layerclose",function(e){
		e.preventDefault();
		posLayerHide($(this).parents(".poslayer_z"));
	});

	$(document).on("click",".btn_psubmit",function(e){
		e.preventDefault();
		let thisParent = $(this).parents(".poslayer_z");
		let targetCols = $(`[data-poslayer='#${thisParent.attr("id")}']`);
		let activeDate = thisParent.attr("data-date");
		let activeText = thisParent.find(".pclayer_vlist > li.active").text();
		if(thisParent.attr("data-date") !== undefined){
			targetCols.find(".mv_form_text").html(activeDate);
			targetCols.addClass("result_mode");
		}else{
			targetCols.find(".mv_form_text").html(activeText);
			targetCols.addClass("result_mode");
		}
		posLayerHide(thisParent);
	});

	$(document).on("click",".pcv_chk",function(e){
		e.preventDefault();
		$(this).parents("li").siblings().removeClass("active");
		$(this).parents("li").addClass("active");
	});

	$(document).on("click",function(e){
		if (!$(e.target).parents("[data-poslayer] , .poslayer_z , .layer_in_control").length && !$(e.target).is("[data-poslayer]") && !$(e.target).is(".layer_in_control")){
			posLayerHide($(".poslayer_z.active"));
		}
	});
}

function posLayerShow(target,btn){
	var poslayer_z = $(".poslayer_z");
	var target = $(target);
	
	$("body").append(target);
	poslayer_z.removeClass("active");
	target.addClass("active");
	posLayerPos(target,btn);
}

function posLayerResize(){
	var poslayer_z = $(".poslayer_z");
	if (poslayer_z.length){
		poslayer_z.each(function(){
			posLayerResizeAction($(this));
		});
	}
}

function posLayerPos(target,btn){
	var $target = $(target);
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $(btn);
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	if ($targetWid + $btnPosLeft > $(window).width()){
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": "auto",
			"right" : 20
		});
	}else{
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": $btnPosLeft
		});
	}
}

function posLayerResizeAction(target){
	var $target = $(target);
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $("[data-poslayer='#" + $target.attr("id") +"']");
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	if ($targetWid + $btnPosLeft > $(window).width()) {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": "auto",
			"right": 20
		});
	} else {
		$target.css({
			"top": $btnPosTop + $btnPosHeight + 20,
			"left": $btnPosLeft
		});
	}
}

function posLayerHide(target){
	var target = $(target) || target;
	target.removeClass("active");
}


var mc_swiper_obj = null;
function mc_swiper_func(){
	const recommend_vitem = document.querySelector(".recommend_vitem");
	const mc_multi_swiper = recommend_vitem.querySelector(".mc_multi_swiper");
	const mc_multi_slide = mc_multi_swiper.querySelectorAll(".swiper-slide");
	// let slide_width_array = [];
	// console.log(mc_multi_slide.length);
	// if(mc_multi_slide.length>1){
	// 	mc_multi_slide.forEach((item) => {
	// 		slide_width_array.push(item.getBoundingClientRect().height);
	// 		item.style.height = Math.max.apply(null,slide_width_array) + "px";
	// 	});
	// }
	if(mc_multi_slide.length>3){
		mc_swiper_obj = new Swiper('.recommend_vitem .mc_multi_swiper', { 
			speed : 1000, 
			slidesPerView: 3, 
			slidesPerGroup: 3, 
			loop : true, 
			pagination: {  
				el: ".recommend_vitem .mc_paging",
				clickable: true
			}
		})
	}else{
		mc_multi_swiper.classList.add("nodata_type");
	}
}

var mc_swiper2_obj = null;
function mc_swiper2_func(){
	const banner_vitem = document.querySelector(".banner_vitem");
	const mc_multi_swiper2 = banner_vitem.querySelector(".mc_multi_swiper2");
	const mc_multi_slide = mc_multi_swiper2.querySelectorAll(".swiper-slide");
	if(mc_multi_slide.length>3){
		mc_swiper2_obj = new Swiper('.banner_vitem .mc_multi_swiper2', { 
			speed : 1000, 
			slidesPerView: 4, 
			slidesPerGroup: 4, 
			loop : true, 
			pagination: {  
				el: ".banner_vitem .mc_paging",
				clickable: true
			}
		})
	}else{
		mc_multi_swiper2.classList.add("nodata_type");
	}
}


function mcTabFunc(){
	const mc_ctab = document.querySelectorAll(".mc_ctab");
	const mc_tabcont = document.querySelectorAll(".mc_tabcont_group .mc_tabcont");
	let mc_ctab_active = Array.from(mc_ctab).filter(item => item.classList.contains("active"))[0];
	let mc_tabcont_active = Array.from(mc_tabcont).filter(item => item.classList.contains("active"))[0];
	mc_ctab.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			const targetItem = e.currentTarget;
			const targetItemDom = document.querySelector(targetItem.getAttribute("href"));
			if(mc_ctab_active){
				mc_ctab_active.classList.remove("active");
			}
			if(mc_tabcont_active){
				mc_tabcont_active.classList.remove("active");
			}
			if(!!targetItemDom){
				targetItemDom.classList.add("active");
				mc_tabcont_active = targetItemDom;
			}
			targetItem.classList.add("active");
			mc_ctab_active = targetItem;
		});
	});
}