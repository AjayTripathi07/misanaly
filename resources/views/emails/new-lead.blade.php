@component('mail::message')
# New Lead Received! 🎉

A new enquiry has been submitted on the MSI Analytics website.

---

**Lead Type:** {{ ucfirst($lead->lead_type) }}

@component('mail::table')
| Field | Details |
|:------|:--------|
| **Name** | {{ $lead->name }} |
| **Email** | {{ $lead->email }} |
| **Phone** | {{ $lead->phone ?? '—' }} |
| **Company** | {{ $lead->company ?? '—' }} |
@if($lead->service)
| **Service Interest** | {{ $lead->service->name }} |
@endif
@if($lead->product)
| **Product Interest** | {{ $lead->product->name }} |
@endif
@if($lead->budget_range)
| **Budget Range** | {{ $lead->budget_range }} |
@endif
@if($lead->timeline)
| **Timeline** | {{ $lead->timeline }} |
@endif
| **Source** | {{ $lead->source ?? 'Direct' }} |
| **Received** | {{ $lead->created_at->format('d M Y, h:i A') }} |
@endcomponent

**Message:**

{{ $lead->message }}

@component('mail::button', ['url' => config('app.url') . '/admin/leads/' . $lead->id, 'color' => 'blue'])
View in Admin Panel
@endcomponent

---

*This is an automated notification from the MSI Analytics website.*
@endcomponent
