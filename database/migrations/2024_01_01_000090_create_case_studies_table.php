<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('client_name');
            $table->string('industry');
            $table->text('summary');
            $table->text('challenge');
            $table->text('solution');
            $table->text('results');
            $table->string('cover_image')->nullable();
            $table->foreignId('related_service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('case_studies');
    }
};
