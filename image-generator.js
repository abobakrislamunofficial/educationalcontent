// image-generator.js

/**
 * يولد وصفاً دقيقاً للصورة (Prompt) لنموذج Nano-Banana
 * @param {string} concept - المفهوم المراد رسمه
 * @returns {string} - النص النهائي للـ Prompt
 */
function generateImagePrompt(concept) {
    const style = "educational vector art, flat design, minimal, soft colors (orange and blue), high quality, white background";
    
    // تحويل المفهوم البسيط إلى وصف كامل
    return `Create an illustration of ${concept}. Style: ${style}. No text inside the image.`;
}

// ملاحظة: في بيئة إنتاج حقيقية، ستقوم دالة هنا باستدعاء API فعلي
// fetch('https://api.nano-banana.ai/generate', { ... })