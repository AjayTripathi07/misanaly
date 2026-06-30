<?php

namespace App\Mail;

use App\Models\ProductWaitlist;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WaitlistConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly ProductWaitlist $entry)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "You're on the Bank2Books Early Access List! 🎉",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.waitlist-confirmation',
            with: ['entry' => $this->entry->load('product')],
        );
    }
}
