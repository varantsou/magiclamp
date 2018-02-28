$(document).ready(function() {
	//FORMS
	function forms(){
		$('input,textarea').focus(function(){
			if($(this).val() == $(this).attr('data-value')){
					$(this).addClass('focus');
					$(this).parent().addClass('focus');
					$(this).removeClass('err');
					$(this).parent().removeClass('err');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				$(this).val('');
			};
		});
		$('input[data-value], textarea[data-value]').each(function() {
			if (this.value == '' || this.value == $(this).attr('data-value')) {
				this.value = $(this).attr('data-value');
			}
			$(this).click(function() {
				if (this.value == $(this).attr('data-value')) {
					if($(this).attr('data-type')=='pass'){
						$(this).attr('type','password');
					};
					this.value = '';
				};
			});
			$(this).blur(function() {
				if (this.value == '') {
					this.value = $(this).attr('data-value');
						$(this).removeClass('focus');
						$(this).parent().removeClass('focus');
					if($(this).attr('data-type')=='pass'){
						$(this).attr('type','text');
					};
				};
			});
		});
		//MASKS//
		//'+7(999) 999 9999'
		//'+375(99)999-99-99'
		//'a{3,1000}' только буквы минимум 3
		//'9{3,1000}' только цифры минимум 3

		$.each($('input.phone'), function(index, val) {
			$(this).focus(function(){
				$(this).inputmask('+375(99)-999-99-99',{clearIncomplete: true,clearMaskOnLostFocus: true,
					"onincomplete": function(){maskclear($(this));}
				});
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
				$(this).parent().removeClass('err');
				$(this).removeClass('err');
			});
		});
		$('input.phone').focusout(function(event) {
			maskclear($(this));
		});
		//SELECT
		if($('select').length>0){
			$.each($('select'), function(index, val) {
				$(this).hide();
				$(this).wrap("<div class='select-block "+$(this).attr('class')+"-select-block'></div>");
					var milti='';
					var check='';
					var sblock=$(this).parent('.select-block');
					var soptions="<div class='select-options'><div class='select-options-inside'>";
				if($(this).attr('multiple')=='multiple'){
					milti='multiple';
					check='check';
				}
				$.each($(this).find('option'), function(index, val) {
					if($(this).attr('value')!=''){
						soptions=soptions+"<div data-value='"+$(this).attr('value')+"' class='select-options__value "+$(this).attr('class')+" "+check+"'>"+$(this).html()+"</div>";
					}
				});
					soptions=soptions+"</div></div>";
				sblock.append("<div class='select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
										"<div class='select-title'>"+
											"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
											"<div class='select-title__value'>"+$(this).find('option[selected="selected"]').html()+"</div>"+
										"</div>"+
										soptions+
									"</div>");
			});
				$(".select-options-inside").niceScroll();
			$('body').on('click','.select',function() {
				if(!$(this).hasClass('disabled')){
					$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
					$(this).toggleClass('active');
					$(this).find('.select-options').slideToggle(50,function() {
						$(".select-options-inside scroll").getNiceScroll().resize();
					});
				}
			});
			$('body').on('click','.select-options__value',function() {
				if(!$(this).parents('.select').hasClass('multiple')){
					$(this).parents('.select').find('.select-title__value').html($(this).html());
				}else{

					/*
					if($(this).hasClass('active')){
						if($('.filter-values__item input[value="'+$(this).data('value')+'"]').length==0){
							$('.filter-values').append('<div class="filter-values__item ion-ios-close-empty"><span>'+$(this).html()+'</span><input value="'+$(this).data('value')+'" type="hidden" name="form[filter]['+$(this).parents('.select-block').find('select').attr('name')+']" /></div>');
						}
					}else{
						$('.filter-values__item input[value="'+$(this).data('value')+'"]').parent().remove();
					}
					return false;
					*/


						var vals=[];
					$.each($(this).parents('.select').find('.select-options__value.active'), function(index, val) {
						vals[index]=$(this).data('value');
					});
						$(this).parents('.select-block').find('select').val(vals);
					return false;
				}
				if($.trim($(this).data('value'))!=''){
					$(this).parents('.select-block').find('select').val($(this).data('value'));
				}else{
					$(this).parents('.select-block').find('select').val($(this).html());
				}
				if($(this).parents('.select-block').find('select').val()!=''){
					$(this).parents('.select-block').find('.select').addClass('focus');
				}else{
					$(this).parents('.select-block').find('.select').removeClass('focus');
				}
			});
			$(document).on('click touchstart',function(e) {
				if (!$(e.target).is(".select *")) {
					$('.select').removeClass('active');
					$('.select-options').slideUp(50,function() {
						$(".select-options-inside").getNiceScroll().resize();
					});
				};
			});
		}
		//CHECK
		$.each($('.check.active'), function(index, val) {
			$(this).find('input').prop('checked', true);
		});
		$('.check').click(function(event) {
			if(!$(this).hasClass('disable')){
					var target = $(event.target);
				if (!target.is("a")){
					$(this).toggleClass('active');
					if($(this).hasClass('active')){
						$(this).find('input').prop('checked', true);
					}else{
						$(this).find('input').prop('checked', false);
					}
				}
			}
		});
		//OPTION
		$.each($('.option.active'), function(index, val) {
			$(this).find('input').prop('checked', true);
		});
		$('.option').click(function(event) {
			if(!$(this).hasClass('disable')){
				if($(this).hasClass('active') && $(this).hasClass('order') ){
					$(this).toggleClass('orderactive');
				}
					$(this).parents('.options').find('.option').removeClass('active');
					$(this).toggleClass('active');
					$(this).children('input').prop('checked', true);
			}
		});
		//RATING
		$('.rating.edit .star').hover(function() {
			$(this).parent().find('.rating__activeline').css({width:'0%'});
				var ind=$(this).index()+1;
				var linew=ind/$(this).parent().find('.star').length*100;
			setrating($(this).parent(),linew);
		},function() {
			$(this).parent().find('.star').removeClass('active');
				var ind=$(this).parent().find('input').val();
				var linew=ind/$(this).parent().find('.star').length*100;
			setrating($(this).parent(),linew);
		});
		$('.rating.edit .star').click(function(event) {
				var re=$(this).index()+1;
				$(this).parent().find('input').val(re);
				var linew=re/$(this).parent().find('.star').length*100;
			setrating($(this).parent(),linew);
		});
		$.each($('.rating'), function(index, val) {
				var ind=$(this).find('input').val();
				var linew=ind/$(this).parent().find('.star').length*100;
			setrating($(this),linew);
		});
		function setrating(th,val) {
			th.find('.rating__activeline').css({width:val+'%'});
		}
		//QUANTITY
		$('.quantity__btn').click(function(event) {
				var n=parseInt($(this).parent().find('.quantity__input').val());
			if($(this).hasClass('dwn')){
				n=n-1;
				if(n<1){n=1;}
			}else{
				n=n+1;
			}
				$(this).parent().find('.quantity__input').val(n);
			return false;
		});
		//RANGE
		if($("#range" ).length>0){
			$("#range" ).slider({
				range: true,
				min: 0,
				max: 5000,
				values: [0, 5000],
				slide: function( event, ui ){
					$('#rangefrom').val(ui.values[0]);
					$('#rangeto').val(ui.values[1]);
					$(this).find('.ui-slider-handle').eq(0).html('<span>'+ui.values[0]+'</span>');
					$(this).find('.ui-slider-handle').eq(1).html('<span>'+ui.values[1]+'</span>');
				},
				change: function( event, ui ){
					if(ui.values[0]!=$( "#range" ).slider( "option","min") || ui.values[1]!=$( "#range" ).slider( "option","max")){
						$('#range').addClass('act');
					}else{
						$('#range').removeClass('act');
					}
				}
			});
			$('#rangefrom').val($( "#range" ).slider( "values", 0 ));
			$('#rangeto').val($( "#range" ).slider( "values", 1 ));

			$("#range" ).find('.ui-slider-handle').eq(0).html('<span>'+$( "#range" ).slider( "option","min")+'</span>');
			$("#range" ).find('.ui-slider-handle').eq(1).html('<span>'+$( "#range" ).slider( "option","max")+'</span>');
			
			$( "#rangefrom" ).bind("change", function(){
				if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
					$(this).val($( "#range" ).slider( "option","max"));
				}
				if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
					$(this).val($( "#range" ).slider( "option","min"));
				}
				$("#range" ).slider( "values",0,$(this).val());
			});
			$( "#rangeto" ).bind("change", function(){
				if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
					$(this).val($( "#range" ).slider( "option","max"));
				}
				if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
					$(this).val($( "#range" ).slider( "option","min"));
				}
				$("#range" ).slider( "values",1,$(this).val());
			});
			$("#range" ).find('.ui-slider-handle').eq(0).addClass('left');
			$("#range" ).find('.ui-slider-handle').eq(1).addClass('right');
		}
	}
	forms();

	//VALIDATE FORMS
	$('form button[type=submit]').click(function(){
			var er=0;
			var form=$(this).parents('form');
		$.each(form.find('.req'), function(index, val) {
			if($(this).attr('name')=='email' || $(this).hasClass('email')){
				if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($(this).val()))){
						er++;
						$(this).addClass('err');
						$(this).parent().addClass('err');
					if($(this).data('error') && $(this).data('error')!='' && $(this).parent().find('.formmodule-form__error').length==0){
						$(this).parent().append('<div class="formmodule-form__error">'+$(this).data('error')+'</div>');
					}
				}else{
					$(this).removeClass('err');
					$(this).parent().removeClass('err');
					$(this).parent().find('.formmodule-form__error').remove();
				}
			}else{
				if($(this).val()=='' || $(this).val()==$(this).attr('data-value')){
					er++;
					if($(this).parents('.select-block').length>0){
						$(this).parents('.select-block').addClass('err');
					}else{
							$(this).addClass('err');
							$(this).parent().addClass('err');
						if($(this).data('error') && $(this).data('error')!='' && $(this).parent().find('.formmodule-form__error').length==0){
							$(this).parent().append('<div class="formmodule-form__error">'+$(this).data('error')+'</div>');
						}
					}
				}else{
					if($(this).parents('.select-block').length>0){
						$(this).parents('.select-block').removeClass('err');
					}else{
						$(this).removeClass('err');
						$(this).parent().removeClass('err');
						$(this).parent().find('.formmodule-form__error').remove();
					}
					
				}
			}
			if($(this).attr('type')=='checkbox'){
				if($(this).prop('checked') == true){
					$(this).removeClass('err').parent().removeClass('err');
				}else{
					er++;
					$(this).addClass('err').parent().addClass('err');
				}
			}
		});
		if(form.find('.pass').eq(0).val()!=form.find('.pass').eq(1).val()){
			er++;
			form.find('.pass').addClass('err');
		}else{
			form.find('.pass').removeClass('err');
		}
		if(er==0){
			if($('.mainscreen-form__message').length>0){
				$('.mainscreen-form__message').slideToggle(300);
			}
			if($('.popup-message').length>0 && form.hasClass('mess')){
				$('.popup').hide().css({top:$(window).scrollTop()+50});
				$('.popup-bg').fadeIn(300);
				$('.popup-message').fadeIn(300);
				/*setTimeout(function(event) {
					$('.popup,.popup-bg').fadeOut(300);
				},4000);*/
			}
			if($('.popup-faqmessage').length>0 && form.hasClass('faqmess')){
				$('.popup').hide().css({top:$(window).scrollTop()+50});
				$('.popup-bg').fadeIn(300);
				$('.popup-faqmessage').fadeIn(300);
				setTimeout(function(event) {
					$('.popup,.popup-bg').fadeOut(300);
				},4000);
			}
			$.each(form.find('.input'), function(index, val) {
					$(this).val($(this).data('value'));
				if($(this).hasClass('phone')){
					maskclear($(this));
				}
			});

			return false;
		}else{
			return false;
		}
	});
	function maskclear(n){
		if(n.val()==""){
			n.inputmask('remove');
			n.val(n.attr('data-value'));
			n.removeClass('focus');
			n.parent().removeClass('focus');
		}
	}
});