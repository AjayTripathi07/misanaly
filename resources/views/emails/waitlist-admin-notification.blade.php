@component('mail::message')
# New Bank2Books Waitlist Signup

A new user has registered for Bank2Books Early Access.

@component('mail::table')
| Field | Details |
|:------|:--------|
| **Name** | {{ $entry->name }} |
| **Email** | {{ $entry->email }} |
| **Phone** | {{ $entry->phone }} |
| **Company** | {{ $entry->company ?: '—' }} |
| **Source** | {{ $entry->source ?: 'direct' }} |
| **Registered** | {{ $entry->created_at->format('d M Y, h:i A') }} |
@endcomponent

@if($entry->remark)
**Their message:**
> {{ $entry->remark }}
@endif

@component('mail::button', ['url' => config('app.url') . '/admin/waitlist', 'color' => 'blue'])
View Waitlist in Admin
@endcomponent

@endcomponent
