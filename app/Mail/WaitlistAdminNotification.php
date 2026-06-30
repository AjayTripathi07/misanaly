<?php

namespace App\Mail;

use App\Models\ProductWaitlist;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WaitlistAdminNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly ProductWaitlist $entry)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New Waitlist Signup: {$this->entry->name} — Bank2Books",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.waitlist-admin-notification',
            with: ['entry' => $this->entry],
        );
    }
}
