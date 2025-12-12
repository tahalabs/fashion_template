$(document).ready(function () {

    $(".nav-item.dropdown").hover(
        function () {
            $(this).find(".dropdown-menu").show();
        },
        function () {
            $(this).find(".dropdown-menu").hide();
        }
    );

    
    const $wrapper = $('.carousel-wrapper');
    const $container = $('#productCarousel');
    const intervalMs = 2500;    // اسلاید هر 1 ثانیه
    const animMs = 400;         // مدت انیمیشن باید با CSS همخوانی داشته باشه

    // helper: set the wrapper transform to slide left by one item (25% of viewport width including gaps)
    function slideOnce() {
        // animate left by 1 item width
        $wrapper.css('transition', `transform ${animMs}ms ease`);
        // move left by (item width + gap). Because we use flex + gap, easiest راه: translateX(- (itemWidth + gap) )
        // But simpler: compute the actual pixel shift = width of first .item + gap
        const $firstItem = $wrapper.find('.item').first();
        const shift = $firstItem.outerWidth(true); // includes margin/gap if any
        $wrapper.css('transform', `translateX(-${shift}px)`);

        setTimeout(() => {
            // remove transition, move first item to end, reset transform
            $wrapper.css('transition', 'none');
            $wrapper.css('transform', 'translateX(0)');
            $firstItem.appendTo($wrapper);
            // small timeout to allow browser paint, then re-enable transition class for future
            setTimeout(() => $wrapper.css('transition', ''), 20);

            // بعد از جابجایی کلاس hover-active و ... را ریفِرِش کن
            refreshHoverTarget();
        }, animMs);
    }

    // وقتی موس روی carousel باشه، حالت hover-active رو اضافه کن تا آیتم دوم از راست ظاهر بشه
    $container.on('mouseenter', function () {
        $container.addClass('hover-active');
    }).on('mouseleave', function () {
        $container.removeClass('hover-active');
    });

    // refreshHoverTarget (در این پیاده‌سازی ما از nth-child(3) استفاده می‌کنیم)
    function refreshHoverTarget() {
        // این تابع الان نیازی به انجام کار JS خاصی نداره چون CSS روی nth-child(3) اعمال میشه
        // اما اگر بخوای که همیشه دقیقاً "دوم از راست درون ۴ ظاهر" رو پویا تعیین کنی، می‌تونی اینجا کلاس‌ها را جابجا کنی.
    }

    // شروع اتوماتیک
    let timer = setInterval(slideOnce, intervalMs);

    // اگر می‌خوای هنگام هاور اتوماتیک متوقف شود:
    $container.on('mouseenter', function () { clearInterval(timer); });
    $container.on('mouseleave', function () { timer = setInterval(slideOnce, intervalMs); });

    // init
    refreshHoverTarget();


});
