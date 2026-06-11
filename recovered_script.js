Created At: 2026-06-10T18:20:23Z
Completed At: 2026-06-10T18:20:23Z
2965: // ميزات قسم تصميم كروكي التفاعلي (Interactive Sketch Editor Features)
2966: // ====================================================================
2967: 
2968: // --- دالة تهيئة الأحداث على الكانفاس ---
2969: function initSketchCanvas() {
2970:     const canvas = document.getElementById('sketch-canvas');
2971:     if (!canvas) return;
2972: 
2973:     // تهيئة أحداث الماوس
2974:     canvas.addEventListener('mousedown', handleSketchStart);
2975:     canvas.addEventListener('mousemove', handleSketchMove);
2976:     canvas.addEventListener('mouseup', handleSketchEnd);
2977:     canvas.addEventListener('mouseout', handleSketchEnd);
2978: 
2979:     // تهيئة أحداث اللمس للهواتف والأجهزة اللوحية مباشرة
2980:     canvas.addEventListener('touchstart', handleSketchStart, { passive: false });
2981:     canvas.addEventListener('touchmove', handleSketchMove, { passive: false });
2982:     canvas.addEventListener('touchend', handleSketchEnd, { passive: false });
2983:     canvas.addEventListener('touchcancel', handleSketchEnd, { passive: false });
2984: }
2985: 
2986: // --- أحداث محرك الرسم ---
2987: 
2988: function handleSketchStart(e) {
2989:     const canvas = document.getElementById('sketch-canvas');
2990:     const coords = getCanvasCoords(e, canvas);
2991:     
2992:     // منع التمرير على الجوال عند التفاعل مع أداة الرسم أو جر الأشكال
    if (e.type === 'touchstar
<truncated 10729 bytes>
l) {
3232:     const cos = Math.cos(el.angle);
3233:     const sin = Math.sin(el.angle);
3234:     return {
3235:         x: el.x + lx * cos - ly * sin,
3236:         y: el.y + lx * sin + ly * cos
3237:     };
3238: }
3239: 
3240: function globalToLocal(gx, gy, el) {
3241:     const dx = gx - el.x;
3242:     const dy = gy - el.y;
3243:     const cos = Math.cos(-el.angle);
3244:     const sin = Math.sin(-el.angle);
3245:     return {
3246:         x: dx * cos - dy * sin,
3247:         y: dx * sin + dy * cos
3248:     };
3249: }
3250: 
3251: function hitTest(coords) {
3252:     for (let i = sketchElements.length - 1; i >= 0; i--) {
3253:         const el = sketchElements[i];
3254:         if (el.type === 'freehand') {
3255:             for (let pt of el.points) {
3256:                 if (distance(coords, pt) < 15) return el;
3257:             }
3258:         } else if (el.type === 'line') {
3259:             if (isPointNearSeg(coords, { x: el.x1, y: el.y1 }, { x: el.x2, y: el.y2 }, 15)) {
3260:                 return el;
3261:             }
3262:         } else {
3263:             const local = globalToLocal(coords.x, coords.y, el);
3264:             if (local.x >= -el.w / 2 && local.x <= el.w / 2 && local.y >= -el.h / 2 && local.y <= el.h / 2) {
3265:                 return el;
3266:             }
3267:         }
3268:     }
3269:     return null;
3270: }
3271: 
3272: function isPointNearSeg(p, a, b, threshold) {
3273:     const l2 = Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
3274:     if (l2 === 0) return distance(p, a) < threshold;
3275:     let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / l2;
3276:     t = Math.max(0, Math.min(1, t));
3277:     const projection = {
3278:         x: a.x + t * (b.x - a.x),
3279:         y: a.y + t * (b.y - a.y)
3280:     };
The above content does NOT show the entire file contents. If you need to view any lines of the file which were not shown to complete your task, call this tool again to view those lines.
