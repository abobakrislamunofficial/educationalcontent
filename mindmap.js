// mindmap.js

function drawMindMap() {
    const canvas = document.getElementById('mindmapCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // مسح الـ Canvas
    ctx.clearRect(0, 0, width, height);

    // بيانات العقد (Nodes)
    const centerX = width / 2;
    const centerY = height / 2;
    
    const nodes = [
        { text: "بناء الموضوع", x: centerX, y: centerY, color: "#e67e22", size: 60 },
        { text: "اختيار", x: centerX, y: centerY - 150, color: "#3498db", size: 40 },
        { text: "تحديد الهدف", x: centerX + 130, y: centerY - 80, color: "#3498db", size: 40 },
        { text: "جمع المعلومات", x: centerX + 130, y: centerY + 80, color: "#3498db", size: 40 },
        { text: "التخطيط", x: centerX, y: centerY + 150, color: "#3498db", size: 40 },
        { text: "الكتابة الأولى", x: centerX - 130, y: centerY + 80, color: "#3498db", size: 40 },
        { text: "المراجعة", x: centerX - 130, y: centerY - 80, color: "#3498db", size: 40 },
        { text: "النهائية", x: centerX - 200, y: centerY, color: "#27ae60", size: 40 } // مميزة لأنها النهاية
    ];

    // رسم الخطوط (Edges)
    ctx.strokeStyle = "#95a5a6";
    ctx.lineWidth = 2;
    
    nodes.slice(1).forEach(node => {
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
    });

    // رسم العقد والنصوص
    nodes.forEach(node => {
        // الدائرة
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.stroke();

        // النص
        ctx.fillStyle = "#fff";
        ctx.font = "bold 14px Cairo";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.text, node.x, node.y);
    });
}