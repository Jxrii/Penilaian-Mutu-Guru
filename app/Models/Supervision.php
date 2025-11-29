<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Supervision extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'supervisions';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'item_number',
        'checked_indicators',
        'supervised_at'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'simple_result',
    ];

    public function teacher(): HasOne
    {
        return $this->hasOne(Teacher::class);
    }

    public function simpleResult(): Attribute
    {
        return Attribute::make(
            get: function ($value, array $attributes) {
                $performanceItems = config('performance_items');
                $performanceItem = $performanceItems[$attributes['item_number']];
                $levelsRequirement = $performanceItem['levels'];

                $indicatorsMet = [];
                $checkedIndicators = json_decode($attributes['checked_indicators'], associative: true)[15];
                foreach ($checkedIndicators as $key => $indicator) {
                    if (in_array(true, $indicator)) {
                        $indicatorsMet[] = intval($key);
                    }
                }

                $highestPoint = 0;
                $levelWithHighestMpoint = 0;
                foreach ($levelsRequirement as $level => $requirement) {
                    $requirementNotMet = collect($requirement)->diff($indicatorsMet);
                    $point = count($requirement) - $requirementNotMet->count();

                    if ($point > $highestPoint) {
                        $levelWithHighestMpoint = $level;
                        $highestPoint = $point;
                    }
                }

                return [
                    'level' => $levelWithHighestMpoint,
                    'indicatorsMet' => $indicatorsMet,
                ];
            }
        );
    }
}
