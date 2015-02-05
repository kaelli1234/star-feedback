/**
 * @version: 1.0.0
 * @author: Kael Li
 * @date: 2015-02-04
 * @license: MIT
 *
 * @example
 *
 * @param int num 星星数量
 * @param jQuery obj rate 当前选择的星星数的赋值对象
 * $('#example').star({num:5, rate: $('#test')});
 *
 * <div id="example"></div>
 *
 * @star-feedback css
 *  .star {
 *      width: 23px;
 *      height: 23px;
 *      background: url("../images/star.png") 0 -23px no-repeat;
 *      display: inline-block;
 *  }
 *  .star-on {
 *      background: url("../images/star.png") 0 0 no-repeat;
 *  }
 */
;(function($, window, document, undefined) {
	'use strict';

	var Star = function(element, options) {
		this.$element = element;
		this.current = 0;
		this.defaults = {
			'num' : 1,
			'rate' : element,
		},
		this.options = $.extend({}, this.defaults, options);
	}

	Star.prototype = {
		init: function() {
			var i,
				_template = '';

			for(i = 0; i < this.options.num; i++) {
				_template += '<em class="star"></em>';
			}

			this.$element.html(_template);
			this.$element.find('.star').hover(
	            this.mouseover,
	            $.proxy(this.mouseout, this)
	        );

	        this.$element.find('.star').on('click', $.proxy(this.click, this));
		},
		mouseover: function() {
			$(this).siblings().removeClass('star-on');
        	$(this).addClass('star-on');
            $(this).prevAll().addClass('star-on');
		},
		mouseout: function() {
        	this.$element.find('.star').removeClass('star-on');

            var $t = this.$element.find('.star:lt(' + this.current + ')');
            $t.addClass('star-on');
		},
		click: function() {
        	var _length = this.$element.find('.star-on').length;
			var $t = this.$element.find('.star:lt(' + _length + ')');
			this.current = _length;

			this.$element.find('.star').removeClass('star-on');
			$t.addClass('star-on');
			this.options.rate.attr('value', _length);
		},
	}

	$.fn.star = function(options) {
		var star = new Star(this, options)

		return star.init();
	}
})(jQuery, window, document);