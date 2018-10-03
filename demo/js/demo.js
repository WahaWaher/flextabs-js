$(document).ready(function() {

	$.fn.flexTabs.defaults = {
		// transformFade: 1000
	};

	$('.custom-tabs').flexTabs({
		// breakpoint: 768,
		// listIcon: false,
		transformFade: 250,
		beforeChange: function(sets, curItem, nextItem) {

			/* Анимация: исправл. для обратной анимации, моб. */
			if( sets.curMode == 'mobile' ) {
				nextItem.content.css({
					display: 'block'
				});
			}

		},
		afterChange: function(sets, curItem) {
			
			/* Анимация. Десктоп. Появление вкладок */
			if( sets.curMode == 'desktop' ) {
				curItem.content.hide().fadeIn(250);
			}

			/* Анимация. Мобильные. Появление вкладок */
			if( sets.curMode == 'mobile' && curItem.content.hasClass('active') ) {
				curItem.content.hide().slideDown(350);
			}

			/* Анимация. Мобильные. Исчезновение вкладок */
			if( sets.curMode == 'mobile' && !curItem.content.hasClass('active') ) {
				curItem.content.slideUp(350);
			}

		},
		onChangeMode: function(sets) {
			console.log( 'Смена режима: ', sets );
		}
	});

	// Переход на вкладку (число или id(href) вкладки)
	// $('.custom-tabs').eq(0).flexTabs('go', 3);

	// Закрыть все вкладки
	// $('.custom-tabs').eq(0).flexTabs('closeAll');

	// Init
	$('.init').on('click', function() {
		$('.custom-tabs').eq(0).flexTabs('init');
	});

	// Destroy
	$('.destroy').on('click', function() {
		$('.custom-tabs').eq(0).flexTabs('destroy');
	});

	// Reinit
	$('.reinit').on('click', function() {
		$('.custom-tabs').eq(0).flexTabs('reinit');
	});

});