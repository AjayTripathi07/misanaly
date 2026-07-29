<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function get(string $key, mixed $default = null): mixed
    {
        return static::where('key', $key)->value('value') ?? $default;
    }

    public static function set(string $key, mixed $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value]);
    }

    /**
     * Homepage/product-page stats bar, editable from Admin Settings.
     *
     * @return array<int, array{number: string, label: string}>
     */
    public static function homepageStats(): array
    {
        $defaults = [
            1 => ['number' => '10+', 'label' => 'CA Firms'],
            2 => ['number' => '100+', 'label' => 'Bank Formats'],
            3 => ['number' => '98.7%', 'label' => 'Accuracy Rate'],
            4 => ['number' => '3 hrs', 'label' => 'Saved Daily'],
        ];

        $keys = [];
        foreach (array_keys($defaults) as $i) {
            $keys[] = "stat_{$i}_number";
            $keys[] = "stat_{$i}_label";
        }

        $values = static::whereIn('key', $keys)->pluck('value', 'key');

        return collect($defaults)->map(fn ($d, $i) => [
            'number' => $values["stat_{$i}_number"] ?? $d['number'],
            'label'  => $values["stat_{$i}_label"] ?? $d['label'],
        ])->values()->all();
    }
}
