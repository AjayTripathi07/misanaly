<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('seo_title', 255)->nullable()->after('description');
            $table->string('seo_description', 500)->nullable()->after('seo_title');
            $table->string('seo_keywords', 500)->nullable()->after('seo_description');
        });

        Schema::table('services', function (Blueprint $table) {
            $table->string('seo_title', 255)->nullable()->after('description');
            $table->string('seo_description', 500)->nullable()->after('seo_title');
            $table->string('seo_keywords', 500)->nullable()->after('seo_description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_description', 'seo_keywords']);
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn(['seo_title', 'seo_description', 'seo_keywords']);
        });
    }
};
