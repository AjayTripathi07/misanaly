<?php
namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        $members = [
            [
                'name'         => 'Rajesh Sharma',
                'role'         => 'Founder & CEO',
                'bio'          => 'Rajesh brings over 15 years of experience in enterprise software development and IT consulting. He founded MSI Analytics with a vision to make cutting-edge technology accessible to businesses of all sizes across India.',
                'photo'        => null,
                'linkedin_url' => null,
                'sort_order'   => 1,
            ],
            [
                'name'         => 'Priya Mehta',
                'role'         => 'Head of Engineering',
                'bio'          => 'Priya leads our engineering team with a focus on scalable architecture and code quality. With a background in full-stack development and cloud infrastructure, she ensures every product we ship meets the highest technical standards.',
                'photo'        => null,
                'linkedin_url' => null,
                'sort_order'   => 2,
            ],
            [
                'name'         => 'Amit Verma',
                'role'         => 'Lead UI/UX Designer',
                'bio'          => 'Amit is passionate about creating digital experiences that are both beautiful and functional. His human-centred design approach has helped clients achieve significant improvements in user engagement and conversion rates.',
                'photo'        => null,
                'linkedin_url' => null,
                'sort_order'   => 3,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(['name' => $member['name']], $member);
        }
    }
}
