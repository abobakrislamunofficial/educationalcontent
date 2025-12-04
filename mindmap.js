// mindmap.js - يدعم الرسم المتحرك

function animateMindMap() {
    const canvas = document.getElementById('mindmapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w/2, cy = h/2;
    const nodes = [
        { x: cx, y: cy, r: 40, c: '#e67e22', t: 'بناء الموضوع' },
        { x: cx, y: cy-120, r: 25, c: '#3498db', t: '1.اختيار' },
        { x: cx+100, y: cy-60, r: 25, c: '#3498db', t: '2.هدف' },
        { x: cx+100, y: cy+60, r: 25, c: '#3498db', t: '3.جمع' },
        { x: cx, y: cy+120, r: 25, c: '#3498db', t: '4.تخطيط' },
        { x: cx-100, y: cy+60, r: 25, c: '#3498db', t: '5.كتابة' },
        { x: cx-100, y: cy-60, r: 25, c: '#3498db', t: '6.مراجعة' }
    ];

    let step = 0;
    const totalSteps = nodes.length;

    function drawStep() {
        if (step >= totalSteps) return; // انتهى الرسم

        const n = nodes[step];
        
        // رسم الخط إذا لم تكن العقدة المركزية
        if (step > 0) {
            ctx.beginPath();
            ctx.moveTo(nodes[0].x, nodes[0].y);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // رسم الدائرة بتأثير الظهور
        let currentR = 0;
        const animateNode = setInterval(() => {
            currentR += 2;
            ctx.beginPath();
            ctx.arc(n.x, n.y, currentR, 0, Math.PI*2);
            ctx.fillStyle = n.c;
            ctx.fill();
            
            if (currentR >= n.r) {
                clearInterval(animateNode);
                // كتابة النص
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Cairo';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(n.t, n.x, n.y);
                
                step++;
                setTimeout(drawStep, 200); // تأخير بسيط قبل رسم العقدة التالية
            }
        }, 10);
    }

    drawStep(); // بدء الرسم
}