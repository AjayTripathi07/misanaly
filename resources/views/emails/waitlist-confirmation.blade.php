@component('mail::message')
# You're on the List, {{ $entry->name }}! 🎉

Welcome to the **Bank2Books Early Access Programme** — you're officially among the first to know when we launch!

@component('mail::panel')
**Your Early Access Benefit:**
As one of our first signups, you'll receive **3 months FREE** subscription when Bank2Books launches — no credit card required at signup.
@endcomponent

**What is Bank2Books?**

Bank2Books converts bank statements (PDF, Excel, CSV) from SBI, HDFC, Punjab National Bank, ICICI, Axis, and 20+ other Indian banks directly into Tally-ready accounting entries — using AI, fully offline.

No more manual data entry. No cloud upload. Just seconds.

**What happens next?**

1. We're putting final touches on the product
2. The moment we launch, you'll get an email with your exclusive 3-month free access code
3. Install, import your first bank statement, and see it work in under 2 minutes

If you have any questions or want to tell us about your use case, just reply to this email — we'd love to hear from you.

@component('mail::button', ['url' => config('app.url') . '/products/bank2books', 'color' => 'blue'])
Learn More About Bank2Books
@endcomponent

Stay tuned — big things are coming!

Warm regards,
**Team MSI Analytics**

---
*You registered with email: {{ $entry->email }}. To unsubscribe, reply with "remove me" in the subject line.*
@endcomponent
