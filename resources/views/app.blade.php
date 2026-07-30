<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        @php
            $gtmId = \App\Models\SiteSetting::get('gtm_container_id');
        @endphp

        {{-- Google Tag Manager (must stay as high in <head> as possible, per Google's own placement guidance) --}}
        @if($gtmId)
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','{{ $gtmId }}');</script>
        @endif
        {{-- End Google Tag Manager --}}

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="shortcut icon" href="/favicon.ico">
        <meta name="theme-color" content="#2563EB">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead

        @php
            $gaId = \App\Models\SiteSetting::get('google_analytics_id');
            $pixelId = \App\Models\SiteSetting::get('meta_pixel_id');
        @endphp

        @if($gaId)
            <script async src="https://www.googletagmanager.com/gtag/js?id={{ $gaId }}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '{{ $gaId }}');
            </script>
        @endif

        @if($pixelId)
            <script>
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '{{ $pixelId }}');
                fbq('track', 'PageView');
            </script>
        @endif
    </head>
    <body class="font-sans antialiased">
        {{-- Google Tag Manager (noscript) --}}
        @if($gtmId)
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $gtmId }}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        @endif
        {{-- End Google Tag Manager (noscript) --}}

        @inertia
    </body>
</html>
