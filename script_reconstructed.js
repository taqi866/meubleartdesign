{"step_index":0,"source":"USER_EXPLICIT","type":"USER_INPUT","status":"DONE","created_at":"2026-06-06T07:16:05Z","content":"<USER_REQUEST>\ntransfomer le site en bleu foncé en gardant les mems fonctionnailités\n</USER_REQUEST>\n<ADDITIONAL_METADATA>\nThe current local time is: 2026-06-06T08:16:05+01:00.\n</ADDITIONAL_METADATA>\n<USER_SETTINGS_CHANGE>\nThe user changed setting `Model Selection` from None to Gemini 3.5 Flash (Medium). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.\n</USER_SETTINGS_CHANGE>"}
{"step_index":1,"source":"SYSTEM","type":"CONVERSATION_HISTORY","status":"DONE","created_at":"2026-06-10T17:43:01Z"}
{"step_index":2,"source":"MODEL","type":"PLANNER_RESPONSE","status":"DONE","created_at":"2026-06-10T17:43:01Z","content":"I will start by listing the contents of the project directory to understand the structure of the application and locate the sidebar files.","tool_calls":[{"name":"list_dir","args":{"DirectoryPath":"\"c:\\\\Users\\\\hp\\\\Desktop\\\\Meuble Art Design\"","toolAction":"\"Listing project files\"","toolSummary":"\"Project file listing\""}}]}
{"step_index":3,"source":"MODEL","type":"LIST_DIRECTORY","status":"DONE","created_at":"2026-06-06T07:16:07Z","content":"Created At: 2026-06-06T07:16:07Z\nCompleted At: 2026-06-06T07:16:07Z\n{\"name\":\"CNAME\", \"sizeBytes\":\"11\"}\n{\"name\":\"code.gs.txt\", \"sizeBytes\":\"101734\"}\n{\"name\":\"css\", \"isDir\":true}\n{\"name\":\"favicon-144
- `[/]` تعديل ملف `script.js` لإعداد مسارات التنقل، ونظام التخزين المحلي للسكيتشات، والتحكم التفاعلي بالرسم، وتوليد الـ PDF
- `[ ]` اختبار الميزة والتأكد من إمكانية الرسم، والقياس، والتحويل بين الأبيض والأسود/الملون، وحفظ التصاميم وتعديلها وتحميلها كـ PDF
- `[x]` تحديث منطق رسم الشبكة في `drawSketch` و `generateSketchImageDataAsync` لتصبح أكثر وضوحاً وتفصيلاً.
                summary: "تنهي إدارة مؤسسة عليين إلى علم كافة الآباء والأمهات أن الدخول المدرسي الفعلي سيكون يوم...",
                content: "تنهي الإدارة التربوية لمؤسسة عليين الخاصة إلى علم كافة الآباء والأمهات وأولياء الأمور، أن الدخول المدرسي الفعلي للموسم الجديد سيكون يوم الاثنين 4 شتنبر.\n\nسيتم استقبال تلاميذ السلك الابتدائي في الفترة الصباحية ابتداء من الساعة 08:30، وتلاميذ السلك الإعدادي والثانوي في الفترة المسائية.\n\nنرجو الالتزام بالحضور في الوقت المحدد.",
- Updated [fetchWorkers](file:///c:/Users/hp/Desktop/Meuble%20Art%20Design/script.js#L1474-L1493) to always request the complete set of workers (`showInactive: true`) from the Google Apps Script backend.
- Moved the active/inactive filtering entirely to the client-side using Javascript `filter` before calling [renderWorkersTable](file:///c:/Users/hp/Desktop/Meuble%20Art%20Design/script.js#L1495-L1546).
- When the background sync finishes, it preserves the complete cache (both active and inactive workers) in `localStorage` and re-applies client-side filters.
    A --> D(logo.png - الشعار المحلي)
    C -- "doPost (CORS JSON API)" --> E[Google Sheets Backend - Apps Script]
                date: "2024-07-05",
   - `syncAllDataFromServer()` fetches all workers (active & inactive) and saves them in `localStorage`.
### 1. الملفات الجديدة في مساحة العمل
- **[index.html](file:///c:/Users/hp/Desktop/Meuble%20Art%20Design/index.html):** هيكلية الموقع النظيفة خالية من الأكواد المدمجة، وتدعم تشغيل السكربتات والتنسيقات الخارجية.
- **[style.css](file:///c:/Users/hp/Desktop/Meuble%20Art%20Design/style.css):** يضم كامل التنسيقات المخصصة وحركات التحول وتصاميم النوافذ المنبثقة التفاعلية.
- **[script.js](file:///c:/Users/hp/Desktop/Meuble%20Art%20Design/script.js):** ي
   - Toggling the checkbox instantly filters the local cache to include inactive workers and renders them to the screen (0ms delay).
   - Background sync updates the cache silently.
// MISSING LINE 23
### 2. منطق التطبيق والرسم (JavaScript)
- Checked the logic flow to ensure no data loss occurs when overwriting the local cache.
{"step_index":26,"source":"USER_EXPLICIT","type":"USER_INPUT","status":"DONE","created_at":"2026-06-10T17:46:47Z","content":"<USER_REQUEST>\nبالنسبة للشبكة يجب أن تكون مربعات صغار فقط يظهرون بشكل واضح و قم بتكبير حجم الشبكة في الطول لكي تأخد الصفحة A4 عند الطباعة مع الحفاظ على باقي الوظائف\n</USER_REQUEST>\n<ADDITIONAL_METADATA>\nThe current local time is: 2026-06-10T18:46:47+01:00.\n</ADDITIONAL_METADATA>"}
{"step_index":27,"source":"MODEL","type":"PLANNER_RESPONSE","status":"DONE","created_at":"2026-06-10T17:46:47Z","content":"I will view the end of `index.html` to find the print modals for the sketch.","thinking":"**Adjusting the Grid's Layout**\n\nI'm focusing now on the grid's visual representation. The current priority is to ensure only small, distinct squares are visible. Simultaneously, I'm working to expand the grid's length to perfectly fit an A4 page when printed. All other functions will be preserved as requested.\n\n\n**Examining the Grid Code**\n\nI've located the grid drawing section within `script.js`, specifically around line 3302. It seems the grid spacing is currently set to 20 pixels. The code uses `canvas.width` and `canvas.height` to define the grid's boundaries, which I think are good starting points for adjusting its size. The A4 page fit is next on my list.\n\n\n**Refining the Grid Lines**\n\nI'm now changing the grid line style to align with the \"small squares\" directive. It seems the code currently distinguishes major lines at 100px intervals, which will be removed. The idea is to make all lines uniform at, say
// MISSING LINE 28
// MISSING LINE 29
// MISSING LINE 30
// MISSING LINE 31
{"step_index":32,"source":"MODEL","type":"VIEW_FILE","status":"DONE","created_at":"2026-06-06T07:16:48Z","content":"Created At: 2026-06-06T07:16:48Z\nCompleted At: 2026-06-06T07:16:48Z\nFile Path: `file:///c:/Users/hp/Desktop/tajirox.github.io-main/index.htm`\nTotal Lines: 3306\nTotal Bytes: 232353\nShowing lines 800 to 1599\nThe following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.\n800:                             <p id=\"lowCount\" class=\"text-lg font-black text-orange-700\">0</p>\r\n801:                         </div>\r\n802:                         <div class=\"bg-blue-50 p-3 rounded-xl text-center\">\r\n803:                             <p class=\"text-[9px] text-blue-700 font-black\" data-i18n=\"normal\">طبيعي</p>\r\n804:                             <p id=\"normalCount\" class=\"text-lg font-black text-blue-700\">0</p>\r\n805:                         </div>\r\n806:                     </div>\r\n807:                 </div>\r\n808: \r\n809:                 <!-- عرض المنتجات كبطاقات -->\r\n810:                 <div id=\"inventoryContainer\" class=\"cards-grid\">\r\n811:                     <!-- سيتم إضافة البطاقات هنا -->\r\n812:                 </div>\r\n813: \r\n814:                 <!-- رسالة عندما لا توجد منتجات -->\r\n815:                 <div id=\"noInventoryMessage\" class=\"hidden text-center p-8 bg-white rounded-[2rem] shadow-sm\">\r\n816:                     <i class=\"fas fa-search text-3xl text-slate-300 mb-3\"></i>\r\n817:                     <p class=\"text-slate-400 font-bold mb-2\" data-
  - تحديث رسم الشبكة في الدالتين `drawSketch` و `generateSketchImageDataAsync`.
  - تغيير لون خطوط الشبكة من الرمادي الخفيف جداً `#eaeaea` إلى لون رمادي داكن واضح باستخدام شفافية `rgba(0, 0, 0, 0.14)`.
  - رسم خطوط رئيسية عريضة وداكنة كل `100px` (باستخدام `rgba(0, 0, 0, 0.28)` وعرض `1.0`) وخطوط فرعية كل `20px` لتبدو الشبكة مثل ورقة الرسم البياني الاحترافية وواضحة جداً للعين.
2. استبدل محتوى ملف الكود القديم بجدول البيانات بكامل محتوى الملف المحدث [code.gs.txt](file:///c:/Users/hp/Desktop/Meuble%20Art%20Design/code.gs.txt).
3. اضغط على زر **Deploy (نشر)** في الأعلى، ثم اختر **New Deployment (نشر جديد)**.
4. اختر نوع النشر **Web App (تطبيق ويب)**.
5. اضبط الخيارات التالية:
   - **Execute as (التنفيذ باسم):** Me (أنا - بريدك الإلكتروني).
   - **Who has access (من لديه الصلاحية):** Anyone (أي شخص - لتمكين الاتصال الخارجي من GitHub).
6. اضغط **Deploy** وامنح الصلاحيات اللازمة للاتصال بجدول البيانات.
7. **انسخ رابط تطبيق الويب الناتج (Web App URL)**.
2. التحقق من ظهور أزرار الأشكال الهندسية الثمانية الجديدة وتنسيقها الأنيق.
3. تجربة إضافة كل شكل هندسي وتغيير حجمه، تدويره، وتغيير لونه.
1. افتح ملف [script.js](file:///c:/Users/hp/Desktop/Meuble%20Art%20Design/script.js).
5. التحقق من أن خطوط الشبكة أصبحت واضحة وبارزة بوضوح، مع تمييز المربعات الرئيسية الكبيرة (100px) عن الصغيرة (20px).
6. تصدير التصميم كـ PDF والتأكد من مطابقة الرسم والشبكة الجديدة في ملف PDF المولد.
   const BACKEND_URL = "ضع_هنا_الرابط_الذي_نسخته";
{"step_index":50,"source":"MODEL","type":"CODE_ACTION","status":"DONE","created_at":"2026-06-06T07:18:07Z","content":"Created At: 2026-06-06T07:18:07Z\nCompleted At: 2026-06-06T07:18:07Z\nThe following changes were made by the replace_file_content tool to: c:\\Users\\hp\\Desktop\\tajirox.github.io-main\\js\\dashboard.js. If relevant, proactively run terminal commands to execute this code for the USER. Don't ask for permission.\n[diff_block_start]\n@@ -595,12 +595,12 @@\n                     datasets: [{\r\n                         label: t('sales'),\r\n                         data: data,\r\n-                        borderColor: '#2563eb',\r\n+                        borderColor: '#1e3a8a',\r\n                         tension: 0.4,\r\n                         fill: true,\r\n-                        backgroundColor: 'rgba(37, 99, 235, 0.05)',\r\n+                        backgroundColor: 'rgba(30, 58, 138, 0.05)',\r\n                         borderWidth: 3,\r\n-                        pointBackgroundColor: '#2563eb',\r\n+                        pointBackgroundColor: '#1e3a8a',\r\n                         pointBorderColor: '#ffffff',\r\n                         pointBorderWidth: 2,\r\n                         pointRadius: 5\r\n[diff_block_end]\n\nPlease note that the above snippet only shows the MODIFIED lines from the last change. It shows up to 3 lines of unchanged lines before and after the modified lines. The actual file contents may have many more lines not shown."}
3. قم بإنشاء مستودع (Repository) جديد على حسابك في GitHub.
4. ارفع الملفات التالية مباشرة إلى المستودع:
   - `index.html`
   - `script.js`
   - `style.css`
   - `logo.png`
5. ادخل إعدادات المستودع (Settings) -> **Pages**، وقم بتفعيل النشر من الفرع `main` والمجلد `root /`.
6. ستحصل على رابط مباشر لموقعك المستضاف بنجاح على GitHub Pages!
// MISSING LINE 59
// MISSING LINE 60
// MISSING LINE 61
// MISSING LINE 62
// MISSING LINE 63
// MISSING LINE 64
// MISSING LINE 65
// MISSING LINE 66
// MISSING LINE 67
// MISSING LINE 68
// MISSING LINE 69
// MISSING LINE 70
// MISSING LINE 71
// MISSING LINE 72
// MISSING LINE 73
// MISSING LINE 74
// MISSING LINE 75
// MISSING LINE 76
// MISSING LINE 77
// MISSING LINE 78
// MISSING LINE 79
// MISSING LINE 80
// MISSING LINE 81
// MISSING LINE 82
// MISSING LINE 83
// MISSING LINE 84
// MISSING LINE 85
// MISSING LINE 86
// MISSING LINE 87
// MISSING LINE 88
// MISSING LINE 89
// MISSING LINE 90
// MISSING LINE 91
// MISSING LINE 92
// MISSING LINE 93
// MISSING LINE 94
// MISSING LINE 95
// MISSING LINE 96
// MISSING LINE 97
// MISSING LINE 98
// MISSING LINE 99
// MISSING LINE 100
// MISSING LINE 101
// MISSING LINE 102
// MISSING LINE 103
// MISSING LINE 104
// MISSING LINE 105
// MISSING LINE 106
// MISSING LINE 107
// MISSING LINE 108
// MISSING LINE 109
// MISSING LINE 110
// MISSING LINE 111
// MISSING LINE 112
// MISSING LINE 113
// MISSING LINE 114
// MISSING LINE 115
// MISSING LINE 116
             .withFailureHandler(customFai
// MISSING LINE 118
// MISSING LINE 119
// MISSING LINE 120
// MISSING LINE 121
// MISSING LINE 122
// MISSING LINE 123
// MISSING LINE 124
// MISSING LINE 125
                 'Content-Type': 'applica
// MISSING LINE 127
// MISSING LINE 128
// MISSING LINE 129
// MISSING LINE 130
// MISSING LINE 131
// MISSING LINE 132
// MISSING LINE 133
// MISSING LINE 134
// MISSING LINE 135
// MISSING LINE 136
// MISSING LINE 137
// MISSING LINE 138
// MISSING LINE 139
// MISSING LINE 140
// MISSING LINE 141
// MISSING LINE 142
// MISSING LINE 143
// MISSING LINE 144
// MISSING LINE 145
// MISSING LINE 146
// MISSING LINE 147
// MISSING LINE 148
// MISSING LINE 149
// MISSING LINE 150
// MISSING LINE 151
// MISSING LINE 152
// MISSING LINE 153
// MISSING LINE 154
// MISSING LINE 155
// MISSING LINE 156
// MISSING LINE 157
// MISSING LINE 158
// MISSING LINE 159
// MISSING LINE 160
// MISSING LINE 161
// MISSING LINE 162
// MISSING LINE 163
// MISSING LINE 164
// MISSING LINE 165
// MISSING LINE 166
// MISSING LINE 167
// MISSING LINE 168
// MISSING LINE 169
// MISSING LINE 170
// MISSING LINE 171
// MISSING LINE 172
// MISSING LINE 173
// MISSING LINE 174
// MISSING LINE 175
                    else if (el.type === 'corner') drawCorner(tempCtx, el.w, el.h, el.color, isBW);
// MISSING LINE 177
// MISSING LINE 178
// MISSING LINE 179
// MISSING LINE 180
// MISSING LINE 181
// MISSING LINE 182
// MISSING LINE 183
// MISSING LINE 184
// MISSING LINE 185
// MISSING LINE 186
// MISSING LINE 187
// MISSING LINE 188
// MISSING LINE 189
// MISSING LINE 190
// MISSING LINE 191
// MISSING LINE 192
// MISSING LINE 193
// MISSING LINE 194
// MISSING LINE 195
// MISSING LINE 196
// MISSING LINE 197
// MISSING LINE 198
// MISSING LINE 199
// MISSING LINE 200
// MISSING LINE 201
// MISSING LINE 202
// MISSING LINE 203
// MISSING LINE 204
// MISSING LINE 205
// MISSING LINE 206
// MISSING LINE 207
// MISSING LINE 208
// MISSING LINE 209
// MISSING LINE 210
// MISSING LINE 211
// MISSING LINE 212
// MISSING LINE 213
// MISSING LINE 214
// MISSING LINE 215
// MISSING LINE 216
// MISSING LINE 217
// MISSING LINE 218
// MISSING LINE 219
// MISSING LINE 220
// MISSING LINE 221
// MISSING LINE 222
// MISSING LINE 223
// MISSING LINE 224
// MISSING LINE 225
// MISSING LINE 226
// MISSING LINE 227
// MISSING LINE 228
// MISSING LINE 229
// MISSING LINE 230
// MISSING LINE 231
// MISSING LINE 232
// MISSING LINE 233
// MISSING LINE 234
// MISSING LINE 235
// MISSING LINE 236
// MISSING LINE 237
// MISSING LINE 238
// MISSING LINE 239
// MISSING LINE 240
// MISSING LINE 241
// MISSING LINE 242
// MISSING LINE 243
// MISSING LINE 244
// MISSING LINE 245
// MISSING LINE 246
// MISSING LINE 247
// MISSING LINE 248
// MISSING LINE 249
// MISSING LINE 250
// MISSING LINE 251
// MISSING LINE 252
// MISSING LINE 253
// MISSING LINE 254
// MISSING LINE 255
// MISSING LINE 256
// MISSING LINE 257
// MISSING LINE 258
// MISSING LINE 259
// MISSING LINE 260
// MISSING LINE 261
// MISSING LINE 262
// MISSING LINE 263
// MISSING LINE 264
// MISSING LINE 265
// MISSING LINE 266
// MISSING LINE 267
// MISSING LINE 268
// MISSING LINE 269
// MISSING LINE 270
// MISSING LINE 271
// MISSING LINE 272
// MISSING LINE 273
// MISSING LINE 274
// MISSING LINE 275
// MISSING LINE 276
// MISSING LINE 277
// MISSING LINE 278
// MISSING LINE 279
// MISSING LINE 280
// MISSING LINE 281
// MISSING LINE 282
// MISSING LINE 283
// MISSING LINE 284
// MISSING LINE 285
// MISSING LINE 286
// MISSING LINE 287
// MISSING LINE 288
// MISSING LINE 289
// MISSING LINE 290
// MISSING LINE 291
// MISSING LINE 292
// MISSING LINE 293
// MISSING LINE 294
// MISSING LINE 295
// MISSING LINE 296
// MISSING LINE 297
// MISSING LINE 298
// MISSING LINE 299
// MISSING LINE 300
// MISSING LINE 301
// MISSING LINE 302
// MISSING LINE 303
// MISSING LINE 304
// MISSING LINE 305
// MISSING LINE 306
// MISSING LINE 307
// MISSING LINE 308
// MISSING LINE 309
// MISSING LINE 310
// MISSING LINE 311
// MISSING LINE 312
// MISSING LINE 313
// MISSING LINE 314
// MISSING LINE 315
// MISSING LINE 316
// MISSING LINE 317
// MISSING LINE 318
// MISSING LINE 319
// MISSING LINE 320
// MISSING LINE 321
// MISSING LINE 322
// MISSING LINE 323
// MISSING LINE 324
// MISSING LINE 325
// MISSING LINE 326
// MISSING LINE 327
// MISSING LINE 328
// MISSING LINE 329
// MISSING LINE 330
// MISSING LINE 331
// MISSING LINE 332
// MISSING LINE 333
// MISSING LINE 334
// MISSING LINE 335
// MISSING LINE 336
// MISSING LINE 337
// MISSING LINE 338
// MISSING LINE 339
// MISSING LINE 340
// MISSING LINE 341
// MISSING LINE 342
// MISSING LINE 343
// MISSING LINE 344
// MISSING LINE 345
// MISSING LINE 346
// MISSING LINE 347
// MISSING LINE 348
// MISSING LINE 349
// MISSING LINE 350
// MISSING LINE 351
// MISSING LINE 352
// MISSING LINE 353
// MISSING LINE 354
// MISSING LINE 355
// MISSING LINE 356
// MISSING LINE 357
// MISSING LINE 358
// MISSING LINE 359
// MISSING LINE 360
// MISSING LINE 361
// MISSING LINE 362
// MISSING LINE 363
// MISSING LINE 364
// MISSING LINE 365
// MISSING LINE 366
// MISSING LINE 367
// MISSING LINE 368
// MISSING LINE 369
// MISSING LINE 370
// MISSING LINE 371
    const rows = invoice
// MISSING LINE 373
// MISSING LINE 374
// MISSING LINE 375
// MISSING LINE 376
// MISSING LINE 377
// MISSING LINE 378
// MISSING LINE 379
// MISSING LINE 380
// MISSING LINE 381
// MISSING LINE 382
// MISSING LINE 383
// MISSING LINE 384
// MISSING LINE 385
// MISSING LINE 386
          
// MISSING LINE 388
// MISSING LINE 389
// MISSING LINE 390
// MISSING LINE 391
// MISSING LINE 392
// MISSING LINE 393
// MISSING LINE 394
// MISSING LINE 395
// MISSING LINE 396
// MISSING LINE 397
// MISSING LINE 398
// MISSING LINE 399
// MISSING LINE 400
// MISSING LINE 401
// MISSING LINE 402
// MISSING LINE 403
// MISSING LINE 404
// MISSING LINE 405
// MISSING LINE 406
// MISSING LINE 407
// MISSING LINE 408
// MISSING LINE 409
// MISSING LINE 410
// MISSING LINE 411
// MISSING LINE 412
// MISSING LINE 413
// MISSING LINE 414
// MISSING LINE 415
// MISSING LINE 416
// MISSING LINE 417
// MISSING LINE 418
// MISSING LINE 419
// MISSING LINE 420
// MISSING LINE 421
// MISSING LINE 422
// MISSING LINE 423
// MISSING LINE 424
// MISSING LINE 425
// MISSING LINE 426
// MISSING LINE 427
// MISSING LINE 428
// MISSING LINE 429
// MISSING LINE 430
// MISSING LINE 431
// MISSING LINE 432
// MISSING LINE 433
// MISSING LINE 434
// MISSING LINE 435
// MISSING LINE 436
// MISSING LINE 437
// MISSING LINE 438
            btn.disabled = true;
            
            setTimeout(() => {
                if(idField) {
                    // وضع التعديل
                    const index = newsDatabase.findIndex(n => n.id === idField);
                    if(index !== -1) {
                        newsDatabase[index].title = title;
                        newsDatabase[index].image = image;
                        newsDatabase[index].content = content;
                        newsDatabase[index].summary = summary;
                    }
                } else {
                    // وضع الإضافة الجديدة
                    const today = new Date().toISOString().split('T')[0];
                    const newId = Date.now().toString(); // ID فريد
                    newsDatabase.push({ id: newId, title, date: today, summary, content, image });
                }
                
                renderAdminNewsList(); // تحديث الجدول
                
                // تصفير النموذج
                document.getElementById('edit-news-id').value = '';
                document.getElementById('btn-cancel-edit').classList.add('hidden');
                document.getElementById('form-title').innerHTML = '<i class="fa-solid fa-plus-circle text-primary ml-2"></i> نشر خبر جديد';
                btn.innerHTML = '<i class="fa-solid fa-save"></i> <span>حفظ ونشر</span>';
                btn.disabled = false;
                
                success.classList.remove('hidden');
                e.target.reset();
                setTimeout(() => success.classList.add('hidden'), 3000);
            }, 800);
        });
    
// MISSING LINE 473
// MISSING LINE 474
// MISSING LINE 475
// MISSING LINE 476
// MISSING LINE 477
// MISSING LINE 478
// MISSING LINE 479
// MISSING LINE 480
// MISSING LINE 481
// MISSING LINE 482
// MISSING LINE 483
// MISSING LINE 484
// MISSING LINE 485
// MISSING LINE 486
// MISSING LINE 487
// MISSING LINE 488
// MISSING LINE 489
// MISSING LINE 490
// MISSING LINE 491
// MISSING LINE 492
// MISSING LINE 493
// MISSING LINE 494
// MISSING LINE 495
// MISSING LINE 496
// MISSING LINE 497
// MISSING LINE 498
// MISSING LINE 499
// MISSING LINE 500
// MISSING LINE 501
// MISSING LINE 502
// MISSING LINE 503
// MISSING LINE 504
// MISSING LINE 505
// MISSING LINE 506
// MISSING LINE 507
// MISSING LINE 508
// MISSING LINE 509
// MISSING LINE 510
// MISSING LINE 511
// MISSING LINE 512
// MISSING LINE 513
// MISSING LINE 514
// MISSING LINE 515
// MISSING LINE 516
// MISSING LINE 517
                        <td class="px-4 py-3 whitespace-nowrap text-sm ${isTotal ? netProfitClass : 'text-gray-500'} border border-gray-300
// MISSING LINE 519
// MISSING LINE 520
// MISSING LINE 521
// MISSING LINE 522
// MISSING LINE 523
// MISSING LINE 524
// MISSING LINE 525
// MISSING LINE 526
// MISSING LINE 527
// MISSING LINE 528
// MISSING LINE 529
// MISSING LINE 530
// MISSING LINE 531
// MISSING LINE 532
// MISSING LINE 533
// MISSING LINE 534
// MISSING LINE 535
// MISSING LINE 536
// MISSING LINE 537
// MISSING LINE 538
// MISSING LINE 539
// MISSING LINE 540
// MISSING LINE 541
// MISSING LINE 542
// MISSING LINE 543
// MISSING LINE 544
// MISSING LINE 545
// MISSING LINE 546
// MISSING LINE 547
// MISSING LINE 548
// MISSING LINE 549
// MISSING LINE 550
// MISSING LINE 551
// MISSING LINE 552
                                <div><label class="block text-sm font-medium text-gray-700">اسم صاحب النقل</label><input t
            
// MISSING LINE 555
// MISSING LINE 556
// MISSING LINE 557
// MISSING LINE 558
// MISSING LINE 559
// MISSING LINE 560
// MISSING LINE 561
// MISSING LINE 562
// MISSING LINE 563
// MISSING LINE 564
// MISSING LINE 565
// MISSING LINE 566
// MISSING LINE 567
// MISSING LINE 568
// MISSING LINE 569
// MISSING LINE 570
// MISSING LINE 571
// MISSING LINE 572
// MISSING LINE 573
// MISSING LINE 574
// MISSING LINE 575
// MISSING LINE 576
// MISSING LINE 577
// MISSING LINE 578
// MISSING LINE 579
// MISSING LINE 580
// MISSING LINE 581
// MISSING LINE 582
// MISSING LINE 583
// MISSING LINE 584
// MISSING LINE 585
// MISSING LINE 586
// MISSING LINE 587
// MISSING LINE 588
// MISSING LINE 589
// MISSING LINE 590
// MISSING LINE 591
// MISSING LINE 592
// MISSING LINE 593
// MISSING LINE 594
// MISSING LINE 595
// MISSING LINE 596
// MISSING LINE 597
// MISSING LINE 598
// MISSING LINE 599
// MISSING LINE 600
// MISSING LINE 601
// MISSING LINE 602
// MISSING LINE 603
// MISSING LINE 604
// MISSING LINE 605
// MISSING LINE 606
// MISSING LINE 607
// MISSING LINE 608
// MISSING LINE 609
// MISSING LINE 610
// MISSING LINE 611
 
// MISSING LINE 613
// MISSING LINE 614
// MISSING LINE 615
// MISSING LINE 616
// MISSING LINE 617
// MISSING LINE 618
// MISSING LINE 619
// MISSING LINE 620
// MISSING LINE 621
// MISSING LINE 622
// MISSING LINE 623
// MISSING LINE 624
// MISSING LINE 625
// MISSING LINE 626
// MISSING LINE 627
                showView(currentUserRole === 'admin
// MISSING LINE 629
// MISSING LINE 630
// MISSING LINE 631
// MISSING LINE 632
        
// MISSING LINE 634
// MISSING LINE 635
// MISSING LINE 636
// MISSING LINE 637
// MISSING LINE 638
// MISSING LINE 639
// MISSING LINE 640
// MISSING LINE 641
// MISSING LINE 642
// MISSING LINE 643
// MISSING LINE 644
// MISSING LINE 645
// MISSING LINE 646
// MISSING LINE 647
// MISSING LINE 648
// MISSING LINE 649
// MISSING LINE 650
// MISSING LINE 651
// MISSING LINE 652
// MISSING LINE 653
// MISSING LINE 654
// MISSING LINE 655
// MISSING LINE 656
// MISSING LINE 657
// MISSING LINE 658
// MISSING LINE 659
// MISSING LINE 660
// MISSING LINE 661
// MISSING LINE 662
// MISSING LINE 663
// MISSING LINE 664
// MISSING LINE 665
// MISSING LINE 666
// MISSING LINE 667
// MISSING LINE 668
// MISSING LINE 669
// MISSING LINE 670
// MISSING LINE 671
// MISSING LINE 672
// MISSING LINE 673
// MISSING LINE 674
// MISSING LINE 675
// MISSING LINE 676
// MISSING LINE 677
// MISSING LINE 678
// MISSING LINE 679
// MISSING LINE 680
// MISSING LINE 681
// MISSING LINE 682
                     
// MISSING LINE 684
// MISSING LINE 685
// MISSING LINE 686
// MISSING LINE 687
// MISSING LINE 688
// MISSING LINE 689
// MISSING LINE 690
// MISSING LINE 691
// MISSING LINE 692
// MISSING LINE 693
// MISSING LINE 694
// MISSING LINE 695
// MISSING LINE 696
// MISSING LINE 697
// MISSING LINE 698
// MISSING LINE 699
// MISSING LINE 700
// MISSING LINE 701
// MISSING LINE 702
// MISSING LINE 703
// MISSING LINE 704
// MISSING LINE 705
// MISSING LINE 706
// MISSING LINE 707
// MISSING LINE 708
// MISSING LINE 709
// MISSING LINE 710
// MISSING LINE 711
// MISSING LINE 712
// MISSING LINE 713
// MISSING LINE 714
// MISSING LINE 715
// MISSING LINE 716
// MISSING LINE 717
// MISSING LINE 718
// MISSING LINE 719
// MISSING LINE 720
// MISSING LINE 721
// MISSING LINE 722
// MISSING LINE 723
// MISSING LINE 724
// MISSING LINE 725
// MISSING LINE 726
// MISSING LINE 727
// MISSING LINE 728
// MISSING LINE 729
// MISSING LINE 730
// MISSING LINE 731
// MISSING LINE 732
// MISSING LINE 733
// MISSING LINE 734
// MISSING LINE 735
// MISSING LINE 736
// MISSING LINE 737
// MISSING LINE 738
// MISSING LINE 739
// MISSING LINE 740
// MISSING LINE 741
// MISSING LINE 742
// MISSING LINE 743
// MISSING LINE 744
// MISSING LINE 745
// MISSING LINE 746
// MISSING LINE 747
// MISSING LINE 748
// MISSING LINE 749
// MISSING LINE 750
// MISSING LINE 751
// MISSING LINE 752
// MISSING LINE 753
// MISSING LINE 754
// MISSING LINE 755
// MISSING LINE 756
// MISSING LINE 757
// MISSING LINE 758
// MISSING LINE 759
// MISSING LINE 760
// MISSING LINE 761
// MISSING LINE 762
// MISSING LINE 763
// MISSING LINE 764
// MISSING LINE 765
// MISSING LINE 766
// MISSING LINE 767
// MISSING LINE 768
// MISSING LINE 769
// MISSING LINE 770
// MISSING LINE 771
// MISSING LINE 772
// MISSING LINE 773
// MISSING LINE 774
// MISSING LINE 775
// MISSING LINE 776
// MISSING LINE 777
             event
// MISSING LINE 779
// MISSING LINE 780
// MISSING LINE 781
// MISSING LINE 782
// MISSING LINE 783
// MISSING LINE 784
// MISSING LINE 785
// MISSING LINE 786
// MISSING LINE 787
// MISSING LINE 788
// MISSING LINE 789
// MISSING LINE 790
// MISSING LINE 791
// MISSING LINE 792
// MISSING LINE 793
// MISSING LINE 794
// MISSING LINE 795
// MISSING LINE 796
// MISSING LINE 797
// MISSING LINE 798
// MISSING LINE 799
// MISSING LINE 800
// MISSING LINE 801
// MISSING LINE 802
// MISSING LINE 803
// MISSING LINE 804
// MISSING LINE 805
// MISSING LINE 806
// MISSING LINE 807
// MISSING LINE 808
// MISSING LINE 809
// MISSING LINE 810
// MISSING LINE 811
// MISSING LINE 812
// MISSING LINE 813
// MISSING LINE 814
                                    <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">المستحق الشهري<
// MISSING LINE 816
                                <div><label class="block text-sm font-medium text-gr
// MISSING LINE 818
// MISSING LINE 819
// MISSING LINE 820
// MISSING LINE 821
// MISSING LINE 822
             document.querySelectorAll('[id^="mobile-nav-"
                 link.classList.remove('text-amber-500', 'sc
         
// MISSING LINE 826
// MISSING LINE 827
                document
// MISSING LINE 829
// MISSING LINE 830
// MISSING LINE 831
// MISSING LINE 832
// MISSING LINE 833
// MISSING LINE 834
// MISSING LINE 835
// MISSING LINE 836
// MISSING LINE 837
// MISSING LINE 838
// MISSING LINE 839
// MISSING LINE 840
// MISSING LINE 841
// MISSING LINE 842
// MISSING LINE 843
// MISSING LINE 844
// MISSING LINE 845
// MISSING LINE 846
// MISSING LINE 847
// MISSING LINE 848
// MISSING LINE 849
// MISSING LINE 850
// MISSING LINE 851
// MISSING LINE 852
// MISSING LINE 853
// MISSING LINE 854
// MISSING LINE 855
// MISSING LINE 856
// MISSING LINE 857
// MISSING LINE 858
// MISSING LINE 859
// MISSING LINE 860
// MISSING LINE 861
// MISSING LINE 862
// MISSING LINE 863
// MISSING LINE 864
// MISSING LINE 865
// MISSING LINE 866
// MISSING LINE 867
// MISSING LINE 868
// MISSING LINE 869
// MISSING LINE 870
// MISSING LINE 871
// MISSING LINE 872
// MISSING LINE 873
// MISSING LINE 874
// MISSING LINE 875
// MISSING LINE 876
// MISSING LINE 877
            } else if (formType === 'transpo
// MISSING LINE 879
// MISSING LINE 880
// MISSING LINE 881
// MISSING LINE 882
// MISSING LINE 883
// MISSING LINE 884
// MISSING LINE 885
// MISSING LINE 886
// MISSING LINE 887
// MISSING LINE 888
// MISSING LINE 889
// MISSING LINE 890
// MISSING LINE 891
// MISSING LINE 892
// MISSING LINE 893
// MISSING LINE 894
// MISSING LINE 895
// MISSING LINE 896
// MISSING LINE 897
// MISSING LINE 898
// MISSING LINE 899
// MISSING LINE 900
// MISSING LINE 901
// MISSING LINE 902
// MISSING LINE 903
// MISSING LINE 904
// MISSING LINE 905
// MISSING LINE 906
// MISSING LINE 907
// MISSING LINE 908
// MISSING LINE 909
// MISSING LINE 910
// MISSING LINE 911
// MISSING LINE 912
// MISSING LINE 913
// MISSING LINE 914
// MISSING LINE 915
// MISSING LINE 916
// MISSING LINE 917
// MISSING LINE 918
// MISSING LINE 919
// MISSING LINE 920
// MISSING LINE 921
// MISSING LINE 922
// MISSING LINE 923
// MISSING LINE 924
// MISSING LINE 925
// MISSING LINE 926
// MISSING LINE 927
// MISSING LINE 928
// MISSING LINE 929
// MISSING LINE 930
// MISSING LINE 931
                                    <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border b
// MISSING LINE 933
// MISSING LINE 934
// MISSING LINE 935
// MISSING LINE 936
// MISSING LINE 937
// MISSING LINE 938
// MISSING LINE 939
// MISSING LINE 940
// MISSING LINE 941
// MISSING LINE 942
// MISSING LINE 943
// MISSING LINE 944
// MISSING LINE 945
// MISSING LINE 946
// MISSING LINE 947
// MISSING LINE 948
// MISSING LINE 949
// MISSING LINE 950
// MISSING LINE 951
// MISSING LINE 952
// MISSING LINE 953
// MISSING LINE 954
// MISSING LINE 955
// MISSING LINE 956
// MISSING LINE 957
// MISSING LINE 958
// MISSING LINE 959
// MISSING LINE 960
// MISSING LINE 961
// MISSING LINE 962
// MISSING LINE 963
// MISSING LINE 964
// MISSING LINE 965
// MISSING LINE 966
// MISSING LINE 967
// MISSING LINE 968
                const amountClass = isExpense 
// MISSING LINE 970
// MISSING LINE 971
// MISSING LINE 972
// MISSING LINE 973
// MISSING LINE 974
// MISSING LINE 975
// MISSING LINE 976
// MISSING LINE 977
// MISSING LINE 978
// MISSING LINE 979
// MISSING LINE 980
// MISSING LINE 981
// MISSING LINE 982
// MISSING LINE 983
            const tp = allTransportPayments.filter(payMatch).reduce((s, p) => s + parseFlo
// MISSING LINE 985
// MISSING LINE 986
// MISSING LINE 987
// MISSING LINE 988
// MISSING LINE 989
// MISSING LINE 990
// MISSING LINE 991
// MISSING LINE 992
// MISSING LINE 993
// MISSING LINE 994
// MISSING LINE 995
// MISSING LINE 996
// MISSING LINE 997
// MISSING LINE 998
// MISSING LINE 999
// MISSING LINE 1000
// MISSING LINE 1001
// MISSING LINE 1002
// MISSING LINE 1003
// MISSING LINE 1004
// MISSING LINE 1005
// MISSING LINE 1006
// MISSING LINE 1007
// MISSING LINE 1008
// MISSING LINE 1009
// MISSING LINE 1010
// MISSING LINE 1011
// MISSING LINE 1012
// MISSING LINE 1013
// MISSING LINE 1014
// MISSING LINE 1015
// MISSING LINE 1016
// MISSING LINE 1017
// MISSING LINE 1018
// MISSING LINE 1019
// MISSING LINE 1020
// MISSING LINE 1021
// MISSING LINE 1022
// MISSING LINE 1023
// MISSING LINE 1024
// MISSING LINE 1025
// MISSING LINE 1026
// MISSING LINE 1027
// MISSING LINE 1028
// MISSING LINE 1029
// MISSING LINE 1030
// MISSING LINE 1031
// MISSING LINE 1032
// MISSING LINE 1033
// MISSING LINE 1034
// MISSING LINE 1035
// MISSING LINE 1036
// MISSING LINE 1037
// MISSING LINE 1038
// MISSING LINE 1039
// MISSING LINE 1040
// MISSING LINE 1041
// MISSING LINE 1042
// MISSING LINE 1043
// MISSING LINE 1044
// MISSING LINE 1045
// MISSING LINE 1046
// MISSING LINE 1047
// MISSING LINE 1048
// MISSING LINE 1049
// MISSING LINE 1050
// MISSING LINE 1051
// MISSING LINE 1052
// MISSING LINE 1053
// MISSING LINE 1054
// MISSING LINE 1055
// MISSING LINE 1056
// MISSING LINE 1057
// MISSING LINE 1058
// MISSING LINE 1059
// MISSING LINE 1060
// MISSING LINE 1061
// MISSING LINE 1062
// MISSING LINE 1063
// MISSING LINE 1064
// MISSING LINE 1065
// MISSING LINE 1066
// MISSING LINE 1067
// MISSING LINE 1068
// MISSING LINE 1069
// MISSING LINE 1070
// MISSING LINE 1071
// MISSING LINE 1072
// MISSING LINE 1073
// MISSING LINE 1074
// MISSING LINE 1075
// MISSING LINE 1076
// MISSING LINE 1077
// MISSING LINE 1078
// MISSING LINE 1079
// MISSING LINE 1080
// MISSING LINE 1081
// MISSING LINE 1082
// MISSING LINE 1083
// MISSING LINE 1084
// MISSING LINE 1085
// MISSING LINE 1086
// MISSING LINE 1087
// MISSING LINE 1088
// MISSING LINE 1089
// MISSING LINE 1090
// MISSING LINE 1091
// MISSING LINE 1092
// MISSING LINE 1093
// MISSING LINE 1094
// MISSING LINE 1095
// MISSING LINE 1096
// MISSING LINE 1097
// MISSING LINE 1098
// MISSING LINE 1099
// MISSING LINE 1100
// MISSING LINE 1101
// MISSING LINE 1102
// MISSING LINE 1103
// MISSING LINE 1104
// MISSING LINE 1105
// MISSING LINE 1106
// MISSING LINE 1107
// MISSING LINE 1108
// MISSING LINE 1109
// MISSING LINE 1110
// MISSING LINE 1111
// MISSING LINE 1112
// MISSING LINE 1113
// MISSING LINE 1114
// MISSING LINE 1115
// MISSING LINE 1116
// MISSING LINE 1117
// MISSING LINE 1118
// MISSING LINE 1119
                                <div class="flex justify-between p-1 border-b"><span>المبلغ المدفوع:</span> <span id
// MISSING LINE 1121
// MISSING LINE 1122
// MISSING LINE 1123
// MISSING LINE 1124
// MISSING LINE 1125
// MISSING LINE 1126
// MISSING LINE 1127
// MISSING LINE 1128
// MISSING LINE 1129
// MISSING LINE 1130
// MISSING LINE 1131
// MISSING LINE 1132
// MISSING LINE 1133
// MISSING LINE 1134
// MISSING LINE 1135
// MISSING LINE 1136
// MISSING LINE 1137
// MISSING LINE 1138
// MISSING LINE 1139
             document.getElementById('invoice-form-title').textContent = `تعد
// MISSING LINE 1141
// MISSING LINE 1142
// MISSING LINE 1143
// MISSING LINE 1144
// MISSING LINE 1145
// MISSING LINE 1146
// MISSING LINE 1147
// MISSING LINE 1148
// MISSING LINE 1149
// MISSING LINE 1150
// MISSING LINE 1151
// MISSING LINE 1152
// MISSING LINE 1153
// MISSING LINE 1154
// MISSING LINE 1155
// MISSING LINE 1156
// MISSING LINE 1157
// MISSING LINE 1158
// MISSING LINE 1159
// MISSING LINE 1160
// MISSING LINE 1161
// MISSING LINE 1162
// MISSING LINE 1163
// MISSING LINE 1164
// MISSING LINE 1165
// MISSING LINE 1166
// MISSING LINE 1167
// MISSING LINE 1168
// MISSING LINE 1169
// MISSING LINE 1170
// MISSING LINE 1171
// MISSING LINE 1172
// MISSING LINE 1173
// MISSING LINE 1174
// MISSING LINE 1175
// MISSING LINE 1176
// MISSING LINE 1177
// MISSING LINE 1178
// MISSING LINE 1179
// MISSING LINE 1180
// MISSING LINE 1181
// MISSING LINE 1182
// MISSING LINE 1183
// MISSING LINE 1184
// MISSING LINE 1185
// MISSING LINE 1186
// MISSING LINE 1187
// MISSING LINE 1188
// MISSING LINE 1189
// MISSING LINE 1190
// MISSING LINE 1191
// MISSING LINE 1192
// MISSING LINE 1193
// MISSING LINE 1194
// MISSING LINE 1195
// MISSING LINE 1196
// MISSING LINE 1197
// MISSING LINE 1198
// MISSING LINE 1199
// MISSING LINE 1200
// MISSING LINE 1201
// MISSING LINE 1202
// MISSING LINE 1203
// MISSING LINE 1204
// MISSING LINE 1205
// MISSING LINE 1206
// MISSING LINE 1207
// MISSING LINE 1208
// MISSING LINE 1209
// MISSING LINE 1210
// MISSING LINE 1211
// MISSING LINE 1212
// MISSING LINE 1213
// MISSING LINE 1214
// MISSING LINE 1215
// MISSING LINE 1216
// MISSING LINE 1217
// MISSING LINE 1218
// MISSING LINE 1219
// MISSING LINE 1220
// MISSING LINE 1221
// MISSING LINE 1222
// MISSING LINE 1223
// MISSING LINE 1224
// MISSING LINE 1225
// MISSING LINE 1226
// MISSING LINE 1227
// MISSING LINE 1228
// MISSING LINE 1229
// MISSING LINE 1230
// MISSING LINE 1231
// MISSING LINE 1232
// MISSING LINE 1233
// MISSING LINE 1234
// MISSING LINE 1235
// MISSING LINE 1236
// MISSING LINE 1237
// MISSING LINE 1238
// MISSING LINE 1239
// MISSING LINE 1240
// MISSING LINE 1241
// MISSING LINE 1242
// MISSING LINE 1243
// MISSING LINE 1244
// MISSING LINE 1245
// MISSING LINE 1246
// MISSING LINE 1247
// MISSING LINE 1248
// MISSING LINE 1249
// MISSING LINE 1250
// MISSING LINE 1251
// MISSING LINE 1252
// MISSING LINE 1253
// MISSING LINE 1254
// MISSING LINE 1255
// MISSING LINE 1256
// MISSING LINE 1257
// MISSING LINE 1258
// MISSING LINE 1259
// MISSING LINE 1260
// MISSING LINE 1261
// MISSING LINE 1262
// MISSING LINE 1263
// MISSING LINE 1264
// MISSING LINE 1265
// MISSING LINE 1266
// MISSING LINE 1267
// MISSING LINE 1268
// MISSING LINE 1269
// MISSING LINE 1270
// MISSING LINE 1271
// MISSING LINE 1272
            // 1. تحديث الفاتو
// MISSING LINE 1274
// MISSING LINE 1275
// MISSING LINE 1276
// MISSING LINE 1277
// MISSING LINE 1278
// MISSING LINE 1279
// MISSING LINE 1280
// MISSING LINE 1281
// MISSING LINE 1282
// MISSING LINE 1283
// MISSING LINE 1284
// MISSING LINE 1285
// MISSING LINE 1286
// MISSING LINE 1287
// MISSING LINE 1288
// MISSING LINE 1289
// MISSING LINE 1290
// MISSING LINE 1291
// MISSING LINE 1292
// MISSING LINE 1293
// MISSING LINE 1294
// MISSING LINE 1295
// MISSING LINE 1296
// MISSING LINE 1297
// MISSING LINE 1298
// MISSING LINE 1299
// MISSING LINE 1300
// MISSING LINE 1301
// MISSING LINE 1302
// MISSING LINE 1303
// MISSING LINE 1304
// MISSING LINE 1305
// MISSING LINE 1306
// MISSING LINE 1307
// MISSING LINE 1308
// MISSING LINE 1309
// MISSING LINE 1310
// MISSING LINE 1311
// MISSING LINE 1312
// MISSING LINE 1313
// MISSING LINE 1314
// MISSING LINE 1315
// MISSING LINE 1316
// MISSING LINE 1317
// MISSING LINE 1318
// MISSING LINE 1319
// MISSING LINE 1320
// MISSING LINE 1321
// MISSING LINE 1322
// MISSING LINE 1323
// MISSING LINE 1324
// MISSING LINE 1325
// MISSING LINE 1326
// MISSING LINE 1327
// MISSING LINE 1328
// MISSING LINE 1329
// MISSING LINE 1330
// MISSING LINE 1331
// MISSING LINE 1332
// MISSING LINE 1333
            document.get
// MISSING LINE 1335
// MISSING LINE 1336
// MISSING LINE 1337
// MISSING LINE 1338
// MISSING LINE 1339
// MISSING LINE 1340
// MISSING LINE 1341
// MISSING LINE 1342
// MISSING LINE 1343
// MISSING LINE 1344
// MISSING LINE 1345
                    <td class="p-2 border border-black text-center"
// MISSING LINE 1347
// MISSING LINE 1348
// MISSING LINE 1349
             const tbody = document.getElementById('invoice-payments-t
// MISSING LINE 1351
// MISSING LINE 1352
// MISSING LINE 1353
// MISSING LINE 1354
// MISSING LINE 1355
// MISSING LINE 1356
// MISSING LINE 1357
// MISSING LINE 1358
// MISSING LINE 1359
// MISSING LINE 1360
// MISSING LINE 1361
// MISSING LINE 1362
// MISSING LINE 1363
// MISSING LINE 1364
// MISSING LINE 1365
// MISSING LINE 1366
// MISSING LINE 1367
// MISSING LINE 1368
// MISSING LINE 1369
// MISSING LINE 1370
// MISSING LINE 1371
// MISSING LINE 1372
// MISSING LINE 1373
// MISSING LINE 1374
// MISSING LINE 1375
// MISSING LINE 1376
// MISSING LINE 1377
// MISSING LINE 1378
// MISSING LINE 1379
// MISSING LINE 1380
            // فرض العرض القياسي A4 المكتبي (800 بكسل) وحشوة م
// MISSING LINE 1382
// MISSING LINE 1383
// MISSING LINE 1384
// MISSING LINE 1385
// MISSING LINE 1386
// MISSING LINE 1387
// MISSING LINE 1388
// MISSING LINE 1389
// MISSING LINE 1390
// MISSING LINE 1391
// MISSING LINE 1392
// MISSING LINE 1393
// MISSING LINE 1394
// MISSING LINE 1395
// MISSING LINE 1396
// MISSING LINE 1397
// MISSING LINE 1398
// MISSING LINE 1399
// MISSING LINE 1400
// MISSING LINE 1401
// MISSING LINE 1402
// MISSING LINE 1403
// MISSING LINE 1404
// MISSING LINE 1405
// MISSING LINE 1406
// MISSING LINE 1407
// MISSING LINE 1408
// MISSING LINE 1409
// MISSING LINE 1410
// MISSING LINE 1411
// MISSING LINE 1412
// MISSING LINE 1413
// MISSING LINE 1414
// MISSING LINE 1415
// MISSING LINE 1416
// MISSING LINE 1417
// MISSING LINE 1418
// MISSING LINE 1419
// MISSING LINE 1420
// MISSING LINE 1421
// MISSING LINE 1422
// MISSING LINE 1423
// MISSING LINE 1424
// MISSING LINE 1425
// MISSING LINE 1426
// MISSING LINE 1427
// MISSING LINE 1428
// MISSING LINE 1429
// MISSING LINE 1430
// MISSING LINE 1431
// MISSING LINE 1432
// MISSING LINE 1433
// MISSING LINE 1434
// MISSING LINE 1435
// MISSING LINE 1436
// MISSING LINE 1437
// MISSING LINE 1438
// MISSING LINE 1439
// MISSING LINE 1440
// MISSING LINE 1441
// MISSING LINE 1442
// MISSING LINE 1443
// MISSING LINE 1444
// MISSING LINE 1445
// MISSING LINE 1446
// MISSING LINE 1447
// MISSING LINE 1448
// MISSING LINE 1449
// MISSING LINE 1450
// MISSING LINE 1451
// MISSING LINE 1452
// MISSING LINE 1453
// MISSING LINE 1454
// MISSING LINE 1455
// MISSING LINE 1456
// MISSING LINE 1457
// MISSING LINE 1458
// MISSING LINE 1459
// MISSING LINE 1460
// MISSING LINE 1461
// MISSING LINE 1462
// MISSING LINE 1463
// MISSING LINE 1464
// MISSING LINE 1465
// MISSING LINE 1466
// MISSING LINE 1467
// MISSING LINE 1468
// MISSING LINE 1469
// MISSING LINE 1470
// MISSING LINE 1471
// MISSING LINE 1472
// MISSING LINE 1473
// MISSING LINE 1474
// MISSING LINE 1475
// MISSING LINE 1476
// MISSING LINE 1477
// MISSING LINE 1478
// MISSING LINE 1479
// MISSING LINE 1480
// MISSING LINE 1481
// MISSING LINE 1482
// MISSING LINE 1483
// MISSING LINE 1484
// MISSING LINE 1485
// MISSING LINE 1486
// MISSING LINE 1487
// MISSING LINE 1488
// MISSING LINE 1489
// MISSING LINE 1490
// MISSING LINE 1491
// MISSING LINE 1492
// MISSING LINE 1493
// MISSING LINE 1494
// MISSING LINE 1495
// MISSING LINE 1496
// MISSING LINE 1497
// MISSING LINE 1498
// MISSING LINE 1499
// MISSING LINE 1500
                 tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500 border border-gray-300">لا يوجد عمال 
// MISSING LINE 1502
// MISSING LINE 1503
// MISSING LINE 1504
// MISSING LINE 1505
// MISSING LINE 1506
// MISSING LINE 1507
// MISSING LINE 1508
// MISSING LINE 1509
// MISSING LINE 1510
// MISSING LINE 1511
// MISSING LINE 1512
// MISSING LINE 1513
// MISSING LINE 1514
// MISSING LINE 1515
// MISSING LINE 1516
// MISSING LINE 1517
// MISSING LINE 1518
// MISSING LINE 1519
// MISSING LINE 1520
// MISSING LINE 1521
                const buttonClass = buttonDisabled ? 'bg-gray-400 text-
// MISSING LINE 1523
// MISSING LINE 1524
// MISSING LINE 1525
// MISSING LINE 1526
// MISSING LINE 1527
// MISSING LINE 1528
// MISSING LINE 1529
// MISSING LINE 1530
// MISSING LINE 1531
// MISSING LINE 1532
// MISSING LINE 1533
// MISSING LINE 1534
// MISSING LINE 1535
// MISSING LINE 1536
// MISSING LINE 1537
// MISSING LINE 1538
// MISSING LINE 1539
// MISSING LINE 1540
// MISSING LINE 1541
// MISSING LINE 1542
// MISSING LINE 1543
// MISSING LINE 1544
// MISSING LINE 1545
// MISSING LINE 1546
// MISSING LINE 1547
// MISSING LINE 1548
// MISSING LINE 1549
// MISSING LINE 1550
// MISSING LINE 1551
// MISSING LINE 1552
// MISSING LINE 1553
// MISSING LINE 1554
// MISSING LINE 1555
             document.getElementById('worker-form-title').textContent = `تعديل
             document.getElementById('worker-form-title').textContent = `تعديل بيانات العامل: ${
// MISSING LINE 1558
// MISSING LINE 1559
// MISSING LINE 1560
// MISSING LINE 1561
// MISSING LINE 1562
                WorkerID: docum
// MISSING LINE 1564
// MISSING LINE 1565
// MISSING LINE 1566
// MISSING LINE 1567
// MISSING LINE 1568
// MISSING LINE 1569
// MISSING LINE 1570
// MISSING LINE 1571
// MISSING LINE 1572
// MISSING LINE 1573
// MISSING LINE 1574
// MISSING LINE 1575
// MISSING LINE 1576
// MISSING LINE 1577
// MISSING LINE 1578
// MISSING LINE 1579
// MISSING LINE 1580
// MISSING LINE 1581
// MISSING LINE 1582
// MISSING LINE 1583
// MISSING LINE 1584
            const submitButton = document.getElementById('w
// MISSING LINE 1586
// MISSING LINE 1587
// MISSING LINE 1588
// MISSING LINE 1589
// MISSING LINE 1590
// MISSING LINE 1591
// MISSING LINE 1592
// MISSING LINE 1593
// MISSING LINE 1594
// MISSING LINE 1595
// MISSING LINE 1596
// MISSING LINE 1597
// MISSING LINE 1598
// MISSING LINE 1599
// MISSING LINE 1600
// MISSING LINE 1601
// MISSING LINE 1602
// MISSING LINE 1603
// MISSING LINE 1604
// MISSING LINE 1605
// MISSING LINE 1606
// MISSING LINE 1607
// MISSING LINE 1608
// MISSING LINE 1609
// MISSING LINE 1610
// MISSING LINE 1611
// MISSING LINE 1612
// MISSING LINE 1613
// MISSING LINE 1614
// MISSING LINE 1615
// MISSING LINE 1616
// MISSING LINE 1617
                const isEdit = origi
// MISSING LINE 1619
             
// MISSING LINE 1621
// MISSING LINE 1622
// MISSING LINE 1623
// MISSING LINE 1624
// MISSING LINE 1625
// MISSING LINE 1626
                            hideForm('worke
// MISSING LINE 1628
// MISSING LINE 1629
// MISSING LINE 1630
// MISSING LINE 1631
// MISSING LINE 1632
// MISSING LINE 1633
// MISSING LINE 1634
// MISSING LINE 1635
// MISSING LINE 1636
// MISSING LINE 1637
// MISSING LINE 1638
// MISSING LINE 1639
// MISSING LINE 1640
// MISSING LINE 1641
// MISSING LINE 1642
// MISSING LINE 1643
// MISSING LINE 1644
// MISSING LINE 1645
// MISSING LINE 1646
// MISSING LINE 1647
// MISSING LINE 1648
// MISSING LINE 1649
// MISSING LINE 1650
// MISSING LINE 1651
// MISSING LINE 1652
// MISSING LINE 1653
// MISSING LINE 1654
// MISSING LINE 1655
// MISSING LINE 1656
// MISSING LINE 1657
// MISSING LINE 1658
// MISSING LINE 1659
// MISSING LINE 1660
// MISSING LINE 1661
// MISSING LINE 1662
// MISSING LINE 1663
// MISSING LINE 1664
// MISSING LINE 1665
// MISSING LINE 1666
// MISSING LINE 1667
// MISSING LINE 1668
// MISSING LINE 1669
// MISSING LINE 1670
// MISSING LINE 1671
// MISSING LINE 1672
// MISSING LINE 1673
// MISSING LINE 1674
// MISSING LINE 1675
// MISSING LINE 1676
// MISSING LINE 1677
// MISSING LINE 1678
// MISSING LINE 1679
// MISSING LINE 1680
// MISSING LINE 1681
// MISSING LINE 1682
// MISSING LINE 1683
// MISSING LINE 1684
// MISSING LINE 1685
// MISSING LINE 1686
// MISSING LINE 1687
// MISSING LINE 1688
// MISSING LINE 1689
// MISSING LINE 1690
// MISSING LINE 1691
// MISSING LINE 1692
// MISSING LINE 1693
// MISSING LINE 1694
// MISSING LINE 1695
// MISSING LINE 1696
// MISSING LINE 1697
// MISSING LINE 1698
// MISSING LINE 1699
// MISSING LINE 1700
// MISSING LINE 1701
// MISSING LINE 1702
// MISSING LINE 1703
// MISSING LINE 1704
// MISSING LINE 1705
// MISSING LINE 1706
// MISSING LINE 1707
// MISSING LINE 1708
// MISSING LINE 1709
// MISSING LINE 1710
// MISSING LINE 1711
// MISSING LINE 1712
// MISSING LINE 1713
// MISSING LINE 1714
// MISSING LINE 1715
// MISSING LINE 1716
// MISSING LINE 1717
// MISSING LINE 1718
// MISSING LINE 1719
// MISSING LINE 1720
// MISSING LINE 1721
// MISSING LINE 1722
// MISSING LINE 1723
// MISSING LINE 1724
// MISSING LINE 1725
// MISSING LINE 1726
// MISSING LINE 1727
// MISSING LINE 1728
// MISSING LINE 1729
// MISSING LINE 1730
// MISSING LINE 1731
// MISSING LINE 1732
// MISSING LINE 1733
// MISSING LINE 1734
// MISSING LINE 1735
// MISSING LINE 1736
// MISSING LINE 1737
// MISSING LINE 1738
// MISSING LINE 1739
// MISSING LINE 1740
// MISSING LINE 1741
// MISSING LINE 1742
// MISSING LINE 1743
// MISSING LINE 1744
// MISSING LINE 1745
// MISSING LINE 1746
// MISSING LINE 1747
// MISSING LINE 1748
// MISSING LINE 1749
// MISSING LINE 1750
// MISSING LINE 1751
// MISSING LINE 1752
// MISSING LINE 1753
// MISSING LINE 1754
// MISSING LINE 1755
// MISSING LINE 1756
// MISSING LINE 1757
// MISSING LINE 1758
// MISSING LINE 1759
// MISSING LINE 1760
// MISSING LINE 1761
// MISSING LINE 1762
// MISSING LINE 1763
// MISSING LINE 1764
// MISSING LINE 1765
// MISSING LINE 1766
// MISSING LINE 1767
// MISSING LINE 1768
// MISSING LINE 1769
// MISSING LINE 1770
// MISSING LINE 1771
// MISSING LINE 1772
// MISSING LINE 1773
// MISSING LINE 1774
// MISSING LINE 1775
// MISSING LINE 1776
// MISSING LINE 1777
// MISSING LINE 1778
// MISSING LINE 1779
// MISSING LINE 1780
// MISSING LINE 1781
// MISSING LINE 1782
// MISSING LINE 1783
// MISSING LINE 1784
// MISSING LINE 1785
// MISSING LINE 1786
// MISSING LINE 1787
// MISSING LINE 1788
// MISSING LINE 1789
// MISSING LINE 1790
// MISSING LINE 1791
// MISSING LINE 1792
// MISSING LINE 1793
// MISSING LINE 1794
// MISSING LINE 1795
// MISSING LINE 1796
// MISSING LINE 1797
// MISSING LINE 1798
// MISSING LINE 1799
// MISSING LINE 1800
// MISSING LINE 1801
// MISSING LINE 1802
// MISSING LINE 1803
// MISSING LINE 1804
// MISSING LINE 1805
// MISSING LINE 1806
// MISSING LINE 1807
// MISSING LINE 1808
// MISSING LINE 1809
// MISSING LINE 1810
// MISSING LINE 1811
// MISSING LINE 1812
// MISSING LINE 1813
// MISSING LINE 1814
// MISSING LINE 1815
// MISSING LINE 1816
// MISSING LINE 1817
// MISSING LINE 1818
// MISSING LINE 1819
// MISSING LINE 1820
// MISSING LINE 1821
// MISSING LINE 1822
// MISSING LINE 1823
// MISSING LINE 1824
// MISSING LINE 1825
// MISSING LINE 1826
// MISSING LINE 1827
// MISSING LINE 1828
// MISSING LINE 1829
// MISSING LINE 1830
// MISSING LINE 1831
// MISSING LINE 1832
// MISSING LINE 1833
// MISSING LINE 1834
// MISSING LINE 1835
// MISSING LINE 1836
// MISSING LINE 1837
// MISSING LINE 1838
// MISSING LINE 1839
// MISSING LINE 1840
// MISSING LINE 1841
// MISSING LINE 1842
// MISSING LINE 1843
// MISSING LINE 1844
// MISSING LINE 1845
// MISSING LINE 1846
// MISSING LINE 1847
// MISSING LINE 1848
// MISSING LINE 1849
// MISSING LINE 1850
// MISSING LINE 1851
// MISSING LINE 1852
// MISSING LINE 1853
// MISSING LINE 1854
// MISSING LINE 1855
// MISSING LINE 1856
        function renderT
// MISSING LINE 1858
// MISSING LINE 1859
// MISSING LINE 1860
// MISSING LINE 1861
// MISSING LINE 1862
// MISSING LINE 1863
// MISSING LINE 1864
// MISSING LINE 1865
// MISSING LINE 1866
// MISSING LINE 1867
// MISSING LINE 1868
// MISSING LINE 1869
// MISSING LINE 1870
// MISSING LINE 1871
// MISSING LINE 1872
// MISSING LINE 1873
// MISSING LINE 1874
// MISSING LINE 1875
// MISSING LINE 1876
// MISSING LINE 1877
// MISSING LINE 1878
// MISSING LINE 1879
// MISSING LINE 1880
// MISSING LINE 1881
// MISSING LINE 1882
// MISSING LINE 1883
// MISSING LINE 1884
// MISSING LINE 1885
// MISSING LINE 1886
// MISSING LINE 1887
// MISSING LINE 1888
// MISSING LINE 1889
// MISSING LINE 1890
// MISSING LINE 1891
// MISSING LINE 1892
// MISSING LINE 1893
// MISSING LINE 1894
// MISSING LINE 1895
// MISSING LINE 1896
// MISSING LINE 1897
// MISSING LINE 1898
// MISSING LINE 1899
// MISSING LINE 1900
// MISSING LINE 1901
// MISSING LINE 1902
// MISSING LINE 1903
// MISSING LINE 1904
// MISSING LINE 1905
// MISSING LINE 1906
// MISSING LINE 1907
// MISSING LINE 1908
// MISSING LINE 1909
// MISSING LINE 1910
// MISSING LINE 1911
// MISSING LINE 1912
// MISSING LINE 1913
// MISSING LINE 1914
// MISSING LINE 1915
// MISSING LINE 1916
// MISSING LINE 1917
// MISSING LINE 1918
// MISSING LINE 1919
// MISSING LINE 1920
// MISSING LINE 1921
// MISSING LINE 1922
// MISSING LINE 1923
// MISSING LINE 1924
// MISSING LINE 1925
// MISSING LINE 1926
// MISSING LINE 1927
// MISSING LINE 1928
// MISSING LINE 1929
// MISSING LINE 1930
// MISSING LINE 1931
// MISSING LINE 1932
// MISSING LINE 1933
// MISSING LINE 1934
// MISSING LINE 1935
// MISSING LINE 1936
// MISSING LINE 1937
// MISSING LINE 1938
// MISSING LINE 1939
// MISSING LINE 1940
// MISSING LINE 1941
// MISSING LINE 1942
// MISSING LINE 1943
// MISSING LINE 1944
// MISSING LINE 1945
// MISSING LINE 1946
// MISSING LINE 1947
// MISSING LINE 1948
// MISSING LINE 1949
// MISSING LINE 1950
// MISSING LINE 1951
// MISSING LINE 1952
// MISSING LINE 1953
// MISSING LINE 1954
// MISSING LINE 1955
// MISSING LINE 1956
// MISSING LINE 1957
// MISSING LINE 1958
// MISSING LINE 1959
// MISSING LINE 1960
// MISSING LINE 1961
// MISSING LINE 1962
// MISSING LINE 1963
// MISSING LINE 1964
// MISSING LINE 1965
// MISSING LINE 1966
// MISSING LINE 1967
// MISSING LINE 1968
// MISSING LINE 1969
// MISSING LINE 1970
// MISSING LINE 1971
// MISSING LINE 1972
// MISSING LINE 1973
// MISSING LINE 1974
// MISSING LINE 1975
// MISSING LINE 1976
// MISSING LINE 1977
// MISSING LINE 1978
// MISSING LINE 1979
// MISSING LINE 1980
// MISSING LINE 1981
// MISSING LINE 1982
// MISSING LINE 1983
// MISSING LINE 1984
// MISSING LINE 1985
// MISSING LINE 1986
// MISSING LINE 1987
// MISSING LINE 1988
// MISSING LINE 1989
// MISSING LINE 1990
// MISSING LINE 1991
// MISSING LINE 1992
// MISSING LINE 1993
// MISSING LINE 1994
// MISSING LINE 1995
// MISSING LINE 1996
// MISSING LINE 1997
// MISSING LINE 1998
// MISSING LINE 1999
// MISSING LINE 2000
// MISSING LINE 2001
// MISSING LINE 2002
// MISSING LINE 2003
// MISSING LINE 2004
// MISSING LINE 2005
// MISSING LINE 2006
// MISSING LINE 2007
// MISSING LINE 2008
// MISSING LINE 2009
// MISSING LINE 2010
// MISSING LINE 2011
// MISSING LINE 2012
// MISSING LINE 2013
// MISSING LINE 2014
// MISSING LINE 2015
// MISSING LINE 2016
// MISSING LINE 2017
// MISSING LINE 2018
// MISSING LINE 2019
            const rows = shops.map(s
// MISSING LINE 2021
// MISSING LINE 2022
// MISSING LINE 2023
// MISSING LINE 2024
// MISSING LINE 2025
// MISSING LINE 2026
// MISSING LINE 2027
// MISSING LINE 2028
// MISSING LINE 2029
// MISSING LINE 2030
// MISSING LINE 2031
// MISSING LINE 2032
// MISSING LINE 2033
// MISSING LINE 2034
// MISSING LINE 2035
// MISSING LINE 2036
// MISSING LINE 2037
// MISSING LINE 2038
// MISSING LINE 2039
// MISSING LINE 2040
// MISSING LINE 2041
// MISSING LINE 2042
// MISSING LINE 2043
// MISSING LINE 2044
// MISSING LINE 2045
// MISSING LINE 2046
// MISSING LINE 2047
// MISSING LINE 2048
// MISSING LINE 2049
// MISSING LINE 2050
// MISSING LINE 2051
// MISSING LINE 2052
// MISSING LINE 2053
// MISSING LINE 2054
// MISSING LINE 2055
// MISSING LINE 2056
// MISSING LINE 2057
// MISSING LINE 2058
// MISSING LINE 2059
// MISSING LINE 2060
// MISSING LINE 2061
// MISSING LINE 2062
// MISSING LINE 2063
// MISSING LINE 2064
// MISSING LINE 2065
// MISSING LINE 2066
                            <button onclick="editShop
// MISSING LINE 2068
// MISSING LINE 2069
// MISSING LINE 2070
// MISSING LINE 2071
// MISSING LINE 2072
                            ${user.role === 
// MISSING LINE 2074
// MISSING LINE 2075
// MISSING LINE 2076
// MISSING LINE 2077
// MISSING LINE 2078
// MISSING LINE 2079
// MISSING LINE 2080
// MISSING LINE 2081
// MISSING LINE 2082
// MISSING LINE 2083
// MISSING LINE 2084
// MISSING LINE 2085
// MISSING LINE 2086
// MISSING LINE 2087
// MISSING LINE 2088
// MISSING LINE 2089
// MISSING LINE 2090
// MISSING LINE 2091
// MISSING LINE 2092
// MISSING LINE 2093
// MISSING LINE 2094
// MISSING LINE 2095
// MISSING LINE 2096
// MISSING LINE 2097
// MISSING LINE 2098
// MISSING LINE 2099
// MISSING LINE 2100
// MISSING LINE 2101
// MISSING LINE 2102
// MISSING LINE 2103
// MISSING LINE 2104
// MISSING LINE 2105
// MISSING LINE 2106
// MISSING LINE 2107
// MISSING LINE 2108
// MISSING LINE 2109
// MISSING LINE 2110
// MISSING LINE 2111
// MISSING LINE 2112
// MISSING LINE 2113
// MISSING LINE 2114
// MISSING LINE 2115
// MISSING LINE 2116
// MISSING LINE 2117
// MISSING LINE 2118
// MISSING LINE 2119
// MISSING LINE 2120
// MISSING LINE 2121
// MISSING LINE 2122
// MISSING LINE 2123
// MISSING LINE 2124
// MISSING LINE 2125
// MISSING LINE 2126
// MISSING LINE 2127
// MISSING LINE 2128
// MISSING LINE 2129
// MISSING LINE 2130
// MISSING LINE 2131
// MISSING LINE 2132
// MISSING LINE 2133
// MISSING LINE 2134
// MISSING LINE 2135
// MISSING LINE 2136
// MISSING LINE 2137
// MISSING LINE 2138
// MISSING LINE 2139
// MISSING LINE 2140
// MISSING LINE 2141
// MISSING LINE 2142
// MISSING LINE 2143
// MISSING LINE 2144
// MISSING LINE 2145
// MISSING LINE 2146
// MISSING LINE 2147
// MISSING LINE 2148
// MISSING LINE 2149
// MISSING LINE 2150
// MISSING LINE 2151
// MISSING LINE 2152
// MISSING LINE 2153
// MISSING LINE 2154
// MISSING LINE 2155
// MISSING LINE 2156
// MISSING LINE 2157
// MISSING LINE 2158
// MISSING LINE 2159
// MISSING LINE 2160
// MISSING LINE 2161
// MISSING LINE 2162
// MISSING LINE 2163
// MISSING LINE 2164
// MISSING LINE 2165
// MISSING LINE 2166
// MISSING LINE 2167
// MISSING LINE 2168
// MISSING LINE 2169
// MISSING LINE 2170
// MISSING LINE 2171
// MISSING LINE 2172
// MISSING LINE 2173
// MISSING LINE 2174
// MISSING LINE 2175
// MISSING LINE 2176
// MISSING LINE 2177
// MISSING LINE 2178
// MISSING LINE 2179
// MISSING LINE 2180
// MISSING LINE 2181
// MISSING LINE 2182
// MISSING LINE 2183
// MISSING LINE 2184
// MISSING LINE 2185
// MISSING LINE 2186
// MISSING LINE 2187
// MISSING LINE 2188
// MISSING LINE 2189
// MISSING LINE 2190
// MISSING LINE 2191
// MISSING LINE 2192
// MISSING LINE 2193
// MISSING LINE 2194
// MISSING LINE 2195
// MISSING LINE 2196
// MISSING LINE 2197
// MISSING LINE 2198
// MISSING LINE 2199
// MISSING LINE 2200
// MISSING LINE 2201
// MISSING LINE 2202
// MISSING LINE 2203
// MISSING LINE 2204
// MISSING LINE 2205
// MISSING LINE 2206
// MISSING LINE 2207
// MISSING LINE 2208
// MISSING LINE 2209
// MISSING LINE 2210
// MISSING LINE 2211
// MISSING LINE 2212
// MISSING LINE 2213
// MISSING LINE 2214
// MISSING LINE 2215
// MISSING LINE 2216
// MISSING LINE 2217
// MISSING LINE 2218
// MISSING LINE 2219
// MISSING LINE 2220
// MISSING LINE 2221
// MISSING LINE 2222
// MISSING LINE 2223
// MISSING LINE 2224
                removeFromLocalAndSync(Storag
// MISSING LINE 2226
            renderElectricityTable(filter
// MISSING LINE 2228
// MISSING LINE 2229
// MISSING LINE 2230
// MISSING LINE 2231
// MISSING LINE 2232
// MISSING LINE 2233
// MISSING LINE 2234
// MISSING LINE 2235
// MISSING LINE 2236
// MISSING LINE 2237
// MISSING LINE 2238
// MISSING LINE 2239
// MISSING LINE 2240
// MISSING LINE 2241
// MISSING LINE 2242
// MISSING LINE 2243
// MISSING LINE 2244
// MISSING LINE 2245
// MISSING LINE 2246
// MISSING LINE 2247
// MISSING LINE 2248
// MISSING LINE 2249
// MISSING LINE 2250
// MISSING LINE 2251
// MISSING LINE 2252
// MISSING LINE 2253
// MISSING LINE 2254
// MISSING LINE 2255
// MISSING LINE 2256
// MISSING LINE 2257
// MISSING LINE 2258
// MISSING LINE 2259
// MISSING LINE 2260
// MISSING LINE 2261
// MISSING LINE 2262
// MISSING LINE 2263
// MISSING LINE 2264
// MISSING LINE 2265
// MISSING LINE 2266
// MISSING LINE 2267
// MISSING LINE 2268
// MISSING LINE 2269
// MISSING LINE 2270
// MISSING LINE 2271
// MISSING LINE 2272
// MISSING LINE 2273
// MISSING LINE 2274
// MISSING LINE 2275
// MISSING LINE 2276
// MISSING LINE 2277
// MISSING LINE 2278
// MISSING LINE 2279
// MISSING LINE 2280
// MISSING LINE 2281
// MISSING LINE 2282
// MISSING LINE 2283
// MISSING LINE 2284
// MISSING LINE 2285
// MISSING LINE 2286
// MISSING LINE 2287
// MISSING LINE 2288
// MISSING LINE 2289
// MISSING LINE 2290
// MISSING LINE 2291
// MISSING LINE 2292
// MISSING LINE 2293
// MISSING LINE 2294
// MISSING LINE 2295
// MISSING LINE 2296
// MISSING LINE 2297
// MISSING LINE 2298
// MISSING LINE 2299
// MISSING LINE 2300
// MISSING LINE 2301
// MISSING LINE 2302
// MISSING LINE 2303
// MISSING LINE 2304
// MISSING LINE 2305
// MISSING LINE 2306
// MISSING LINE 2307
// MISSING LINE 2308
// MISSING LINE 2309
// MISSING LINE 2310
// MISSING LINE 2311
// MISSING LINE 2312
// MISSING LINE 2313
// MISSING LINE 2314
// MISSING LINE 2315
// MISSING LINE 2316
// MISSING LINE 2317
// MISSING LINE 2318
// MISSING LINE 2319
// MISSING LINE 2320
// MISSING LINE 2321
// MISSING LINE 2322
// MISSING LINE 2323
// MISSING LINE 2324
// MISSING LINE 2325
// MISSING LINE 2326
// MISSING LINE 2327
// MISSING LINE 2328
// MISSING LINE 2329
// MISSING LINE 2330
// MISSING LINE 2331
// MISSING LINE 2332
// MISSING LINE 2333
// MISSING LINE 2334
// MISSING LINE 2335
// MISSING LINE 2336
// MISSING LINE 2337
// MISSING LINE 2338
// MISSING LINE 2339
// MISSING LINE 2340
// MISSING LINE 2341
// MISSING LINE 2342
// MISSING LINE 2343
// MISSING LINE 2344
// MISSING LINE 2345
// MISSING LINE 2346
// MISSING LINE 2347
// MISSING LINE 2348
// MISSING LINE 2349
// MISSING LINE 2350
// MISSING LINE 2351
// MISSING LINE 2352
// MISSING LINE 2353
// MISSING LINE 2354
// MISSING LINE 2355
// MISSING LINE 2356
// MISSING LINE 2357
// MISSING LINE 2358
// MISSING LINE 2359
// MISSING LINE 2360
// MISSING LINE 2361
// MISSING LINE 2362
// MISSING LINE 2363
// MISSING LINE 2364
// MISSING LINE 2365
// MISSING LINE 2366
// MISSING LINE 2367
// MISSING LINE 2368
// MISSING LINE 2369
// MISSING LINE 2370
// MISSING LINE 2371
// MISSING LINE 2372
// MISSING LINE 2373
// MISSING LINE 2374
// MISSING LINE 2375
// MISSING LINE 2376
// MISSING LINE 2377
// MISSING LINE 2378
// MISSING LINE 2379
// MISSING LINE 2380
// MISSING LINE 2381
// MISSING LINE 2382
// MISSING LINE 2383
// MISSING LINE 2384
// MISSING LINE 2385
// MISSING LINE 2386
// MISSING LINE 2387
// MISSING LINE 2388
// MISSING LINE 2389
// MISSING LINE 2390
// MISSING LINE 2391
// MISSING LINE 2392
// MISSING LINE 2393
// MISSING LINE 2394
// MISSING LINE 2395
// MISSING LINE 2396
// MISSING LINE 2397
// MISSING LINE 2398
// MISSING LINE 2399
// MISSING LINE 2400
// MISSING LINE 2401
// MISSING LINE 2402
// MISSING LINE 2403
// MISSING LINE 2404
// MISSING LINE 2405
// MISSING LINE 2406
// MISSING LINE 2407
// MISSING LINE 2408
// MISSING LINE 2409
// MISSING LINE 2410
// MISSING LINE 2411
// MISSING LINE 2412
// MISSING LINE 2413
// MISSING LINE 2414
// MISSING LINE 2415
// MISSING LINE 2416
// MISSING LINE 2417
// MISSING LINE 2418
// MISSING LINE 2419
// MISSING LINE 2420
// MISSING LINE 2421
// MISSING LINE 2422
// MISSING LINE 2423
            document.getEle
// MISSING LINE 2425
                updateLocalDataAndSync(StorageKeys.ELECTRIC
// MISSING LINE 2427
// MISSING LINE 2428
// MISSING LINE 2429
// MISSING LINE 2430
// MISSING LINE 2431
// MISSING LINE 2432
// MISSING LINE 2433
// MISSING LINE 2434
// MISSING LINE 2435
// MISSING LINE 2436
// MISSING LINE 2437
// MISSING LINE 2438
// MISSING LINE 2439
// MISSING LINE 2440
// MISSING LINE 2441
// MISSING LINE 2442
// MISSING LINE 2443
// MISSING LINE 2444
// MISSING LINE 2445
// MISSING LINE 2446
// MISSING LINE 2447
// MISSING LINE 2448
// MISSING LINE 2449
// MISSING LINE 2450
// MISSING LINE 2451
// MISSING LINE 2452
// MISSING LINE 2453
// MISSING LINE 2454
// MISSING LINE 2455
// MISSING LINE 2456
// MISSING LINE 2457
// MISSING LINE 2458
// MISSING LINE 2459
// MISSING LINE 2460
// MISSING LINE 2461
// MISSING LINE 2462
// MISSING LINE 2463
// MISSING LINE 2464
// MISSING LINE 2465
// MISSING LINE 2466
// MISSING LINE 2467
// MISSING LINE 2468
// MISSING LINE 2469
// MISSING LINE 2470
// MISSING LINE 2471
// MISSING LINE 2472
// MISSING LINE 2473
// MISSING LINE 2474
// MISSING LINE 2475
// MISSING LINE 2476
// MISSING LINE 2477
// MISSING LINE 2478
// MISSING LINE 2479
// MISSING LINE 2480
// MISSING LINE 2481
// MISSING LINE 2482
// MISSING LINE 2483
// MISSING LINE 2484
// MISSING LINE 2485
// MISSING LINE 2486
// MISSING LINE 2487
// MISSING LINE 2488
// MISSING LINE 2489
// MISSING LINE 2490
// MISSING LINE 2491
// MISSING LINE 2492
// MISSING LINE 2493
// MISSING LINE 2494
// MISSING LINE 2495
// MISSING LINE 2496
// MISSING LINE 2497
// MISSING LINE 2498
// MISSING LINE 2499
// MISSING LINE 2500
// MISSING LINE 2501
// MISSING LINE 2502
// MISSING LINE 2503
// MISSING LINE 2504
// MISSING LINE 2505
// MISSING LINE 2506
// MISSING LINE 2507
// MISSING LINE 2508
// MISSING LINE 2509
// MISSING LINE 2510
// MISSING LINE 2511
// MISSING LINE 2512
// MISSING LINE 2513
// MISSING LINE 2514
// MISSING LINE 2515
// MISSING LINE 2516
// MISSING LINE 2517
// MISSING LINE 2518
// MISSING LINE 2519
// MISSING LINE 2520
// MISSING LINE 2521
// MISSING LINE 2522
// MISSING LINE 2523
// MISSING LINE 2524
// MISSING LINE 2525
                'هل أنت متأكد من حذف ف
// MISSING LINE 2527
// MISSING LINE 2528
// MISSING LINE 2529
// MISSING LINE 2530
// MISSING LINE 2531
// MISSING LINE 2532
// MISSING LINE 2533
// MISSING LINE 2534
// MISSING LINE 2535
// MISSING LINE 2536
// MISSING LINE 2537
// MISSING LINE 2538
// MISSING LINE 2539
// MISSING LINE 2540
// MISSING LINE 2541
// MISSING LINE 2542
// MISSING LINE 2543
// MISSING LINE 2544
// MISSING LINE 2545
// MISSING LINE 2546
// MISSING LINE 2547
// MISSING LINE 2548
// MISSING LINE 2549
// MISSING LINE 2550
// MISSING LINE 2551
// MISSING LINE 2552
// MISSING LINE 2553
// MISSING LINE 2554
// MISSING LINE 2555
                showAlert('لم يتم
// MISSING LINE 2557
// MISSING LINE 2558
// MISSING LINE 2559
// MISSING LINE 2560
// MISSING LINE 2561
// MISSING LINE 2562
// MISSING LINE 2563
// MISSING LINE 2564
// MISSING LINE 2565
// MISSING LINE 2566
// MISSING LINE 2567
// MISSING LINE 2568
// MISSING LINE 2569
// MISSING LINE 2570
// MISSING LINE 2571
// MISSING LINE 2572
// MISSING LINE 2573
// MISSING LINE 2574
// MISSING LINE 2575
// MISSING LINE 2576
// MISSING LINE 2577
// MISSING LINE 2578
// MISSING LINE 2579
// MISSING LINE 2580
// MISSING LINE 2581
// MISSING LINE 2582
// MISSING LINE 2583
// MISSING LINE 2584
// MISSING LINE 2585
// MISSING LINE 2586
// MISSING LINE 2587
// MISSING LINE 2588
// MISSING LINE 2589
// MISSING LINE 2590
// MISSING LINE 2591
// MISSING LINE 2592
// MISSING LINE 2593
// MISSING LINE 2594
// MISSING LINE 2595
// MISSING LINE 2596
// MISSING LINE 2597
// MISSING LINE 2598
// MISSING LINE 2599
// MISSING LINE 2600
// MISSING LINE 2601
// MISSING LINE 2602
// MISSING LINE 2603
// MISSING LINE 2604
// MISSING LINE 2605
// MISSING LINE 2606
// MISSING LINE 2607
// MISSING LINE 2608
// MISSING LINE 2609
// MISSING LINE 2610
// MISSING LINE 2611
// MISSING LINE 2612
// MISSING LINE 2613
// MISSING LINE 2614
// MISSING LINE 2615
// MISSING LINE 2616
// MISSING LINE 2617
// MISSING LINE 2618
// MISSING LINE 2619
// MISSING LINE 2620
// MISSING LINE 2621
// MISSING LINE 2622
// MISSING LINE 2623
// MISSING LINE 2624
// MISSING LINE 2625
// MISSING LINE 2626
// MISSING LINE 2627
// MISSING LINE 2628
// MISSING LINE 2629
// MISSING LINE 2630
// MISSING LINE 2631
// MISSING LINE 2632
// MISSING LINE 2633
// MISSING LINE 2634
// MISSING LINE 2635
// MISSING LINE 2636
// MISSING LINE 2637
// MISSING LINE 2638
// MISSING LINE 2639
// MISSING LINE 2640
// MISSING LINE 2641
// MISSING LINE 2642
// MISSING LINE 2643
// MISSING LINE 2644
// MISSING LINE 2645
// MISSING LINE 2646
// MISSING LINE 2647
// MISSING LINE 2648
// MISSING LINE 2649
// MISSING LINE 2650
// MISSING LINE 2651
// MISSING LINE 2652
// MISSING LINE 2653
// MISSING LINE 2654
// MISSING LINE 2655
// MISSING LINE 2656
// MISSING LINE 2657
// MISSING LINE 2658
// MISSING LINE 2659
// MISSING LINE 2660
// MISSING LINE 2661
// MISSING LINE 2662
// MISSING LINE 2663
// MISSING LINE 2664
// MISSING LINE 2665
// MISSING LINE 2666
// MISSING LINE 2667
// MISSING LINE 2668
// MISSING LINE 2669
// MISSING LINE 2670
// MISSING LINE 2671
// MISSING LINE 2672
// MISSING LINE 2673
// MISSING LINE 2674
// MISSING LINE 2675
// MISSING LINE 2676
// MISSING LINE 2677
// MISSING LINE 2678
// MISSING LINE 2679
// MISSING LINE 2680
// MISSING LINE 2681
// MISSING LINE 2682
// MISSING LINE 2683
// MISSING LINE 2684
// MISSING LINE 2685
// MISSING LINE 2686
// MISSING LINE 2687
// MISSING LINE 2688
// MISSING LINE 2689
// MISSING LINE 2690
// MISSING LINE 2691
// MISSING LINE 2692
// MISSING LINE 2693
// MISSING LINE 2694
// MISSING LINE 2695
// MISSING LINE 2696
// MISSING LINE 2697
// MISSING LINE 2698
// MISSING LINE 2699
// MISSING LINE 2700
// MISSING LINE 2701
// MISSING LINE 2702
// MISSING LINE 2703
// MISSING LINE 2704
// MISSING LINE 2705
// MISSING LINE 2706
// MISSING LINE 2707
// MISSING LINE 2708
// MISSING LINE 2709
// MISSING LINE 2710
// MISSING LINE 2711
// MISSING LINE 2712
// MISSING LINE 2713
// MISSING LINE 2714
// MISSING LINE 2715
// MISSING LINE 2716
// MISSING LINE 2717
// MISSING LINE 2718
// MISSING LINE 2719
// MISSING LINE 2720
// MISSING LINE 2721
// MISSING LINE 2722
// MISSING LINE 2723
// MISSING LINE 2724
// MISSING LINE 2725
// MISSING LINE 2726
// MISSING LINE 2727
// MISSING LINE 2728
       
// MISSING LINE 2730
// MISSING LINE 2731
// MISSING LINE 2732
// MISSING LINE 2733
// MISSING LINE 2734
// MISSING LINE 2735
// MISSING LINE 2736
// MISSING LINE 2737
// MISSING LINE 2738
// MISSING LINE 2739
// MISSING LINE 2740
// MISSING LINE 2741
// MISSING LINE 2742
// MISSING LINE 2743
// MISSING LINE 2744
// MISSING LINE 2745
// MISSING LINE 2746
// MISSING LINE 2747
// MISSING LINE 2748
// MISSING LINE 2749
// MISSING LINE 2750
// MISSING LINE 2751
// MISSING LINE 2752
// MISSING LINE 2753
// MISSING LINE 2754
// MISSING LINE 2755
// MISSING LINE 2756
// MISSING LINE 2757
// MISSING LINE 2758
// MISSING LINE 2759
// MISSING LINE 2760
// MISSING LINE 2761
// MISSING LINE 2762
// MISSING LINE 2763
// MISSING LINE 2764
// MISSING LINE 2765
// MISSING LINE 2766
// MISSING LINE 2767
// MISSING LINE 2768
// MISSING LINE 2769
// MISSING LINE 2770
// MISSING LINE 2771
// MISSING LINE 2772
// MISSING LINE 2773
// MISSING LINE 2774
// MISSING LINE 2775
// MISSING LINE 2776
// MISSING LINE 2777
// MISSING LINE 2778
// MISSING LINE 2779
// MISSING LINE 2780
// MISSING LINE 2781
// MISSING LINE 2782
// MISSING LINE 2783
// MISSING LINE 2784
// MISSING LINE 2785
// MISSING LINE 2786
// MISSING LINE 2787
// MISSING LINE 2788
// MISSING LINE 2789
// MISSING LINE 2790
// MISSING LINE 2791
// MISSING LINE 2792
// MISSING LINE 2793
// MISSING LINE 2794
// MISSING LINE 2795
// MISSING LINE 2796
// MISSING LINE 2797
// MISSING LINE 2798
// MISSING LINE 2799
// MISSING LINE 2800
// MISSING LINE 2801
// MISSING LINE 2802
// MISSING LINE 2803
// MISSING LINE 2804
// MISSING LINE 2805
// MISSING LINE 2806
// MISSING LINE 2807
// MISSING LINE 2808
// MISSING LINE 2809
// MISSING LINE 2810
// MISSING LINE 2811
// MISSING LINE 2812
// MISSING LINE 2813
// MISSING LINE 2814
// MISSING LINE 2815
// MISSING LINE 2816
// MISSING LINE 2817
// MISSING LINE 2818
// MISSING LINE 2819
// MISSING LINE 2820
// MISSING LINE 2821
// MISSING LINE 2822
// MISSING LINE 2823
// MISSING LINE 2824
// MISSING LINE 2825
// MISSING LINE 2826
// MISSING LINE 2827
// MISSING LINE 2828
// MISSING LINE 2829
// MISSING LINE 2830
// MISSING LINE 2831
// MISSING LINE 2832
// MISSING LINE 2833
// MISSING LINE 2834
// MISSING LINE 2835
// MISSING LINE 2836
// MISSING LINE 2837
// MISSING LINE 2838
// MISSING LINE 2839
// MISSING LINE 2840
// MISSING LINE 2841
// MISSING LINE 2842
// MISSING LINE 2843
// MISSING LINE 2844
// MISSING LINE 2845
// MISSING LINE 2846
// MISSING LINE 2847
// MISSING LINE 2848
// MISSING LINE 2849
// MISSING LINE 2850
// MISSING LINE 2851
// MISSING LINE 2852
// MISSING LINE 2853
// MISSING LINE 2854
// MISSING LINE 2855
// MISSING LINE 2856
// MISSING LINE 2857
// MISSING LINE 2858
// MISSING LINE 2859
// MISSING LINE 2860
// MISSING LINE 2861
// MISSING LINE 2862
// MISSING LINE 2863
// MISSING LINE 2864
// MISSING LINE 2865
// MISSING LINE 2866
// MISSING LINE 2867
// MISSING LINE 2868
// MISSING LINE 2869
// MISSING LINE 2870
// MISSING LINE 2871
// MISSING LINE 2872
// MISSING LINE 2873
// MISSING LINE 2874
// MISSING LINE 2875
// MISSING LINE 2876
// MISSING LINE 2877
// MISSING LINE 2878
// MISSING LINE 2879
// MISSING LINE 2880
// MISSING LINE 2881
// MISSING LINE 2882
// MISSING LINE 2883
// MISSING LINE 2884
// MISSING LINE 2885
// MISSING LINE 2886
// MISSING LINE 2887
// MISSING LINE 2888
// MISSING LINE 2889
// MISSING LINE 2890
// MISSING LINE 2891
// MISSING LINE 2892
// MISSING LINE 2893
// MISSING LINE 2894
// MISSING LINE 2895
// MISSING LINE 2896
// MISSING LINE 2897
// MISSING LINE 2898
// MISSING LINE 2899
// MISSING LINE 2900
// MISSING LINE 2901
// MISSING LINE 2902
// MISSING LINE 2903
// MISSING LINE 2904
// MISSING LINE 2905
// MISSING LINE 2906
// MISSING LINE 2907
// MISSING LINE 2908
// MISSING LINE 2909
// MISSING LINE 2910
// MISSING LINE 2911
// MISSING LINE 2912
// MISSING LINE 2913
// MISSING LINE 2914
// MISSING LINE 2915
// MISSING LINE 2916
// MISSING LINE 2917
// MISSING LINE 2918
// MISSING LINE 2919
// MISSING LINE 2920
// MISSING LINE 2921
// MISSING LINE 2922
function handleSketchStart(e) {
    const canvas = document.getElementById('sketch-canvas');
    const coords = getCanvasCoords(e, canvas);
    
    // منع التمرير على الجوال عند التفاعل مع أداة الرسم أو جر الأشكال
    if (e.type === 'touchstart') {
        const clickedEl = hitTest(coords);
        if (currentSketchTool !== 'select' || clickedEl) {
            e.preventDefault();
        }
    }
    
    if (currentSketchTool === 'select') {
        if (selectedSketchElement) {
            // التحقق من تدوير العنصر المحدد
            const rotateH = getRotateHandleCenter(selectedSketchElement);
            if (distance(coords, rotateH) < 12) {
                sketchActionMode = 'rotating';
                sketchRotateStartAngle = Math.atan2(coords.y - selectedSketchElement.y, coords.x - selectedSketchElement.x) - selectedSketchElement.angle;
                return;
            }
// MISSING LINE 2944
            // التحقق من تغيير حجم العنصر المحدد
            const resizeH = getResizeHandleCenter(selectedSketchElement);
            if (distance(coords, resizeH) < 12) {
                sketchActionMode = 'resizing';
                sketchStartPoint = coords;
                sketchResizeStartSize = { w: selectedSketchElement.w, h: selectedSketchElement.h };
// MISSING LINE 2951
// MISSING LINE 2952
// MISSING LINE 2953
// MISSING LINE 2954
// MISSING LINE 2955
// MISSING LINE 2956
// MISSING LINE 2957
// MISSING LINE 2958
// MISSING LINE 2959
// MISSING LINE 2960
// MISSING LINE 2961
// MISSING LINE 2962
// MISSING LINE 2963
// MISSING LINE 2964
// MISSING LINE 2965
// MISSING LINE 2966
// MISSING LINE 2967
// MISSING LINE 2968
// MISSING LINE 2969
// MISSING LINE 2970
// MISSING LINE 2971
// MISSING LINE 2972
// MISSING LINE 2973
// MISSING LINE 2974
// MISSING LINE 2975
// MISSING LINE 2976
// MISSING LINE 2977
// MISSING LINE 2978
// MISSING LINE 2979
// MISSING LINE 2980
// MISSING LINE 2981
// MISSING LINE 2982
// MISSING LINE 2983
// MISSING LINE 2984
// MISSING LINE 2985
// MISSING LINE 2986
// MISSING LINE 2987
// MISSING LINE 2988
// MISSING LINE 2989
// MISSING LINE 2990
// MISSING LINE 2991
// MISSING LINE 2992
    if (e.type === 'touchstar
// MISSING LINE 2994
// MISSING LINE 2995
// MISSING LINE 2996
// MISSING LINE 2997
// MISSING LINE 2998
// MISSING LINE 2999
// MISSING LINE 3000
// MISSING LINE 3001
// MISSING LINE 3002
// MISSING LINE 3003
// MISSING LINE 3004
// MISSING LINE 3005
// MISSING LINE 3006
// MISSING LINE 3007
// MISSING LINE 3008
// MISSING LINE 3009
// MISSING LINE 3010
// MISSING LINE 3011
// MISSING LINE 3012
// MISSING LINE 3013
// MISSING LINE 3014
// MISSING LINE 3015
// MISSING LINE 3016
// MISSING LINE 3017
// MISSING LINE 3018
// MISSING LINE 3019
// MISSING LINE 3020
// MISSING LINE 3021
// MISSING LINE 3022
// MISSING LINE 3023
// MISSING LINE 3024
// MISSING LINE 3025
// MISSING LINE 3026
// MISSING LINE 3027
// MISSING LINE 3028
// MISSING LINE 3029
// MISSING LINE 3030
        selectedSketchElement.w = Math.max(20, Math.abs(local.x) * 2
// MISSING LINE 3032
// MISSING LINE 3033
// MISSING LINE 3034
// MISSING LINE 3035
// MISSING LINE 3036
// MISSING LINE 3037
// MISSING LINE 3038
// MISSING LINE 3039
// MISSING LINE 3040
// MISSING LINE 3041
// MISSING LINE 3042
// MISSING LINE 3043
// MISSING LINE 3044
// MISSING LINE 3045
// MISSING LINE 3046
// MISSING LINE 3047
// MISSING LINE 3048
// MISSING LINE 3049
// MISSING LINE 3050
// MISSING LINE 3051
// MISSING LINE 3052
// MISSING LINE 3053
// MISSING LINE 3054
// MISSING LINE 3055
// MISSING LINE 3056
// MISSING LINE 3057
// MISSING LINE 3058
// MISSING LINE 3059
// MISSING LINE 3060
// MISSING LINE 3061
// MISSING LINE 3062
// MISSING LINE 3063
// MISSING LINE 3064
// MISSING LINE 3065
// MISSING LINE 3066
// MISSING LINE 3067
// MISSING LINE 3068
// MISSING LINE 3069
// MISSING LINE 3070
// MISSING LINE 3071
// MISSING LINE 3072
// MISSING LINE 3073
// MISSING LINE 3074
// MISSING LINE 3075
// MISSING LINE 3076
// MISSING LINE 3077
// MISSING LINE 3078
// MISSING LINE 3079
// MISSING LINE 3080
// MISSING LINE 3081
// MISSING LINE 3082
// MISSING LINE 3083
// MISSING LINE 3084
// MISSING LINE 3085
// MISSING LINE 3086
// MISSING LINE 3087
// MISSING LINE 3088
// MISSING LINE 3089
// MISSING LINE 3090
// MISSING LINE 3091
// MISSING LINE 3092
// MISSING LINE 3093
// MISSING LINE 3094
// MISSING LINE 3095
// MISSING LINE 3096
// MISSING LINE 3097
// MISSING LINE 3098
// MISSING LINE 3099
// MISSING LINE 3100
// MISSING LINE 3101
// MISSING LINE 3102
// MISSING LINE 3103
// MISSING LINE 3104
// MISSING LINE 3105
// MISSING LINE 3106
// MISSING LINE 3107
// MISSING LINE 3108
// MISSING LINE 3109
// MISSING LINE 3110
// MISSING LINE 3111
// MISSING LINE 3112
// MISSING LINE 3113
// MISSING LINE 3114
// MISSING LINE 3115
// MISSING LINE 3116
// MISSING LINE 3117
// MISSING LINE 3118
// MISSING LINE 3119
// MISSING LINE 3120
// MISSING LINE 3121
// MISSING LINE 3122
// MISSING LINE 3123
// MISSING LINE 3124
// MISSING LINE 3125
// MISSING LINE 3126
// MISSING LINE 3127
// MISSING LINE 3128
// MISSING LINE 3129
// MISSING LINE 3130
// MISSING LINE 3131
// MISSING LINE 3132
// MISSING LINE 3133
// MISSING LINE 3134
// MISSING LINE 3135
// MISSING LINE 3136
// MISSING LINE 3137
// MISSING LINE 3138
// MISSING LINE 3139
        y: a
// MISSING LINE 3141
// MISSING LINE 3142
// MISSING LINE 3143
// MISSING LINE 3144
// MISSING LINE 3145
// MISSING LINE 3146
// MISSING LINE 3147
// MISSING LINE 3148
// MISSING LINE 3149
// MISSING LINE 3150
// MISSING LINE 3151
// MISSING LINE 3152
// MISSING LINE 3153
// MISSING LINE 3154
// MISSING LINE 3155
// MISSING LINE 3156
// MISSING LINE 3157
// MISSING LINE 3158
// MISSING LINE 3159
// MISSING LINE 3160
// MISSING LINE 3161
// MISSING LINE 3162
// MISSING LINE 3163
// MISSING LINE 3164
// MISSING LINE 3165
// MISSING LINE 3166
// MISSING LINE 3167
// MISSING LINE 3168
// MISSING LINE 3169
// MISSING LINE 3170
// MISSING LINE 3171
// MISSING LINE 3172
// MISSING LINE 3173
// MISSING LINE 3174
// MISSING LINE 3175
// MISSING LINE 3176
// MISSING LINE 3177
// MISSING LINE 3178
// MISSING LINE 3179
// MISSING LINE 3180
// MISSING LINE 3181
// MISSING LINE 3182
// MISSING LINE 3183
// MISSING LINE 3184
// MISSING LINE 3185
// MISSING LINE 3186
// MISSING LINE 3187
// MISSING LINE 3188
// MISSING LINE 3189
// MISSING LINE 3190
// MISSING LINE 3191
// MISSING LINE 3192
// MISSING LINE 3193
// MISSING LINE 3194
// MISSING LINE 3195
// MISSING LINE 3196
// MISSING LINE 3197
// MISSING LINE 3198
// MISSING LINE 3199
// MISSING LINE 3200
// MISSING LINE 3201
// MISSING LINE 3202
// MISSING LINE 3203
// MISSING LINE 3204
// MISSING LINE 3205
// MISSING LINE 3206
// MISSING LINE 3207
// MISSING LINE 3208
// MISSING LINE 3209
// MISSING LINE 3210
// MISSING LINE 3211
// MISSING LINE 3212
// MISSING LINE 3213
// MISSING LINE 3214
// MISSING LINE 3215
// MISSING LINE 3216
// MISSING LINE 3217
// MISSING LINE 3218
// MISSING LINE 3219
// MISSING LINE 3220
// MISSING LINE 3221
// MISSING LINE 3222
// MISSING LINE 3223
                ctx.beginPath();
    const canvas = document.getElementById('sketch-canvas');
                ctx.fill();
    const ctx = canvas.getContext('2d');
            }
    // 1. مسح اللوحة
    ctx.clearRect(0, 0, canvas.width, canvas.height);
// MISSING LINE 3231
    // 2. رسم صورة الخلفية المرجعية
    if (sketchBgImage) {
        ctx.save();
        ctx.globalAlpha = sketchBgImageOpacity;
        if (isSketchBW) {
            ctx.filter = 'grayscale(100%)';
        }
        ctx.drawImage(sketchBgImage, 0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
// MISSING LINE 3242
    // 3. رسم شبكة المربعات (مثل ورقة الرسم البياني) - جعلها واضحة أكثر
    if (showSketchGrid) {
        ctx.save();
        for (let x = 0; x < canvas.width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            if (x % 100 === 0) {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.28)';
                ctx.lineWidth = 1.0;
            } else {
                ctx.strokeStyle = 'rgba(0, 0, 0, 0.14)';
                ctx.lineWidth = 0.6;
            }
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            if (y %
// MISSING LINE 3264
// MISSING LINE 3265
// MISSING LINE 3266
// MISSING LINE 3267
// MISSING LINE 3268
// MISSING LINE 3269
// MISSING LINE 3270
// MISSING LINE 3271
// MISSING LINE 3272
// MISSING LINE 3273
// MISSING LINE 3274
                ctx.beginPath();
                ctx.arc(el.x1, el.y1, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(el.x2, el.y2, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        } else if (el.type === 'freehand') {
            drawFreehand(ctx, el.points, el.color, isSketchBW);
                ctx.beginPath();
                ctx.arc(el.x1, el.y1, 6, 0, 2 * Math.PI);
            if (selectedSketchElement === el && currentSketchTool === 'select') {
                ctx.strokeStyle = '#3b82f6';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(el.x - el.w / 2 - 4, el.y - el.h / 2 - 4, el.w + 8, el.h + 8);
                ctx.restore();
                ctx.stroke();
                
                // رسم مقابض للتحكم بالتحريك الموضعي
            drawFreehand(ctx, el.points, el.color, isSketchBW);
                ctx.strokeStyle = '#ffffff';
            // رسم محيط تحديد الرسم الحر
            if (selectedSketchElement === el && currentSketchTool === 'select') {
                ctx.arc(el.x, el.y, 6, 0, 2 * Math.PI);
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 4]);
                ctx.strokeRect(el.x - el.w / 2 - 4, el.y - el.h / 2 - 4, el.w + 8, el.h + 8);
                ctx.restore();
                ctx.save();
                
                // رسم مقابض للتحكم بالتحريك الموضعي
                ctx.fillStyle = '#3b82f6';
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(el.x, el.y, 6, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        } else {
            ctx.translate(el.x, el.y);
            ctx.rotate(el.angle);
// MISSING LINE 3321
            if (el.type === 'sofa') drawSofa(ctx, el.w, el.h, el.color, isSketchBW);
            else if (el.type === 'armchair') drawArmchair(ctx, el.w, el.h, el.color, isSketchBW);
            else if (el.type === 'corner') drawCorner(ctx, el.w, el.h, el.color, isSketchBW);
// MISSING LINE 3325
// MISSING LINE 3326
// MISSING LINE 3327
// MISSING LINE 3328
// MISSING LINE 3329
// MISSING LINE 3330
// MISSING LINE 3331
// MISSING LINE 3332
// MISSING LINE 3333
// MISSING LINE 3334
// MISSING LINE 3335
// MISSING LINE 3336
// MISSING LINE 3337
// MISSING LINE 3338
// MISSING LINE 3339
// MISSING LINE 3340
// MISSING LINE 3341
// MISSING LINE 3342
// MISSING LINE 3343
// MISSING LINE 3344
// MISSING LINE 3345
// MISSING LINE 3346
// MISSING LINE 3347
// MISSING LINE 3348
// MISSING LINE 3349
// MISSING LINE 3350
// MISSING LINE 3351
// MISSING LINE 3352
// MISSING LINE 3353
// MISSING LINE 3354
// MISSING LINE 3355
// MISSING LINE 3356
// MISSING LINE 3357
// MISSING LINE 3358
// MISSING LINE 3359
// MISSING LINE 3360
// MISSING LINE 3361
// MISSING LINE 3362
// MISSING LINE 3363
// MISSING LINE 3364
// MISSING LINE 3365
            if (selectedSketchElement === el && currentSketchToo
// MISSING LINE 3367
// MISSING LINE 3368
// MISSING LINE 3369
// MISSING LINE 3370
// MISSING LINE 3371
// MISSING LINE 3372
// MISSING LINE 3373
// MISSING LINE 3374
// MISSING LINE 3375
// MISSING LINE 3376
// MISSING LINE 3377
// MISSING LINE 3378
// MISSING LINE 3379
// MISSING LINE 3380
// MISSING LINE 3381
// MISSING LINE 3382
// MISSING LINE 3383
// MISSING LINE 3384
// MISSING LINE 3385
// MISSING LINE 3386
// MISSING LINE 3387
// MISSING LINE 3388
// MISSING LINE 3389
// MISSING LINE 3390
// MISSING LINE 3391
// MISSING LINE 3392
// MISSING LINE 3393
// MISSING LINE 3394
// MISSING LINE 3395
// MISSING LINE 3396
// MISSING LINE 3397
// MISSING LINE 3398
// MISSING LINE 3399
// MISSING LINE 3400
// MISSING LINE 3401
// MISSING LINE 3402
// MISSING LINE 3403
// MISSING LINE 3404
// MISSING LINE 3405
// MISSING LINE 3406
// MISSING LINE 3407
// MISSING LINE 3408
// MISSING LINE 3409
// MISSING LINE 3410
// MISSING LINE 3411
// MISSING LINE 3412
// MISSING LINE 3413
// MISSING LINE 3414
// MISSING LINE 3415
// MISSING LINE 3416
// MISSING LINE 3417
// MISSING LINE 3418
// MISSING LINE 3419
// MISSING LINE 3420
// MISSING LINE 3421
// MISSING LINE 3422
// MISSING LINE 3423
// MISSING LINE 3424
// MISSING LINE 3425
// MISSING LINE 3426
// MISSING LINE 3427
// MISSING LINE 3428
// MISSING LINE 3429
// MISSING LINE 3430
// MISSING LINE 3431
// MISSING LINE 3432
// MISSING LINE 3433
// MISSING LINE 3434
// MISSING LINE 3435
// MISSING LINE 3436
// MISSING LINE 3437
// MISSING LINE 3438
// MISSING LINE 3439
// MISSING LINE 3440
// MISSING LINE 3441
// MISSING LINE 3442
// MISSING LINE 3443
// MISSING LINE 3444
// MISSING LINE 3445
// MISSING LINE 3446
// MISSING LINE 3447
// MISSING LINE 3448
// MISSING LINE 3449
// MISSING LINE 3450
// MISSING LINE 3451
// MISSING LINE 3452
// MISSING LINE 3453
// MISSING LINE 3454
// MISSING LINE 3455
// MISSING LINE 3456
// MISSING LINE 3457
// MISSING LINE 3458
// MISSING LINE 3459
// MISSING LINE 3460
// MISSING LINE 3461
// MISSING LINE 3462
// MISSING LINE 3463
// MISSING LINE 3464
// MISSING LINE 3465
// MISSING LINE 3466
// MISSING LINE 3467
// MISSING LINE 3468
// MISSING LINE 3469
// MISSING LINE 3470
// MISSING LINE 3471
// MISSING LINE 3472
// MISSING LINE 3473
// MISSING LINE 3474
// MISSING LINE 3475
// MISSING LINE 3476
// MISSING LINE 3477
// MISSING LINE 3478
// MISSING LINE 3479
// MISSING LINE 3480
// MISSING LINE 3481
// MISSING LINE 3482
// MISSING LINE 3483
// MISSING LINE 3484
// MISSING LINE 3485
// MISSING LINE 3486
// MISSING LINE 3487
// MISSING LINE 3488
// MISSING LINE 3489
// MISSING LINE 3490
// MISSING LINE 3491
// MISSING LINE 3492
// MISSING LINE 3493
// MISSING LINE 3494
// MISSING LINE 3495
// MISSING LINE 3496
// MISSING LINE 3497
// MISSING LINE 3498
// MISSING LINE 3499
// MISSING LINE 3500
// MISSING LINE 3501
// MISSING LINE 3502
// MISSING LINE 3503
// MISSING LINE 3504
// MISSING LINE 3505
// MISSING LINE 3506
// MISSING LINE 3507
// MISSING LINE 3508
// MISSING LINE 3509
// MISSING LINE 3510
// MISSING LINE 3511
// MISSING LINE 3512
// MISSING LINE 3513
// MISSING LINE 3514
// MISSING LINE 3515
// MISSING LINE 3516
// MISSING LINE 3517
// MISSING LINE 3518
// MISSING LINE 3519
// MISSING LINE 3520
// MISSING LINE 3521
// MISSING LINE 3522
// MISSING LINE 3523
// MISSING LINE 3524
// MISSING LINE 3525
// MISSING LINE 3526
// MISSING LINE 3527
// MISSING LINE 3528
// MISSING LINE 3529
// MISSING LINE 3530
// MISSING LINE 3531
// MISSING LINE 3532
// MISSING LINE 3533
// MISSING LINE 3534
// MISSING LINE 3535
// MISSING LINE 3536
// MISSING LINE 3537
// MISSING LINE 3538
// MISSING LINE 3539
// MISSING LINE 3540
// MISSING LINE 3541
// MISSING LINE 3542
// MISSING LINE 3543
// MISSING LINE 3544
// MISSING LINE 3545
// MISSING LINE 3546
// MISSING LINE 3547
// MISSING LINE 3548
// MISSING LINE 3549
// MISSING LINE 3550
// MISSING LINE 3551
// MISSING LINE 3552
// MISSING LINE 3553
// MISSING LINE 3554
// MISSING LINE 3555
// MISSING LINE 3556
// MISSING LINE 3557
// MISSING LINE 3558
// MISSING LINE 3559
// MISSING LINE 3560
// MISSING LINE 3561
// MISSING LINE 3562
// MISSING LINE 3563
function drawDimensionLine(ctx, x1, y1, x2, y2, color, label, isBW) {
    ctx.strokeStyle = isBW ? '#000000' : color;
    ctx.fillStyle = isBW ? '#000000' : color;
    ctx.lineWidth = 2;
// MISSING LINE 3568
    // رسم الخط الأساسي
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
// MISSING LINE 3574
    const angle = Math.atan2(y2 - y1, x2 - x1);
// MISSING LINE 3576
    if (label) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
// MISSING LINE 3580
        ctx.save();
        ctx.translate(midX, midY);
        
        let textAngle = angle;
        if (textAngle > Math.PI / 2 || textAngle < -Math.PI / 2) {
            textAngle += Math.PI;
        }
        ctx.rotate(textAngle);
// MISSING LINE 3589
        ctx.font = 'bold 13px Cairo, sans-serif';
        const textWidth = ctx.measureText(label).width;
// MISSING LINE 3592
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-textWidth / 2 - 4, -9, textWidth + 8, 18);
// MISSING LINE 3595
        ctx.fillStyle = isBW ? '#000000' : color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, 0, 0);
        ctx.restore();
        let textAngle = ang
}
// MISSING LINE 3603
// MISSING LINE 3604
// MISSING LINE 3605
// MISSING LINE 3606
// MISSING LINE 3607
// MISSING LINE 3608
// MISSING LINE 3609
// MISSING LINE 3610
// MISSING LINE 3611
// MISSING LINE 3612
// MISSING LINE 3613
// MISSING LINE 3614
// MISSING LINE 3615
// MISSING LINE 3616
// MISSING LINE 3617
// MISSING LINE 3618
// MISSING LINE 3619
// MISSING LINE 3620
// MISSING LINE 3621
// MISSING LINE 3622
// MISSING LINE 3623
// MISSING LINE 3624
// MISSING LINE 3625
// MISSING LINE 3626
// MISSING LINE 3627
// MISSING LINE 3628
// MISSING LINE 3629
// MISSING LINE 3630
// MISSING LINE 3631
// MISSING LINE 3632
// MISSING LINE 3633
// MISSING LINE 3634
// MISSING LINE 3635
// MISSING LINE 3636
// MISSING LINE 3637
// MISSING LINE 3638
// MISSING LINE 3639
// MISSING LINE 3640
// MISSING LINE 3641
// MISSING LINE 3642
// MISSING LINE 3643
// MISSING LINE 3644
// MISSING LINE 3645
// MISSING LINE 3646
// MISSING LINE 3647
// MISSING LINE 3648
// MISSING LINE 3649
// MISSING LINE 3650
// MISSING LINE 3651
// MISSING LINE 3652
// MISSING LINE 3653
// MISSING LINE 3654
// MISSING LINE 3655
// MISSING LINE 3656
// MISSING LINE 3657
// MISSING LINE 3658
// MISSING LINE 3659
// MISSING LINE 3660
function setSketchColor(color) {
    currentSketchColor = color;
    
    // تحديث الحلقة المحيطة باللون النشط وإظهار علامة الاختيار
    const colorButtons = document.querySelectorAll('#sketch-colors button');
    colorButtons.forEach(btn => {
        const btnColor = btn.getAttribute('data-color');
        btn.innerHTML = ''; // تفريغ المحتوى أولاً
        
        if (btnColor === color) {
// MISSING LINE 3671
// MISSING LINE 3672
// MISSING LINE 3673
// MISSING LINE 3674
// MISSING LINE 3675
// MISSING LINE 3676
// MISSING LINE 3677
// MISSING LINE 3678
// MISSING LINE 3679
// MISSING LINE 3680
// MISSING LINE 3681
// MISSING LINE 3682
// MISSING LINE 3683
// MISSING LINE 3684
// MISSING LINE 3685
// MISSING LINE 3686
// MISSING LINE 3687
// MISSING LINE 3688
// MISSING LINE 3689
// MISSING LINE 3690
// MISSING LINE 3691
// MISSING LINE 3692
// MISSING LINE 3693
// MISSING LINE 3694
// MISSING LINE 3695
// MISSING LINE 3696
// MISSING LINE 3697
// MISSING LINE 3698
// MISSING LINE 3699
// MISSING LINE 3700
// MISSING LINE 3701
// MISSING LINE 3702
// MISSING LINE 3703
// MISSING LINE 3704
// MISSING LINE 3705
// MISSING LINE 3706
// MISSING LINE 3707
// MISSING LINE 3708
// MISSING LINE 3709
// MISSING LINE 3710
// MISSING LINE 3711
// MISSING LINE 3712
// MISSING LINE 3713
// MISSING LINE 3714
// MISSING LINE 3715
// MISSING LINE 3716
// MISSING LINE 3717
// MISSING LINE 3718
// MISSING LINE 3719
// MISSING LINE 3720
// MISSING LINE 3721
// MISSING LINE 3722
// MISSING LINE 3723
// MISSING LINE 3724
// MISSING LINE 3725
// MISSING LINE 3726
// MISSING LINE 3727
// MISSING LINE 3728
// MISSING LINE 3729
// MISSING LINE 3730
// MISSING LINE 3731
// MISSING LINE 3732
// MISSING LINE 3733
// MISSING LINE 3734
// MISSING LINE 3735
// MISSING LINE 3736
// MISSING LINE 3737
// MISSING LINE 3738
// MISSING LINE 3739
// MISSING LINE 3740
// MISSING LINE 3741
// MISSING LINE 3742
// MISSING LINE 3743
// MISSING LINE 3744
// MISSING LINE 3745
// MISSING LINE 3746
// MISSING LINE 3747
// MISSING LINE 3748
// MISSING LINE 3749
// MISSING LINE 3750
// MISSING LINE 3751
// MISSING LINE 3752
// MISSING LINE 3753
// MISSING LINE 3754
// MISSING LINE 3755
// MISSING LINE 3756
// MISSING LINE 3757
// MISSING LINE 3758
// MISSING LINE 3759
// MISSING LINE 3760
// MISSING LINE 3761
// MISSING LINE 3762
// MISSING LINE 3763
// MISSING LINE 3764
// MISSING LINE 3765
// MISSING LINE 3766
// MISSING LINE 3767
// MISSING LINE 3768
// MISSING LINE 3769
// MISSING LINE 3770
// MISSING LINE 3771
// MISSING LINE 3772
// MISSING LINE 3773
// MISSING LINE 3774
// MISSING LINE 3775
// MISSING LINE 3776
// MISSING LINE 3777
// MISSING LINE 3778
// MISSING LINE 3779
// MISSING LINE 3780
// MISSING LINE 3781
// MISSING LINE 3782
// MISSING LINE 3783
// MISSING LINE 3784
// MISSING LINE 3785
// MISSING LINE 3786
// MISSING LINE 3787
// MISSING LINE 3788
// MISSING LINE 3789
// MISSING LINE 3790
// MISSING LINE 3791
// MISSING LINE 3792
// MISSING LINE 3793
// MISSING LINE 3794
// MISSING LINE 3795
// MISSING LINE 3796
// MISSING LINE 3797
// MISSING LINE 3798
// MISSING LINE 3799
        element.h = 80;
    } else if (type === 'hexagon') {
        element.w = 80;
        element.h = 80;
    } else if (type === 'star') {
        element.w = 80;
        element.h = 80;
    } else if (type === 'arrow-right') {
        element.w = 100;
        element.h = 60;
    } else if (type === 'armchair') {
        element.w = 60;
        element.h = 60;
    } else if (type === 'corner') {
        element.w = 80;
        element.h = 80;
    } else if (type === 'round-corner') {
        element.w = 80;
        element.h = 80;
    } else if (type === 'table') {
        element.w = 90;
        element.h = 50;
    }
// MISSING LINE 3823
// MISSING LINE 3824
// MISSING LINE 3825
// MISSING LINE 3826
// MISSING LINE 3827
// MISSING LINE 3828
// MISSING LINE 3829
// MISSING LINE 3830
// MISSING LINE 3831
// MISSING LINE 3832
// MISSING LINE 3833
// MISSING LINE 3834
// MISSING LINE 3835
// MISSING LINE 3836
    const filtered = sketches.filt
// MISSING LINE 3838
// MISSING LINE 3839
// MISSING LINE 3840
// MISSING LINE 3841
// MISSING LINE 3842
// MISSING LINE 3843
// MISSING LINE 3844
// MISSING LINE 3845
// MISSING LINE 3846
// MISSING LINE 3847
// MISSING LINE 3848
// MISSING LINE 3849
// MISSING LINE 3850
// MISSING LINE 3851
// MISSING LINE 3852
// MISSING LINE 3853
// MISSING LINE 3854
// MISSING LINE 3855
function showSketchElementControls() {
    const controls = document.getElementById('sketch-element-controls');
    if (!controls) return;
    controls.classList.remove('hidden');
// MISSING LINE 3860
    const textEdit = document.getElementById('sketch-text-edit-container');
    const textInput = document.getElementById('sketch-element-text-input');
    
    const textOrLabelTypes = ['text', 'line', 'square', 'rectangle', 'circle', 'ellipse', 'triangle', 'hexagon', 'star', 'arrow-right'];
// MISSING LINE 3865
// MISSING LINE 3866
// MISSING LINE 3867
// MISSING LINE 3868
// MISSING LINE 3869
// MISSING LINE 3870
// MISSING LINE 3871
// MISSING LINE 3872
// MISSING LINE 3873
// MISSING LINE 3874
// MISSING LINE 3875
// MISSING LINE 3876
// MISSING LINE 3877
// MISSING LINE 3878
// MISSING LINE 3879
// MISSING LINE 3880
// MISSING LINE 3881
// MISSING LINE 3882
// MISSING LINE 3883
// MISSING LINE 3884
// MISSING LINE 3885
// MISSING LINE 3886
// MISSING LINE 3887
// MISSING LINE 3888
// MISSING LINE 3889
// MISSING LINE 3890
// MISSING LINE 3891
// MISSING LINE 3892
// MISSING LINE 3893
// MISSING LINE 3894
// MISSING LINE 3895
// MISSING LINE 3896
// MISSING LINE 3897
// MISSING LINE 3898
// MISSING LINE 3899
// MISSING LINE 3900
// MISSING LINE 3901
// MISSING LINE 3902
// MISSING LINE 3903
// MISSING LINE 3904
// MISSING LINE 3905
// MISSING LINE 3906
// MISSING LINE 3907
// MISSING LINE 3908
// MISSING LINE 3909
// MISSING LINE 3910
// MISSING LINE 3911
// MISSING LINE 3912
// MISSING LINE 3913
// MISSING LINE 3914
// MISSING LINE 3915
// MISSING LINE 3916
// MISSING LINE 3917
// MISSING LINE 3918
// MISSING LINE 3919
// MISSING LINE 3920
// MISSING LINE 3921
// MISSING LINE 3922
// MISSING LINE 3923
// MISSING LINE 3924
// MISSING LINE 3925
// MISSING LINE 3926
// MISSING LINE 3927
// MISSING LINE 3928
// MISSING LINE 3929
// MISSING LINE 3930
// MISSING LINE 3931
// MISSING LINE 3932
// MISSING LINE 3933
// MISSING LINE 3934
// MISSING LINE 3935
// MISSING LINE 3936
// MISSING LINE 3937
// MISSING LINE 3938
// MISSING LINE 3939
// MISSING LINE 3940
// MISSING LINE 3941
// MISSING LINE 3942
// MISSING LINE 3943
// MISSING LINE 3944
// MISSING LINE 3945
// MISSING LINE 3946
// MISSING LINE 3947
// MISSING LINE 3948
// MISSING LINE 3949
// MISSING LINE 3950
// MISSING LINE 3951
// MISSING LINE 3952
// MISSING LINE 3953
// MISSING LINE 3954
// MISSING LINE 3955
// MISSING LINE 3956
// MISSING LINE 3957
// MISSING LINE 3958
// MISSING LINE 3959
// MISSING LINE 3960
// MISSING LINE 3961
// MISSING LINE 3962
// MISSING LINE 3963
// MISSING LINE 3964
// MISSING LINE 3965
// MISSING LINE 3966
// MISSING LINE 3967
// MISSING LINE 3968
// MISSING LINE 3969
// MISSING LINE 3970
// MISSING LINE 3971
// MISSING LINE 3972
// MISSING LINE 3973
// MISSING LINE 3974
// MISSING LINE 3975
// MISSING LINE 3976
// MISSING LINE 3977
// MISSING LINE 3978
// MISSING LINE 3979
// MISSING LINE 3980
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-gray-500 border border-gray-300">لا توجد تصامي
// MISSING LINE 3982
// MISSING LINE 3983
// MISSING LINE 3984
// MISSING LINE 3985
                                        <button type="button" onclick="prepareSketchPDF('${sk.id}')" class="text-indigo-600 hover:text-indigo-800 transition duration-150">
                        ØªØ­Ù…ÙŠÙ„ PDF
                    </button>
                    <button type="button" onclick="deleteSketch('${sk.id}')" class="text-red-600 hover:text-red-800 transition duration-150">
                        Ø­Ø°Ù
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}
// MISSING LINE 3997
function openNewSketchEditor() {
    currentSketchId = null;
    sketchElements = [];
    selectedSketchElement = null;
    sketchBgImage = null;
    sketchBgImageSrcData = null;
// MISSING LINE 4004
    document.getElementById('sketch-owner').value = '';
    document.getElementById('sketch-phone').value = '';
    document.getElementById('sketch-invoice').value = '';
// MISSING LINE 4008
    document.getElementById('sketch-grid-toggle').checked = true;
    document.getElementById('sketch-bw-toggle').checked = false;
    document.getElementById('sketch-image-upload').value = '';
// MISSING LINE 4012
    showSketchGrid = true;
    isSketchBW = false;
    
    document.getElementById('sketch-opacity-container').classList.add('hidden');
    document.getElementById('sketch-remove-image-btn').classList.add('hidden');
    
    setSketchTool('select');
    setSketchColor('#000000');
    hideSketchElementControls();
// MISSING LINE 4022
    document.getElementById('sketch-editor-title').textContent = "ØªØµÙ…ÙŠÙ… ÙƒØ±ÙˆÙƒÙŠ Ø¬Ø¯ÙŠØ¯ Ù„Ù„Ø²Ø¨ÙˆÙ†";
    document.getElementById('sketches-list-container').classList.add('hidden');
    document.getElementById('sketch-editor-container').classList.remove('hidden');
// MISSING LINE 4026
    drawSketch();
}
// MISSING LINE 4029
function openEditSketchEditor(sketchId) {
    const sk = sketches.find(s => s.id === sketchId);
    if (!sk) return;
// MISSING LINE 4033
    currentSketchId = sk.id;
    sketchElements = sk.elements || [];
    selectedSketchElement = null;
    sketchBgImage = null;
    sketchBgImageSrcData = sk.bgImage || null;
    sketchBgImageOpacity = sk.bgOpacity || 0.5;
    showSketchGrid = sk.showGrid !== false;
    isSketchBW = sk.isBW === true;
// MISSING LINE 4042
    document.getElementById('sketch-owner').value = sk.ownerName;
    document.getElementById('sketch-phone').value = sk.phone;
    document.getElementById('sketch-invoice').value = sk.invoiceNo;
// MISSING LINE 4046
    document.getElementById('sketch-grid-toggle').checked = showSketchGrid;
    document.getElementById('sketch-bw-toggle').checked = isSketchBW;
    document.getElementById('sketch-image-opacity').value = sketchBgImageOpacity;
// MISSING LINE 4050
    if (sketchBgImageSrcData) {
        sketchBgImage = new Image();
        sketchBgImage.onload = function() {
            document.getElementById('sketch-opacity-container').classList.remove('hidden');
            document.getElementById('sketch-remove-image-btn').classList.remove('hidden');
            drawSketch();
        };
        sketchBgImage.src = sketchBgImageSrcData;
    } else {
        document.getElementById('sketch-opacity-container').classList.add('hidden');
        document.getElementById('sketch-remove-image-btn').classList.add('hidden');
    }
// MISSING LINE 4063
    setSketchTool('select');
    setSketchColor(sk.color || '#000000');
    hideSketchElementControls();
// MISSING LINE 4067
    document.getElementById('sketch-editor-title').textContent = "ØªØ¹Ø¯ÙŠÙ„ ØªØµÙ…ÙŠÙ… Ø§Ù„ÙƒØ±ÙˆÙƒÙŠ";
    document.getElementById('sketches-list-container').classList.add('hidden');
    document.getElementById('sketch-editor-container').classList.remove('hidden');
// MISSING LINE 4071
    drawSketch();
}
// MISSING LINE 4074
function openEditSketchEditor(sketchId) {
    const ownerName = document.getElementById('sketch-owner').value.trim();
    const phone = document.getElementById('sketch-phone').value.trim();
    const invoiceNo = document.getElementById('sketch-invoice').value.trim();
    currentSketchId = sk.id;
    if (!ownerName || !phone || !invoiceNo) {
        showAlert('يرجى ملء جميع الحقول الإلزامية المطلوبة (*)', 'error');
    sketchBgImage = null;
    sketchBgImageSrcData = sk.bgImage || null;
    sketchBgImageOpacity = sk.bgOpacity || 0.5;
    const id = currentSketchId || Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const date = currentSketchId ? (sketches.find(s => s.id === currentSketchId).date) : new Date().toISOString().split('T')[0];
// MISSING LINE 4087
    document.getElementById('sketch-owner').value = sk.ownerName;
    document.getElementById('sketch-phone').value = sk.phone;
    document.getElementById('sketch-invoice').value = sk.invoiceNo;
        phone: phone,
    document.getElementById('sketch-grid-toggle').checked = showSketchGrid;
    document.getElementById('sketch-bw-toggle').checked = isSketchBW;
    document.getElementById('sketch-image-opacity').value = sketchBgImageOpacity;
// MISSING LINE 4095
    if (sketchBgImageSrcData) {
        sketchBgImage = new Image();
        sketchBgImage.onload = function() {
            document.getElementById('sketch-opacity-container').classList.remove('hidden');
            document.getElementById('sketch-remove-image-btn').classList.remove('hidden');
            drawSketch();
        };
    document.getElementById('print-sketch-owner').textContent = owne
    } else {
        document.getElementById('sk
// MISSING LINE 4106
// MISSING LINE 4107
// MISSING LINE 4108
// MISSING LINE 4109
// MISSING LINE 4110
// MISSING LINE 4111
// MISSING LINE 4112
// MISSING LINE 4113
    document.getElementById('sketches-list-container').classList.add('hidden');
    document.getElementById('sketch-editor-container').classList.remove('hidden');
// MISSING LINE 4116
    drawSketch();
}
// MISSING LINE 4119
function saveSketchDesign() {
    const ownerName = document.getElementById('sketch-owner').value.trim();
    const phone = document.getElementById('sketch-phone').value.trim();
    const invoiceNo = document.getElementById('sketch-invoice').value.trim();
// MISSING LINE 4124
    if (!ownerName || !phone || !invoiceNo) {
        showAlert('ÙŠØ±Ø¬Ù‰ Ù…Ù„Ø¡ Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø­Ù‚ÙˆÙ„ Ø§Ù„Ø¥Ù„Ø²Ø§Ù…ÙŠØ© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© (*)', 'error');
    return new Promise((resolve) => {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 800;
    const id = currentSketchId || Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    const date = currentSketchId ? (sketches.find(s => s.id === currentSketchId).date) : new Date().toISOString().split('T')[0];
        
        const render = () => {
            // رسم شبكة ال
        ownerName: ownerName,
        phone: phone,
        invoiceNo: invoiceNo,
        date: date,
        elements: sketchElements,
        bgImage: sketchBgImageSrcData,
        bgOpacity: sketchBgImageOpacity,
        showGrid: showSketchGrid,
        isBW: isSketchBW,
        color: currentSketchColor
    };
// MISSING LINE 4146
    operationInProgress = true;
function generateSketchImageDataAsync(elements, bgImageSrc, bgOpacity, showGrid, isBW) {
    return new Promise((resolve) => {
        const tempCanvas = document.createElement('canvas');
// MISSING LINE 4151
// MISSING LINE 4152
// MISSING LINE 4153
// MISSING LINE 4154
// MISSING LINE 4155
// MISSING LINE 4156
// MISSING LINE 4157
// MISSING LINE 4158
// MISSING LINE 4159
// MISSING LINE 4160
// MISSING LINE 4161
// MISSING LINE 4162
// MISSING LINE 4163
// MISSING LINE 4164
    document.getElementById('p
// MISSING LINE 4166
// MISSING LINE 4167
// MISSING LINE 4168
// MISSING LINE 4169
window.initSketchCanvas = initSketchCanvas;
// MISSING LINE 4171
// MISSING LINE 4172
// MISSING LINE 4173
// MISSING LINE 4174
// MISSING LINE 4175
// MISSING LINE 4176
                    else if (el.type === 'round-corner') drawRoundCorner(tempCtx, el.w, el.h, el.color, isBW);
                    else if (el.type === 'table') drawTable(tempCtx, el.w, el.h, el.color, isBW);
                    else if (el.type === 'text') drawText(tempCtx, el.label, el.color, isBW);
                    // NEW GEOMETRIC SHAPES
                    else if (el.type === 'square') drawRectangle(tempCtx, el.w, el.h, el.color, isBW, el.label, 0);
                    else if (el.type === 'rectangle') drawRectangle(tempCtx, el.w, el.h, el.color, isBW, el.label, 0);
                    else if (el.type === 'circle') drawEllipse(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'ellipse') drawEllipse(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'triangle') drawTriangle(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'hexagon') drawHexagon(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'star') drawStar(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'arrow-right') drawArrowRight(tempCtx, el.w, el.h, el.color, isBW, el.label);
                }
                tempCtx.restore();
            });
            
            resolve(tempCanvas.toDataURL('image/png'));
        };
// MISSING LINE 4195
        if (bgImageSrc) {
            const img = new Image();
            img.onload = () => {
    document.getElementById('sketches-list-container
                    else if (el.type === 'table') drawTable(tempCtx, el.w, el.h, el.color, isBW);
                    else if (el.type === 'text') drawText(tempCtx, el.label, el.color, isBW);
                    // NEW GEOMETRIC SHAPES
                    else if (el.type === 'square') drawRectangle(tempCtx, el.w, el.h, el.color, isBW, el.label, 0);
                    else if (el.type === 'rectangle') drawRectangle(tempCtx, el.w, el.h, el.color, isBW, el.label, 0);
                    else if (el.type === 'rounded-rect') drawRectangle(tempCtx, el.w, el.h, el.color, isBW, el.label, 8);
                    else if (el.type === 'top-rounded-rect') drawRectangle(tempCtx, el.w, el.h, el.color, isBW, el.label, { tl: 10, tr: 10, br: 0, bl: 0 });
                    else if (el.type === 'circle') drawEllipse(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'ellipse') drawEllipse(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'triangle') drawTriangle(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'hexagon') drawHexagon(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'star') drawStar(tempCtx, el.w, el.h, el.color, isBW, el.label);
                    else if (el.type === 'arrow-right') drawArrowRight(tempCtx, el.w, el.h, el.color, isBW, el.label);
                }
                tempCtx.restore();
            });
            
            resolve(tempCanvas.toDataURL('image/png'));
        };
// MISSING LINE 4219
        if (bgImageSrc) {
            const img = new Image();
            img.onload = () => {
                tempCtx.globalAlpha = bgOpacity;
                if (isBW) tempCtx.filter = 'grayscale(100%)';
                tempCtx.drawImage(img, 0, 0, 800, 600);
                tempCtx.globalAlpha = 1.0;
                tempCtx.filter = 'none';
                render();
            };
            img.onerror = () => {
                render();
            };
            img.src = bgImageSrc;
        } else {
            render();
        }
    });
// MISSING LINE 4238
// MISSING LINE 4239
// MISSING LINE 4240
// MISSING LINE 4241
// MISSING LINE 4242
// MISSING LINE 4243
// MISSING LINE 4244
// MISSING LINE 4245
// MISSING LINE 4246
// MISSING LINE 4247
// MISSING LINE 4248
// MISSING LINE 4249
// MISSING LINE 4250
// MISSING LINE 4251
// MISSING LINE 4252
// MISSING LINE 4253
// MISSING LINE 4254
// MISSING LINE 4255
// MISSING LINE 4256
// MISSING LINE 4257
// MISSING LINE 4258
// MISSING LINE 4259
// MISSING LINE 4260
// MISSING LINE 4261
window.initSketchCanvas = initSketchCanvas;
// MISSING LINE 4263
// MISSING LINE 4264
// ====================================================================
// NEW: دوال رسم الأشكال الهندسية الجديدة والتسميات
// ====================================================================
// MISSING LINE 4268
function drawShapeLabel(ctx, label, color, isBW) {
    ctx.save();
    ctx.font = 'bold 14px Cairo, sans-serif';
    ctx.fillStyle = isBW ? '#000000' : color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 0, 0);
    ctx.restore();
}
// MISSING LINE 4278
function drawRectangle(ctx, w, h, color, isBW, label, radius = 0) {
    ctx.strokeStyle = isBW ? '#000000' : color;
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
// MISSING LINE 4282
// MISSING LINE 4283
// MISSING LINE 4284
// MISSING LINE 4285
// MISSING LINE 4286
// MISSING LINE 4287
// MISSING LINE 4288
// MISSING LINE 4289
// MISSING LINE 4290
// MISSING LINE 4291
// MISSING LINE 4292
// MISSING LINE 4293
// MISSING LINE 4294
    }
}
// MISSING LINE 4297
function drawEllipse(ctx, w, h, color, isBW, label) {
    ctx.strokeStyle = isBW ? '#000000' : color;
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
    ctx.lineWidth = 2.5;
    if (label) {
    ctx.beginPath();
    ctx.ellipse(0, 0, Math.abs(w / 2), Math.abs(h / 2), 0, 0, 2 * Math.PI);
        drawShapeLabel(ctx, label, color, isBW);
        ctx.restore();
    }
    if (label) {
        drawShapeLabel(ctx, label, color, isBW);
function drawHexagon(ctx, w, h, color, isBW, label) {
    ctx.strokeStyle = isBW ? '#000000' : color;
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
function drawTriangle(ctx, w, h, color, isBW, label) {
    ctx.strokeStyle = isBW ? '#000000' : color;
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = (w / 2) * Math.cos(angle);
        const y = (h / 2) * Math.sin(angle);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.closePath();
            ctx.lineTo(x, y);
    ctx.stroke();
    }
    ctx.closePath();
        ctx.save();
        ctx.translate(0, h / 6);
        drawShapeLabel(ctx, label, color, isBW);
        ctx.restore();
        drawShapeLabel(ctx, label, color, isBW);
    }
}
function drawHexagon(ctx, w, h, color, isBW, label) {
function drawStar(ctx, w, h, color, isBW, label) {
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = (w / 2) * Math.cos(angle);
        const y = (h / 2) * Math.sin(angle);
    const innerRadius = outerRadius * 0.4;
            ctx.moveTo(x, y);
    let rot = Math.PI / 2 * 3;
            ctx.lineTo(x, y);
    let y = cy;
    const step = Math.PI / spikes;
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
// MISSING LINE 4358
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
// MISSING LINE 4368
    if (label) {
        drawShapeLabel(ctx, label, color, isBW);
    }
}
// MISSING LINE 4373
function drawArrowRight(ctx, w, h, color, isBW, label) {
    ctx.strokeStyle = isBW ? '#000000' : color;
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
    ctx.lineWidth = 2.5;
// MISSING LINE 4378
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 4);
    ctx.lineTo(0, -h / 4);
    ctx.lineTo(0, -h / 2);
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(0, h / 4);
    ctx.lineTo(-w / 2, h / 4);
    ctx.closePath();
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
        ctx.save();
        ctx.translate(-w / 10, 0);
        drawShapeLabel(ctx, label, color, isBW);
        ctx.restore();
    }
}
function drawArrowRight(ctx, w, h, color, isBW, label) {
    ctx.strokeStyle = isBW ? '#000000' : color;
    ctx.fillStyle = isBW ? 'rgba(255,255,255,0.85)' : hexToRgba(color, 0.15);
    ctx.lineWidth = 2.5;
// MISSING LINE 4402
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 4);
    ctx.lineTo(0, -h / 4);
    ctx.lineTo(0, -h / 2);
    ctx.lineTo(w / 2, 0);
    ctx.lineTo(0, h / 2);
    ctx.lineTo(0, h / 4);
    ctx.lineTo(-w / 2, h / 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
// MISSING LINE 4414
    if (label) {
        ctx.save();
        ctx.translate(-w / 10, 0);
        drawShapeLabel(ctx, label, color, isBW);
        ctx.restore();
    }
}
// MISSING LINE 4422
// MISSING LINE 4423
// MISSING LINE 4424
// MISSING LINE 4425
// MISSING LINE 4426
// MISSING LINE 4427
// MISSING LINE 4428
// MISSING LINE 4429
// MISSING LINE 4430
// MISSING LINE 4431
// MISSING LINE 4432
// MISSING LINE 4433
// MISSING LINE 4434
// MISSING LINE 4435
// MISSING LINE 4436
// MISSING LINE 4437
// MISSING LINE 4438
// MISSING LINE 4439
// MISSING LINE 4440
// MISSING LINE 4441
// MISSING LINE 4442
// MISSING LINE 4443
// MISSING LINE 4444
// MISSING LINE 4445
// MISSING LINE 4446
// MISSING LINE 4447
// MISSING LINE 4448
// MISSING LINE 4449
// MISSING LINE 4450
// MISSING LINE 4451
// MISSING LINE 4452
// MISSING LINE 4453
// MISSING LINE 4454
// MISSING LINE 4455
// MISSING LINE 4456
// MISSING LINE 4457
// MISSING LINE 4458
// MISSING LINE 4459
// MISSING LINE 4460
// MISSING LINE 4461
// MISSING LINE 4462
// MISSING LINE 4463
// MISSING LINE 4464
// MISSING LINE 4465
// MISSING LINE 4466
// MISSING LINE 4467
// MISSING LINE 4468
// MISSING LINE 4469
// MISSING LINE 4470
// MISSING LINE 4471
// MISSING LINE 4472
// MISSING LINE 4473
// MISSING LINE 4474
// MISSING LINE 4475
// MISSING LINE 4476
// MISSING LINE 4477
// MISSING LINE 4478
// MISSING LINE 4479
// MISSING LINE 4480
// MISSING LINE 4481
// MISSING LINE 4482
// MISSING LINE 4483
// MISSING LINE 4484
// MISSING LINE 4485
// MISSING LINE 4486
// MISSING LINE 4487
// MISSING LINE 4488
// MISSING LINE 4489
// MISSING LINE 4490
// MISSING LINE 4491
// MISSING LINE 4492
// MISSING LINE 4493
// MISSING LINE 4494
// MISSING LINE 4495
// MISSING LINE 4496
// MISSING LINE 4497
// MISSING LINE 4498
// MISSING LINE 4499
// MISSING LINE 4500