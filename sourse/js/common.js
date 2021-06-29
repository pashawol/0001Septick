let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = ".link-modal-js";
		$(link).fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
			// beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu as"); // (1)
			if (!container || link) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {
		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					//turn off old
					let oldActiveEl = element.closest(`.${tab}`).querySelector(`.${tab}__btn.active`);
					let oldActiveContent = tabs.Content[index].closest(`.${tab}`).querySelector(`.${tab}__content.active`);

					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active')

					//turn on new(cklicked el)
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99", { showMaskOnHover: false }).mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	checkEmptyVal() {
		this.value !== '' || this.tagName == "SELECT" && this.querySelector('option') != null && this.querySelector('option').value !== null && this.querySelector('option').text || this.type == "date"
			? $(this).addClass('not-empty')
			: $(this).removeClass('not-empty')
	},
	customRange() {
		function InputFormat() {
			// $('.input_from, .input_to').toFixed(2,0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '0')
		}
		InputFormat();
		function currencyFormat(num) {
			return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
		}

		// currencyFormat(num)
		$(".range-wrap").each(function () {
			let _this = $(this);
			var $range = _this.find(".slider-js");
			var $inputFrom = _this.find(".input_from");
			var $inputTo = _this.find(".input_to");
			var instance, from, to,
				min = $range.data('min'),
				max = $range.data('max');
			$range.ionRangeSlider({
				skin: "round",
				type: "double",
				grid: false,
				grid_snap: false,
				hide_min_max: true,
				hide_from_to: true,
				onStart: updateInputs,
				onChange: updateInputs,
				onFinish: updateInputs
			});
			instance = $range.data("ionRangeSlider");

			function updateInputs(data) {
				from = data.from;
				to = data.to;

				$inputFrom.prop("value", currencyFormat(from));
				$inputTo.prop("value", currencyFormat(to));
				// InputFormat();
			}

			$inputFrom.on("change input ", function () {
				var val = +($(this).prop("value").replace(/\s/g, ''));
				// validate
				if (val < min) {
					val = min;
				} else if (val > to) {
					val = to;
				}

				instance.update({
					from: val
				});
				$(this).prop("value", currencyFormat(val));
				console.log(val)
			});

			$inputTo.on("change input ", function () {
				var val = +($(this).prop("value").replace(/\s/g, ''));

				// validate
				if (val < from) {
					val = from;
				} else if (val > max) {
					val = max;
				}

				instance.update({
					to: val
				});
				$(this).prop("value", currencyFormat(val));
			});

		})
	},
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	// JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.customRange();

	$('.form-wrap__input').blur(JSCCommon.checkEmptyVal);
	$('.form-wrap__input').each(JSCCommon.checkEmptyVal);
	$('.form-wrap__input.select-custom--js').on('select2:select', JSCCommon.checkEmptyVal);

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	function makeDDGroup(qSelecorts) {
		for (let parentSelect of qSelecorts) {
			let parent = document.querySelector(parentSelect);
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.accardion__head--js');
				$(ChildHeads).click(function () {
					let clickedHead = this;
					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.accardion__content--js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.accardion__content--js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});
				});
			}
		}
	}
	makeDDGroup(['.sitebar', '.dd-price-js']);

	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	let sArticleSlider = new Swiper('.sArticle__slider--js', {
		freeModeMomentum: true,
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,

		navigation: {
			nextEl: '.sArticle .swiper-button-next',
			prevEl: '.sArticle .swiper-button-prev',
		},
	});

	let sertificateSlider = new Swiper('.sertificates__slider-js', {
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		breakpoints: {
			480: {
				slidesPerView: 2,
			},
			
			768: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 40,
			}
		}
	});

	var ourTeamSlider = new Swiper(".ourTeam__thumbs-slider--js", {
		loop: false,
		slidesPerView: 'auto',
		// freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	var ourTeamSlider2 = new Swiper(".ourTeam__main-slider--js", {
		loop: false,
		spaceBetween: 10,
		navigation: {
			nextEl: ".ourTeam__slider-wrap .swiper-button-next",
			prevEl: ".ourTeam__slider-wrap .swiper-button-prev",
		},
		thumbs: {
			swiper: ourTeamSlider,
		},
	});

	let worksSlider = new Swiper('.works-slider--js', {
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		effect: 'fade',
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			type: 'bullets',
		},
	});
	$('.swiper-pagination-hover').on('mouseover', '.swiper-pagination-bullet', function () {
		$(this).click();
	})

	$('.accordion-item__head').click(function () {
		$(this).next().slideToggle(function () {
			$(this).parent().toggleClass("active");
		})
	})

	$(".sQwiz__body .radio-block ").click(function(){
		if ($(this).find('input').is(':checked')) { 
			$(this).parents(".sQwiz__step").find(".sCalc__btn--next.d-none").removeClass("d-none")}
			
	})

	$(".sCalc__btn--next, .sQwiz__body .radio-block").click(function () {
		$(this).parents(".sQwiz__step").hide().removeClass('active').next().fadeIn(function () {
			$(this).addClass('active');
		})
	})
	$(".sCalc__btn--prev").click(function () {
		$(this).parents(".sQwiz__step").hide().removeClass('active').prev().fadeIn(function () {
			$(this).addClass('active');
		})
	})
	//luckyone js
	let prodCardThumb = new Swiper('.sProdCard-thumb-js', {
		slidesPerView: 'auto',
		direction: 'vertical',
		spaceBetween: 15,

		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
		},

	});
	let prodCardSlider = new Swiper('.sProdCard-slider-js', {
		spaceBetween: 30,
		slidesPerView: "auto",
		thumbs: {
			swiper: prodCardThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 3,
		},
		loop: true,
	});

	//
	let sDescrSlider = new Swiper('.sDescr-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});


	//end luckyone js


	$(".aside__head").click(function(){

		$(".toggle-menu").slideToggle();
	})
	
	$(".sCatalog__panel--toggle, .fillter-block__head").click(function(){

		$(".fillter-block").toggleClass('active')
		$("body").toggleClass('fixed')
	})
	$(".more-text--js  .link-more").click(function(e){
		e.preventDefault();
		$(this).parent().find("*:hidden").slideDown();
		$(this).hide();
	})
	$(".sCatalog__btn-head--more-js").click(function(e){
		e.preventDefault();
		$(this).parents('.row').find("*:hidden").fadeIn();
		$(this).parent().hide();
	})
	
		var Sticky = new hcSticky('.man-block', {
			stickTo: '.col-aside'
		});
	$(".aside__more").click(function(e){
		e.preventDefault();
		$(this).parent().find("*:hidden").fadeIn();
		$(this).hide();
		Sticky.update({});
	})
	$(".topLine__btn-search").click(function(){
		$(".topLine__search-wrap").slideToggle().find('input').focus()
	})
	$(".sForm__car-link").click(function(e){
		e.preventDefault();
		let th = $(this);
		$(this).addClass('active');
		setTimeout(() => {

			$.fancybox.open({
				src: th.attr("href"),
				type: 'inline',
			}); 
		}, 1000);

		setTimeout(() => { 
			$(this).removeClass('active');
			
		}, 6000);
		
	})



	var mouseX = 0;
	var mouseY = 0;
	var counter = 0;
	var mouseIsIn = true;
	function wireEvent() {
		window.addEventListener("mouseout",
			function (e) {
				mouseX = e.pageX;
				mouseY = e.pageY;
				if ((mouseY >= 0 && mouseY <= window.innerHeight)
					&& (mouseX >= 0 && mouseX <= window.innerWidth))
					return;
				//do something for mouse out
				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-stop',
					type: 'inline',
				});
			},
			false);
		// window.addEventListener("mouseover",
		// 	function (e) {
		// 		if (mouseIsIn)
		// 			return;
		// 		//do something for mouse over
		// 		counter++;
		// 		mouseIsIn = true;
		// 		document.getElementById('in_out').innerHTML = 'in' + counter;
		// 	},
		// 	false);
	}

	wireEvent();
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }