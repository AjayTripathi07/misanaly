@component('mail::message')
# Thank You, {{ $lead->name }}! 👋

We've received your enquiry and will get back to you within **24 hours**.

@if($lead->service)
We noted your interest in our **{{ $lead->service->name }}** service and will have a relevant team member reach out to discuss your requirements.
@elseif($lead->product)
We noted your interest in **{{ $lead->product->name }}** and will have someone walk you through the product in detail.
@else
Our team has reviewed your message and will be in touch shortly with the information you need.
@endif

**What happens next?**

@component('mail::panel')
1. Our team reviews your enquiry (usually within a few hours)
2. A specialist reaches out via email or phone
3. We schedule a call or demo at your convenience
@endcomponent

In the meantime, you can explore our services and products at [misanaly.in]({{ config('app.url') }}).

If you have any urgent questions, feel free to reply to this email or reach us at **info@misanaly.in**.

@component('mail::button', ['url' => config('app.url'), 'color' => 'blue'])
Visit MSI Analytics
@endcomponent

Warm regards,
**MSI Analytics Team**

---

*You received this email because you submitted an enquiry on misanaly.in. If this wasn't you, please ignore this email.*
@endcomponent
