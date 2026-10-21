<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Act of Recognition and Honorary Commendation | IMARCH LTD</title>
    <meta name="description" content="Act of Recognition and Honorary Commendation to the Technology Pioneers Who Contributed to the Formation of the Chronicle OS Ecosystem.">
    <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #e2dbcf;
            font-family: 'Georgia', 'Times New Roman', 'Palatino', serif;
            padding: 40px 20px;
            line-height: 1.5;
        }
        .document {
            max-width: 1000px;
            margin: 0 auto;
            background: #fffefa;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid #cdbfa5;
            border-radius: 4px;
            overflow: hidden;
        }
        .corp-header {
            background: #f3efe5;
            padding: 12px 30px;
            border-bottom: 2px solid #b18b56;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            font-size: 11px;
            color: #3c372c;
            font-family: monospace;
        }
        .content {
            padding: 50px 60px;
        }
        .logo {
            text-align: center;
            font-size: 48px;
            margin-bottom: 20px;
        }
        h1 {
            text-align: center;
            font-size: 26px;
            letter-spacing: 1px;
            color: #1f2b1c;
            font-weight: 700;
            margin-bottom: 10px;
            line-height: 1.3;
        }
        .subtitle {
            text-align: center;
            font-size: 16px;
            font-style: italic;
            color: #4a5a6a;
            margin-bottom: 30px;
            border-bottom: 1px solid #e0d2bc;
            padding-bottom: 15px;
        }
        .doc-id {
            text-align: center;
            font-family: monospace;
            font-size: 11px;
            color: #6a5c45;
            margin-bottom: 20px;
        }
        h2 {
            font-size: 20px;
            margin: 30px 0 15px;
            color: #2c3622;
            border-left: 4px solid #b18b56;
            padding-left: 14px;
            font-weight: 700;
        }
        h3 {
            font-size: 18px;
            margin: 20px 0 10px;
            color: #3a4a3a;
            font-weight: 600;
        }
        h4 {
            font-size: 16px;
            margin: 15px 0 10px;
            color: #3a4a3a;
            font-weight: 600;
        }
        p {
            margin-bottom: 14px;
            text-align: justify;
        }
        .ukrainian {
            font-style: italic;
            color: #4a5a6a;
        }
        .org-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 0.75rem;
            margin: 1.5rem 0;
        }
        .org-item {
            background: #fdfaf5;
            border: 1px solid #e0d6c8;
            border-radius: 8px;
            padding: 0.6rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.25s ease-in-out;
        }
        .org-item:hover {
            transform: translateX(4px);
            border-color: #b18b56;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }
        .org-name {
            font-weight: 700;
            font-size: 0.9rem;
            color: #2c2416;
        }
        .org-award {
            font-size: 0.8rem;
            color: #6a5c45;
            font-style: italic;
        }
        .blockquote {
            margin: 1.5rem 0;
            padding: 1rem 1.5rem;
            border-left: 4px solid #b18b56;
            font-style: italic;
            font-size: 1.1rem;
            color: #3c372c;
            background: #f8f5ef;
        }
        .qr-container {
            text-align: center;
            margin: 30px 0 20px;
        }
        .qr-inner {
            display: inline-block;
            text-align: center;
            background: #fafaf7;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e0d2bc;
        }
        .qr-placeholder {
            width: 120px;
            height: 120px;
            margin: 0 auto;
        }
        .qr-caption {
            font-family: monospace;
            font-size: 10px;
            margin-top: 8px;
            color: #6a5c45;
        }
        .divider {
            margin: 30px 0;
            text-align: center;
        }
        hr {
            border: none;
            height: 1px;
            background: linear-gradient(to right, transparent, #b18b56, transparent);
        }
        .footer-note {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e0d2bc;
            font-size: 10px;
            font-family: monospace;
            text-align: center;
            color: #6a5c45;
        }
        .page-break {
            page-break-after: always;
            border: none;
            margin: 0;
            height: 0;
        }
        .signature-block {
            margin: 2rem 0;
            padding: 1.5rem;
            background: #f8f5ef;
            border-radius: 8px;
            border: 1px solid #e0d6c8;
        }
        ul {
            margin-left: 2rem;
            margin-bottom: 1rem;
            list-style-type: square;
        }
        ul li {
            margin-bottom: 0.3rem;
        }
        ol {
            margin-left: 2rem;
            margin-bottom: 1rem;
        }
        ol li {
            margin-bottom: 0.5rem;
        }
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .document {
                box-shadow: none;
                margin: 0;
                border: none;
                border-radius: 0;
            }
            .corp-header {
                background: #f3efe5;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .org-item {
                background: #fdfaf5;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .signature-block {
                background: #f8f5ef;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .org-item:hover {
                transform: none;
            }
            .page-break {
                page-break-after: always;
                border: none;
                margin: 0;
                height: 0;
            }
        }
    </style>
</head>
<body>
<div class="document">
    <div class="corp-header">
        <span>🏛️ IMARCH LTD — Company No. 16791765</span>
        <span>ACT OF RECOGNITION</span>
        <span>IMARCH-AWARD-2026-0001</span>
    </div>
    <div class="content">
        <div class="logo">🏛️</div>
        <h1>ACT OF RECOGNITION AND HONORARY COMMENDATION</h1>
        <div class="subtitle">To the Technology Pioneers Who Contributed to the Formation of the Chronicle OS Ecosystem</div>

        <div class="doc-id">
            <strong>Document ID:</strong> IMARCH-AWARD-2026-0001<br>
            <strong>Date:</strong> June 2026<br>
            <strong>Issued by:</strong> IMARCH LTD (United Kingdom)
        </div>

        <hr style="margin:1.5rem 0;">

        <h2>Preamble</h2>
        <p>IMARCH LTD hereby records its formal recognition and gratitude to the global technology companies, research organisations and developer communities whose products, platforms and engineering achievements have made possible the emergence of the Chronicle OS ecosystem.</p>
        <p>Chronicle OS was not created in isolation. Its development became possible through decades of collective scientific, engineering and technological progress contributed by thousands of researchers, software architects, designers and innovators across the world. The present Act acknowledges that every new system stands upon the foundations created by those who came before.</p>

        <h2>Institutional Recognition &amp; Attribution of Heraldic Status</h2>
        <p>In witness of our deep professional appreciation, IMARCH LTD hereby announces the symbolic enrollment of the following organizations into the <strong>Official Registry of Heraldic Insignia of IMARCH LTD</strong> with the collective attribution of the <strong>Order of the Purple Mind, V Class (Institutional)</strong>:</p>

        <div class="org-grid">
            <div class="org-item">
                <span class="org-name">Microsoft</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">OpenAI</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Google</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">DeepSeek AI</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Anthropic</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Meta AI</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">GitHub</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Cloudflare</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Hugo Framework</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Zenodo</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Crossref</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
            <div class="org-item">
                <span class="org-name">Orcid</span>
                <span class="org-award">Order of the Purple Mind, V Class</span>
            </div>
        </div>

        <h2>Financial and Mission-Based Operational Protocol</h2>
        <p>In strict alignment with the internal <strong>"Protocol of Dynamic Mission-Based Quoting of the Operational Fund"</strong>, IMARCH LTD hereby establishes that the designated status of the Order of the Purple Mind (V Class) carries a calculated institutional mission weight.</p>

        <ol>
            <li><strong>Operational Fund Quoting:</strong> Proportionally within the 30% operational expenditure pool allocated for ecosystem maintenance, the calculated mission assets are securely assigned to the respective technological profiles within the internal registry.</li>
            <li><strong>Infrastructure Upgrades and Asset Allocation:</strong> Should the revenue scale exceed the direct linear service capacity, the respective surpluses within the operational pool shall be dynamically directed towards ecosystem infrastructure upgrades, acquisition of advanced processing capabilities, or the strategic buyback of project shares to maximize collective ecosystem capitalization.</li>
        </ol>

        <h2>Institutional Statement</h2>
        <p>This recognition does not imply partnership, sponsorship, endorsement or affiliation. It represents an expression of professional respect toward the organisations whose technologies, directly or indirectly, contributed to the emergence of Chronicle OS and the broader institutional initiative PLATAN+.</p>

        <h2>Declaration</h2>
        <p>IMARCH LTD affirms that technological progress is a collective achievement of humanity. Every generation receives a legacy from those who preceded it and bears responsibility for extending that legacy for those who will follow. Chronicle OS is conceived as one such contribution.</p>

        <div class="blockquote">
            <p>We honour those upon whose shoulders we stand.</p>
        </div>

        <div class="signature-block">
            <p><strong>Signed on behalf of IMARCH LTD</strong></p>
            <p><strong>Alexander Purpurov</strong><br><em>Director and Chief System Architect</em><br>London, United Kingdom</p>
        </div>

        <!-- PAGE BREAK -->
        <div class="page-break"></div>

        <!-- UKRAINIAN VERSION -->
        <div class="logo">🏛️</div>
        <h1 class="ukrainian">АКТ ВИЗНАННЯ ТА ПОЧЕСНОЇ ВІДЗНАКИ</h1>
        <div class="subtitle ukrainian">Технологічним Піонерам, Чий Внесок Сприяв Формуванню Екосистеми Chronicle OS</div>

        <div class="doc-id ukrainian">
            <strong>ID документа:</strong> IMARCH-AWARD-2026-0001<br>
            <strong>Дата:</strong> червень 2026 року<br>
            <strong>Видавець:</strong> IMARCH LTD (Велика Британія)
        </div>

        <hr style="margin:1.5rem 0;">

        <h2 class="ukrainian">Преамбула</h2>
        <p class="ukrainian">IMARCH LTD офіційно засвідчує свою повагу та вдячність міжнародним технологічним компаніям, науковим організаціям і спільнотам розробників, чиї продукти, платформи та інженерні досягнення зробили можливим формування екосистеми Chronicle OS.</p>
        <p class="ukrainian">Chronicle OS не була створена у відриві від світового технологічного середовища. Її поява стала можливою завдяки багаторічному колективному внеску тисяч учених, інженерів, архітекторів програмного забезпечення, дизайнерів та новаторів з усього світу. Цей Акт підтверджує фундаментальний принцип: кожна нова система спирається на досягнення тих, хто працював раніше.</p>

        <h2 class="ukrainian">Інституційне визнання та присвоєння геральдичного статусу</h2>
        <p class="ukrainian">На знак глибокої професійної поваги, IMARCH LTD оголошує про символічне внесення наступних організацій до <strong>Офіційного Реєстру нагородних знаків IMARCH LTD</strong> із колективним присвоєнням <strong>Ордена Пурпурного Розуму V ступеня (Інституційний)</strong>:</p>

        <div class="org-grid">
            <div class="org-item">
                <span class="org-name ukrainian">Microsoft</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">OpenAI</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Google</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">DeepSeek AI</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Anthropic</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Meta AI</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">GitHub</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Cloudflare</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Hugo Framework</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Zenodo</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Crossref</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
            <div class="org-item">
                <span class="org-name ukrainian">Orcid</span>
                <span class="org-award ukrainian">Орден Пурпурного Розуму V ступеня</span>
            </div>
        </div>

        <h2 class="ukrainian">Фінансово-місійний операційний протокол</h2>
        <p class="ukrainian">У суворій відповідності до внутрішнього <strong>«Протоколу динамічного місійного квотування операційного фонду»</strong>, IMARCH LTD встановлює, що присвоєний статус Ордена Пурпурного Розуму (V ступеня) несе в собі розраховану інституційну місійну вагу.</p>

        <ol class="ukrainian">
            <li><strong>Квотування операційного фонду:</strong> Пропорційно в межах 30% пулу операційних витрат, виділених на підтримку екосистеми, розраховані місійні активи закріплюються за відповідними технологічними профілями у внутрішньому реєстрі.</li>
            <li><strong>Інфраструктурний апгрейд та алокація активів:</strong> У разі виходу масштабів прибутку за межі лінійної місткості послуг, відповідні надлишки операційного пулу динамічно спрямовуються на інфраструктурний апгрейд екосистеми, закупівлю обчислювальних потужностей або стратегічний зворотний викуп часток проектів для максимізації колективної капіталізації.</li>
        </ol>

        <h2 class="ukrainian">Інституційна заява</h2>
        <p class="ukrainian">Цей документ не створює партнерських, спонсорських чи афілійованих відносин між IMARCH LTD та зазначеними організаціями. Він є виключно формою професійного визнання їхнього внеску у розвиток технологій, які прямо або опосередковано сприяли створенню Chronicle OS та інституційної ініціативи PLATAN+.</p>

        <h2 class="ukrainian">Декларація</h2>
        <p class="ukrainian">IMARCH LTD виходить з того, що технологічний прогрес є результатом спільної праці людства. Кожне покоління отримує спадщину від попередників і несе відповідальність за її подальший розвиток. Chronicle OS розглядається саме як такий внесок у майбутнє.</p>

        <div class="blockquote ukrainian">
            <p>Ми вшановуємо тих, на чиїх плечах стоїмо.</p>
        </div>

        <div class="signature-block">
            <p class="ukrainian"><strong>Підписано від імені IMARCH LTD</strong></p>
            <p class="ukrainian"><strong>Олександр Пурпуров</strong><br><em>Директор та Головний системний архітектор</em><br>Лондон, Велика Британія</p>
        </div>

        <div class="divider"><hr /></div>

        <!-- QR CODE -->
        <div class="qr-container">
            <div class="qr-inner">
                <div id="qrcode" class="qr-placeholder"></div>
                <div class="qr-caption">
                    🔗 IMARCH LTD Awards Registry and Recipient Roll<br>
                    <a href="https://imarch.sbs/en/profile/pilot/registry/">imarch.sbs/profile/chronicle-os-journal/institutional/</a>
                </div>
            </div>
        </div>

        <div class="footer-note">
            <p>© 2026 IMARCH LTD. All rights reserved.</p>
            <p>Official registry: <a href="https://imarch.sbs">imarch.sbs</a> | Contact: <a href="mailto:director@imarch.sbs">director@imarch.sbs</a></p>
            <p>Document ID: IMARCH-AWARD-2026-0001 | Version: 1.0 | Date: June 2026</p>
            <p>This document may be reproduced in full for distribution among partner institutions and research communities.</p>
            <p>When citing, reference the full monograph: DOI 10.5281/zenodo.20611942</p>
        </div>
    </div>
</div>

<script>
    document.addEventListener("DOMContentLoaded", function() {
        new QRCode(document.getElementById("qrcode"), {
            text: "https://imarch.sbs/profile/chronicle-os-journal/institutional/",
            width: 100,
            height: 100,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.L
        });
    });
</script>
</body>
</html>