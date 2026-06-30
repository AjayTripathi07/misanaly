<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewLeadNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Lead $lead)
    {
    }

    public function envelope(): Envelope
    {
        $type = ucfirst($this->lead->lead_type);
        return new Envelope(
            subject: "New Lead: {$type} — {$this->lead->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.new-lead',
            with: ['lead' => $this->lead->load(['service', 'product'])],
        );
    }
}
