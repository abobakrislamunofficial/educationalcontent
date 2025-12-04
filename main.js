// main.js

// 1. تعريف المحتوى التعليمي المستخرج من الكتاب
const slidesData = [
    {
        type: 'intro',
        title: 'كفايات الاتصال الكتابي',
        content: 'خطوات بناء الموضوع: دليل شامل لتحسين مهارات الكتابة والتأليف.',
        imageConcept: 'open book with glowing arabic letters'
    },
    {
        type: 'list',
        title: 'الخطوات السبع لبناء الموضوع',
        items: [
            '1. اختيار الموضوع',
            '2. تحديد الهدف',
            '3. جمع المعلومات وتصنيفها',
            '4. تخطيط الموضوع',
            '5. الكتابة الأولى',
            '6. المراجعة',
            '7. الكتابة النهائية'
        ],
        imageConcept: 'stairs leading up labeled with numbers 1 to 7'
    },
    {
        type: 'detail',
        title: '1. اختيار الموضوع',
        content: 'يجب أن تكون معلوماتك عنه جيدة، أو يمثل جزءاً من اهتماماتك، أو يهم القراء ولديك إضافات جيدة حوله.',
        imageConcept: 'person choosing a book from a library shelf'
    },
    {
        type: 'detail',
        title: '2. تحديد الهدف',
        content: 'لماذا تكتب؟ هل للتعبير عن الذات (عاطفة، رأي)؟ أم لمعالجة معلومات (إضافة، تلخيص، توضيح)؟',
        imageConcept: 'target board with an arrow hitting the center'
    },
    {
        type: 'detail',
        title: '3. جمع المعلومات وتصنيفها',
        content: 'المصادر: الكتب، الصحف، المجلات، الشبكة العنكبوتية، المقابلات، الخبرة الشخصية.<br>التصنيف: أبواب أو فصول أو أفكار رئيسة.',
        imageConcept: 'network of books, computers and newspapers connected'
    },
    {
        type: 'detail',
        title: '4. تخطيط الموضوع',
        content: 'تصميم مخطط للموضوع (لاحق) لتنظيم الأفكار وتوزيعها منطقياً.',
        imageConcept: 'blueprint on a desk with a pencil'
    },
    {
        type: 'detail',
        title: '5. الكتابة الأولى',
        content: 'التركيز على عرض المعلومات واستيفائها دون القلق المفرط بشأن الصياغة في هذه المرحلة.',
        imageConcept: 'hand writing fast on paper with ink splashes'
    },
    {
        type: 'detail',
        title: '6. المراجعة',
        content: 'التأكد من صحة اللغة والإملاء، منطقية تسلسل الأفكار، جمال الأسلوب، وقوة التأثير والإقناع.',
        imageConcept: 'magnifying glass over text checking for errors'
    },
    {
        type: 'detail',
        title: '7. الكتابة النهائية',
        content: 'كتابة المبيضة، والاهتمام بجودة الإخراج وتناسق الهوامش.',
        imageConcept: 'perfectly printed document with a gold stamp'
    },
    {
        type: 'mindmap',
        title: 'الخريطة الذهنية: بناء الموضوع',
        content: 'تصور مرئي للعلاقات بين خطوات بناء الموضوع.',
        action: 'drawMindMap' 
    },
    {
        type: 'summary',
        title: 'الخاتمة',
        content: 'اتباع هذه الخطوات يضمن لك موضوعاً متكاملاً ومؤثراً.',
        imageConcept: 'success trophy education'
    }
];

let currentSlideIndex = 0;

// تهيئة العرض
function init() {
    const container = document.getElementById('slideContainer');
    container.innerHTML = ''; // تنظيف

    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
        slideDiv.id = `slide-${index}`;

        let htmlContent = `<h2>${slide.title}</h2>`;

        // إضافة صورة AI (وهمية للعرض)
        if(slide.imageConcept) {
             const prompt = generateImagePrompt(slide.imageConcept);
             htmlContent += `
             <div class="ai-image-container">
                <div class="ai-placeholder">
                    <span>[AI Image Generated Here]</span>
                    <p class="prompt-text">Prompt: ${prompt}</p>
                </div>
             </div><br>`;
        }

        if (slide.type === 'list') {
            htmlContent += '<ul class="list-group">';
            slide.items.forEach(item => {
                htmlContent += `<li class="list-item">${item}</li>`;
            });
            htmlContent += '</ul>';
        } else if (slide.type === 'mindmap') {
            htmlContent += `<canvas id="mindmapCanvas" width="800" height="500"></canvas>`;
        } else {
            htmlContent += `<p class="content-box">${slide.content}</p>`;
        }

        slideDiv.innerHTML = htmlContent;
        container.appendChild(slideDiv);
    });

    updateControls();
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    
    // تحديث شريط التقدم
    const progress = ((index + 1) / slidesData.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;

    // التحقق مما إذا كانت الشريحة تتطلب رسم خريطة ذهنية
    if (slidesData[index].type === 'mindmap') {
        setTimeout(drawMindMap, 100); // تأخير بسيط لضمان تحميل العنصر
    }
    
    updateControls();
}

function nextSlide() {
    if (currentSlideIndex < slidesData.length - 1) {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
    }
}

function updateControls() {
    document.getElementById('slideIndicator').textContent = `${currentSlideIndex + 1} / ${slidesData.length}`;
    document.getElementById('prevBtn').disabled = currentSlideIndex === 0;
    document.getElementById('nextBtn').disabled = currentSlideIndex === slidesData.length - 1;
}

// بدء التشغيل عند تحميل الصفحة
window.onload = init;