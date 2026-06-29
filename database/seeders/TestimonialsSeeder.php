<?php
namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialsSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name'       => 'CA Suresh Gupta',
                'company'    => 'Gupta & Associates',
                'role'       => 'Managing Partner',
                'quote'      => 'Tally Automation has completely transformed how our firm handles data entry. What used to take our team 3 hours every evening now gets done in 15 minutes. The accuracy of the auto-tagging rules is remarkable—we rarely need to make corrections.',
                'photo'      => null,
                'rating'     => 5,
                'service_id' => null,
                'product_id' => 1,
            ],
            [
                'name'       => 'Neha Joshi',
                'company'    => 'RetailPro India',
                'role'       => 'CTO',
                'quote'      => 'MSI Analytics built our entire e-commerce platform from scratch. The team was professional, communicative, and delivered ahead of schedule. The website performance far exceeds what we had before—page load times dropped by 60%.',
                'photo'      => null,
                'rating'     => 5,
                'service_id' => 1,
                'product_id' => null,
            ],
            [
                'name'       => 'Vikram Singh',
                'company'    => 'LogiTrack Solutions',
                'role'       => 'Operations Director',
                'quote'      => 'The custom ERP system MSI Analytics developed for our logistics operations has streamlined everything from order management to driver tracking. ROI was achieved within 6 months of deployment.',
                'photo'      => null,
                'rating'     => 5,
                'service_id' => 3,
                'product_id' => null,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name'], 'company' => $testimonial['company']],
                $testimonial,
            );
        }
    }
}
