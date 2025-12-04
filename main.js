// main.js - النسخة التفاعلية

// صور حقيقية من Unsplash (روابط مباشرة لصور عالية الجودة تناسب التعليم)
const images = {
    intro: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80", // كتابة وقلم
    steps: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80", // لاب توب وتخطيط
    choice: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80", // مكتبة وكتب
    target: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80", // هدف وتخطيط
    research: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80", // مجموعة تعمل وتبحث
    plan: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=600&q=80", // دفتر ملاحظات
    write: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80", // قلم رصاص
    review: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80", // فريق يراجع
    final: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80", // ورقة نظيفة
    summary: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=600&q=80" // نجاح
};

const slidesData = [
    { type: 'intro', title: 'كفايات الاتصال الكتابي', content: 'خطوات بناء الموضوع: رحلة احترافية في عالم الكتابة.', img: images.intro },
    { type: 'list', title: 'خارطة الطريق (7 خطوات)', items: ['1. اختيار الموضوع', '2. تحديد الهدف', '3. جمع المعلومات', '4. تخطيط الموضوع', '5. الكتابة الأولى', '6. المراجعة', '7. الكتابة النهائية'], img: images.steps },
    { type: 'detail', title: '1. اختيار الموضوع', content: 'البداية الصحيحة: اختر ما تعرفه جيداً، أو ما يثير شغفك، أو ما يحتاجه جمهورك.', img: images.choice },
    { type: 'detail', title: '2. تحديد الهدف', content: 'بوصلة الكاتب: هل تكتب لتعبر عن مشاعرك (وجداني)؟ أم لتعالج معلومات وحقائق (عقلي)؟', img: images.target },
    { type: 'detail', title: '3. جمع المعلومات', content: 'الوقود: ابحث في الكتب، المجلات، الإنترنت، وحتى خبراتك الشخصية. نوع مصادرك لتقوية موضوعك.', img: images.research },
    { type: 'detail', title: '4. تخطيط الموضوع', content: 'الهندسة: لا تبدأ البناء دون مخطط. رتب أفكارك في أبواب وفصول منطقية.', img: images.plan },
    { type: 'detail', title: '5. الكتابة الأولى', content: 'التدفق الحر: اكتب كل ما لديك. ركز على شمولية المعلومات ولا تتوقف عند الأخطاء الآن.', img: images.write },
    { type: 'detail', title: '6. المراجعة', content: 'الجودة: الآن دور "الناقد". صحح الأخطاء، حسن الأسلوب، وتأكد من قوة الإقناع.', img: images.review },
    { type: 'detail', title: '7. الكتابة النهائية', content: 'اللمسات الأخيرة: أخرج موضوعك بشكله النهائي الجذاب. الشكل مهم بقدر المضمون.', img: images.final },
    { type: 'mindmap', title: 'الخريطة الذهنية التفاعلية', content: 'شاهد كيف تترابط الخطوات...', action: 'drawMindMap' },
    { type: 'summary', title: 'أنت جاهز الآن!', content: 'باتباعك لهذه المنهجية، ستنتقل كتابتك من العشوائية إلى الاحترافية.', img: images.summary }
];

let currentIndex = 0;

function init() {
    const container = document.getElementById('slideContainer');
    container.innerHTML = '';

    slidesData.forEach((slide, index) => {
        const div = document.createElement('div');
        div.className = 'slide';
        div.id = `slide-${index}`;
        if(index === 0) div.classList.add('active');

        let html = `<h2>${slide.title}</h2>`;

        if(slide.img) {
            html += `<img src="${slide.img}" class="real-image" alt="${slide.title}">`;
        }

        if(slide.type === 'list') {
            html += '<ul class="list-group">';
            slide.items.forEach((item, i) => html += `<li class="list-item" style="transition-delay: ${i*0.1}s">${item}</li>`);
            html += '</ul>';
        } else if(slide.type === 'mindmap') {
            html += `<canvas id="mindmapCanvas" width="350" height="350"></canvas>`;
            html += `<p style="margin-top:10px; color:#666; font-size:0.9rem;">يتم رسم الخريطة...</p>`;
        } else {
            html += `<p class="content-box">${slide.content}</p>`;
        }
        
        div.innerHTML = html;
        container.appendChild(div);
    });
    
    updateUI();
    setupSwipe();
}

function updateUI() {
    // تحديث شريط التقدم
    const progress = ((currentIndex + 1) / slidesData.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
    document.getElementById('slideIndicator').textContent = `${currentIndex + 1}/${slidesData.length}`;
    
    // تفعيل/تعطيل الأزرار
    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === slidesData.length - 1;

    // تشغيل أنيميشن القوائم
    const activeSlide = document.querySelector(`.slide.active`);
    const listItems = activeSlide.querySelectorAll('.list-item');
    if(listItems.length > 0) {
        setTimeout(() => listItems.forEach(li => li.classList.add('show')), 100);
    }

    // تشغيل الخريطة الذهنية
    if(slidesData[currentIndex].type === 'mindmap') {
        setTimeout(animateMindMap, 300);
    }
}

function nextSlide() {
    if(currentIndex >= slidesData.length - 1) return;
    
    const current = document.getElementById(`slide-${currentIndex}`);
    const next = document.getElementById(`slide-${currentIndex + 1}`);
    
    // إعداد كلاسات الحركة
    current.className = 'slide exit-right'; // يخرج لليمين (لأننا عربي RTL)
    next.className = 'slide enter-left active'; // يدخل من اليسار
    
    setTimeout(() => {
        current.classList.remove('active', 'exit-right');
        next.classList.remove('enter-left');
    }, 500);

    currentIndex++;
    updateUI();
}

function prevSlide() {
    if(currentIndex <= 0) return;

    const current = document.getElementById(`slide-${currentIndex}`);
    const prev = document.getElementById(`slide-${currentIndex - 1}`);

    current.className = 'slide exit-left';
    prev.className = 'slide enter-right active';

    setTimeout(() => {
        current.classList.remove('active', 'exit-left');
        prev.classList.remove('enter-right');
    }, 500);

    currentIndex--;
    updateUI();
}

// دعم السحب (Swipe) للجوال
function setupSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    const container = document.getElementById('slideContainer');

    container.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) prevSlide(); // سحب لليسار (السابق في العربية)
        if (touchEndX > touchStartX + 50) nextSlide(); // سحب لليمين (التالي)
    }
}

window.onload = init;