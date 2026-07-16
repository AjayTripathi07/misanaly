@component('mail::message')
# You're on the List, {{ $entry->name }}! 🎉

Welcome to the **Statement2Books Early Access Programme** — you're officially among the first to know when we launch!

@component('mail::panel')
**Your Early Access Benefit:**
As one of our first signups, you'll receive a **45-day FREE trial** when Statement2Books launches — no credit card required at signup.
@endcomponent

**What is Statement2Books?**

Statement2Books converts bank statements (PDF, Excel, CSV) from SBI, HDFC, Punjab National Bank, ICICI, Axis, and 20+ other Indian banks directly into Tally-ready accounting entries — using AI, fully offline.

No more manual data entry. No cloud upload. Just seconds.

**What happens next?**

1. We're putting final touches on the product
2. The moment we launch, you'll get an email with your exclusive 45-day free trial access code
3. Install, import your first bank statement, and see it work in under 2 minutes

If you have any questions or want to tell us about your use case, just reply to this email — we'd love to hear from you.

@component('mail::button', ['url' => config('app.url') . '/products/statement2books', 'color' => 'blue'])
Learn More About Statement2Books
@endcomponent

Stay tuned — big things are coming!

Warm regards,
**Team NobelIQ Technologies**

---
*You registered with email: {{ $entry->email }}. To unsubscribe, reply with "remove me" in the subject line.*
@endcomponent
