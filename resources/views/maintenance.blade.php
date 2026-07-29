<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>We'll be back soon — {{ config('app.name', 'NobelIQ Technologies') }}</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0F172A;
                color: #fff;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                text-align: center;
                padding: 24px;
            }
            .card { max-width: 480px; }
            .icon {
                width: 64px; height: 64px; margin: 0 auto 24px;
                border-radius: 16px;
                background: linear-gradient(135deg, #2563EB, #6D28D9);
                display: flex; align-items: center; justify-content: center;
            }
            h1 { font-size: 28px; font-weight: 800; margin-bottom: 12px; }
            p { color: #94A3B8; font-size: 15px; line-height: 1.6; }
        </style>
    </head>
    <body>
        <div class="card">
            <div class="icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
            </div>
            <h1>We'll be back soon</h1>
            <p>We're currently performing scheduled maintenance. Thanks for your patience — please check back shortly.</p>
        </div>
    </body>
</html>
