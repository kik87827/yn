if( window.console == undefined ){ console = { log : function(){} }; }

/** browser checker **/
let touchstart = "ontouchstart" in window;
let userAgent=navigator.userAgent.toLowerCase();
document.addEventListener("DOMContentLoaded",() => {
	commonInit();
	commonResize();
	layoutFunc();
});
window.addEventListener("load",() => {
	headerGnb();
});

function subMinHeight(){
	var sub_middle = document.querySelector(".sub_middle");
	var sub_middle_pos = sub_middle !== null ? sub_middle.getBoundingClientRect().top : 0;
	var footer_zone = document.querySelector(".footer_zone");
	var footer_zone_height = footer_zone !== null ? footer_zone.offsetHeight : 0;
	if(sub_middle !== null){
		sub_middle.style.minHeight = `calc(100vh - ${sub_middle_pos + footer_zone_height}px)`
	}
}

function commonResize(){
	var $window_width = 0;
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
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





function mainVisual(){
	let main_visual_obj = null;
	const main_visual_container = document.querySelector(".mv_container");
	const mv_zone = document.querySelector(".mv_zone");
	const main_visual_slide = main_visual_container.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;
	if(main_visual_slide.length>1){
		main_visual_obj = new Swiper(".mv_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.btn_mv_control.next_control',
                prevEl: '.btn_mv_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.stop();
		},false);
	}else{
		mv_zone.classList.add("nodata_type");
	}
}

function mainVisualBanner(){
	let mvbanner_obj = null;
	const mvlayer_parent = document.querySelector(".mvlayer_parent");
	const mvbanner_container = document.querySelector(".mv_banner_container");
	const mvbanner_slide = mvbanner_container.querySelectorAll(".swiper-slide");
	if(mvbanner_slide.length>1){
		mvbanner_obj = new Swiper(".mv_banner_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.mv_banner_paging",
			}
		});
	}else{
		mvlayer_parent.classList.add("nodata_type");
	}
}

function subVisual(){
	let sub_visual_obj = null;
	const sub_visual_container = document.querySelector(".sv_container");
	const sv_zone = document.querySelector(".sv_zone");
	const sub_visual_slide = sub_visual_container.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;
	if(sub_visual_slide.length>1){
		sub_visual_obj = new Swiper(".sv_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.sub_visual_paging",
			},
            navigation: {
                nextEl: '.sv_wrap .btn_mv_control.next_control',
                prevEl: '.sv_wrap .btn_mv_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			main_visual_obj.autoplay.stop();
		},false);
	}else{
		sv_zone.classList.add("nodata_type");
	}
}

function specialBanner(){
	let mcswiper_obj = null;
	const mc_swiper_list = document.querySelector(".mc_swiper_list");
	const mc_swiper_list_slide = mc_swiper_list.querySelectorAll(".swiper-slide");
	if(mc_swiper_list_slide.length>1){
		mcswiper_obj = new Swiper(".mc_swiper_list", {
			speed : 1000,
			loop : true,
			slidesPerView: 3, 
			slidesPerGroup: 1, 
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.mc_paging",
			}
		});
	}else{
		mc_swiper_list.classList.add("nodata_type");
	}
}

function thisMonthBanner(){
	let primary_swiper_obj = null;
	const primary_swiper_list = document.querySelector(".primary_swiper_list");
	const primary_swiper_list_slide = primary_swiper_list.querySelectorAll(".swiper-slide");
	if(primary_swiper_list_slide.length>1){
		primary_swiper_obj = new Swiper(".primary_swiper_list", {
			speed : 1000,
			loop : true,
			slidesPerView: 3, 
			slidesPerGroup: 1, 
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			navigation: {
                nextEl: '.primary_content_wrap .btn_primary_control.next_control',
                prevEl: '.primary_content_wrap .btn_primary_control.prev_control',
            },
			pagination: {
				clickable: true,
				el: ".swiper-pagination.primary_paging",
			}
		});
	}else{
		primary_swiper_list.classList.add("nodata_type");
	}
}

function quickMenu(){
	const mc_wrap = document.querySelector(".mc_wrap");
	const btn_quick_allow = document.querySelector(".btn_quick_allow");
	const quick_item_zone = document.querySelector(".quick_item_zone");
	const quick_item_cont = document.querySelector(".quick_item_cont");
	let mc_wrap_pos = mc_wrap !== null ? mc_wrap.getBoundingClientRect().top + window.scrollY - 130 : 0;
	window.addEventListener("scroll",(e)=>{
		if(window.scrollY > mc_wrap_pos){
			quick_item_zone.classList.add("fixed");
		}else{
			quick_item_zone.classList.remove("fixed");
		}
	});
	btn_quick_allow.addEventListener("click",(e)=>{
		e.preventDefault();
		
		quick_item_cont.classList.toggle("fold");
		e.currentTarget.classList.toggle("fold");
	});
}

function listToggleOption(){
	const d_list_option = document.querySelectorAll(".d_list_option");
	const d_fold_option = document.querySelectorAll(".d_fold_option");
	d_list_option.forEach((element) => {
		element.addEventListener("click", (e) => {
			e.preventDefault();
			let thisObj = e.currentTarget;
			let thisObjParent = thisObj.closest(".board_thumnail_list > li");
			let thisObjTarget = thisObjParent.querySelector(".list_option_zone");
			thisObj.classList.toggle("type2");
			thisObjTarget.classList.toggle("active");
		}, false);
	});
	d_fold_option.forEach((element) => {
		element.addEventListener("click", (e) => {
			e.preventDefault();
			let thisObj = e.currentTarget;
			let thisObjParent = thisObj.closest(".board_thumnail_list > li");
			let thisObjTarget = thisObjParent.querySelector(".list_option_zone");
			let thisObjCall = thisObjParent.querySelector(".d_list_option");
			thisObjCall.classList.remove("type2");
			thisObjTarget.classList.remove("active");
		}, false);
	});
}

function stickyBox(){
	const html_dom = document.querySelector("html");
	const body_dom = document.querySelector("body");
	const header_dom = document.querySelector(".header_zone");
	const footer_dom = document.querySelector(".footer_zone");
	let header_dom_height = header_dom !== null ? header_dom.getBoundingClientRect().height : 0;
	let footer_dom_height = footer_dom !== null ? footer_dom.getBoundingClientRect().height : 0;
	const pay_box_item = document.querySelector(".pay_control_box_wrap");
	let pay_pos = pay_box_item !== null ? pay_box_item.getBoundingClientRect().top + window.scrollY : 0;
	console.log()
	window.addEventListener("scroll",(e)=>{
		header_dom_height = header_dom !== null ? header_dom.getBoundingClientRect().height : 0;
		footer_dom_height = footer_dom !== null ? footer_dom.getBoundingClientRect().height : 0;
		if(window.scrollY > pay_pos){
			pay_box_item.style.top = header_dom_height +'px';
			pay_box_item.classList.add("fixed");
		}else{
			pay_box_item.style.top = '0px';
			pay_box_item.classList.remove("fixed");
		}
	});
}


function detailMainSwiper(){
	let data_container_slide = document.querySelectorAll(".detail_photo_container .swiper-slide");
	let data_swiper_obj = null;
	if(data_swiper_obj !== null){
		data_swiper_obj.update();
	}else{
		if(data_container_slide.length>1){
			data_swiper_obj = new Swiper(".detail_photo_container", {
				speed : 1000,
				navigation: {
					nextEl: '.btn_detail_control.next_control',
					prevEl: '.btn_detail_control.prev_control',
				},
				pagination: {
					el: '.detail_photo_paging.swiper-pagination',
				}
			});
		}
	}
}

function tabDetailFunc(){
	const has_tabguide = document.querySelector(".has_tabguide");
	const getdata_hortab = has_tabguide.querySelectorAll(".getdata_hortab");
	const getdata_tabcont = has_tabguide.querySelectorAll(".getdata_tabcont");
	let hortab_active = Array.from(getdata_hortab).filter(item => item.classList.contains("active"))[0];
	let tabcont_active = Array.from(getdata_tabcont).filter(item => item.classList.contains("active"))[0];
	
	getdata_hortab.forEach(item => {
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			const targetItem = e.currentTarget;
			const targetItemDom = has_tabguide.querySelector(targetItem.getAttribute("href"));
			if(hortab_active){
				hortab_active.classList.remove("active");
			}
			if(tabcont_active){
				tabcont_active.classList.remove("active");
			}
			if(!!targetItemDom){
				targetItemDom.classList.add("active");
				tabcont_active = targetItemDom;
			}
			targetItem.classList.add("active");
			hortab_active = targetItem;
		});
	});
}


function toggleDetailBox(option){
	const btn_toggle_control = document.querySelectorAll(".btn_toggle_control");
	btn_toggle_control.forEach((item)=>{

		item.addEventListener("click",(e)=>{
			e.preventDefault();
			const targetItem = e.currentTarget;
			const targetItemText = targetItem.querySelector(".toggle_target_text");
			const parentBox = targetItem.closest(".toggle_detail_box");
			const toggleContent = parentBox.querySelector(".toggle_detail_content_row");
			
			targetItem.classList.toggle("fold");
			toggleContent.classList.toggle("hidden");
			if(toggleContent.classList.contains("hidden")){
				targetItemText.textContent = option.openText;
			}else{
				targetItemText.textContent = option.closeText;
			}
		});
	});
}

function headerGnb(){
	const head_two_bg = document.querySelector(".head_two_bg");
	const head_gnb_row = document.querySelector(".head_gnb_row");
	const head_gnb_item = document.querySelectorAll(".head_gnb_item");
	const btn_headtotal_menu = document.querySelector(".btn_headtotal_menu");
	const twognb_item_list_wrap = document.querySelectorAll(".twognb_item_list_wrap");
	let twoArray = [];
	let maxHeight = 0;
	twognb_item_list_wrap.forEach((item)=>{
		twoArray.push(item.getBoundingClientRect().height);
	});
	maxHeight = Math.max.apply(null,twoArray);
	head_two_bg.style.height = maxHeight + "px";

	head_gnb_row.classList.add("ready");

	head_gnb_item.forEach((item)=>{
		item.addEventListener("mouseenter",()=>{
			menuOpen();
		});
	});
	head_gnb_row.addEventListener("mouseleave",()=>{
		menuClose();
	});
	btn_headtotal_menu.addEventListener("click",()=>{
		head_gnb_row.classList.toggle("active");
	});

	function menuOpen(){
		head_gnb_row.classList.add("active");
	}

	function menuClose(){
		head_gnb_row.classList.remove("active");
	}
}


function detailBannerSwiper(){
	const detail_banner_fxcont = document.querySelectorAll(".detail_banner_fxcont");
	detail_banner_fxcont.forEach((item,index)=>{
		const slider_parent = item;
		const slider_container = slider_parent.querySelector(".detail_banner_fxswiper");
		const slider_slide = slider_container.querySelectorAll(".swiper-slide");
		slider_parent.setAttribute("id","swiperParent0"+(index+1));
		slider_container.setAttribute("id","swiper0"+(index+1));
		console.log(slider_slide);
		if(slider_slide.length){
			(new Function(
			`
				${slider_container.getAttribute("id")} = new Swiper("#${slider_container.getAttribute("id")}", {
					loop: true,
					speed : 800,
					pagination : {
						el: "#${slider_parent.getAttribute("id")} .swiper-pagination",
						clickable : true
					}
				});
			`
			)());
		}
	})
}

function dataCaseDesign(){
	const mc_thumbanner_list = document.querySelectorAll(".mc_thumbanner_list");
	mc_thumbanner_list.forEach((item)=>{
		const thisList = item;
		const thisListChildren = Array.from(thisList.children);
		thisList.classList.add("length"+thisListChildren.length);
	});
}