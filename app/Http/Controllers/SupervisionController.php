<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class SupervisionController extends Controller
{
    public function index()
    {
        Gate::authorize('do-supervision');

        $teachers = Teacher::with(['supervision'])->get();
        $teachersArray = $teachers->toArray();

        // dd($teachersArray);

        return Inertia::render('Supervision/ListSupervision', [
            'teachers' => $teachersArray,
            'performanceItems' => config('performance_items'),
        ]);
    }

    public function start(Teacher $teacher)
    {
        Gate::authorize('do-supervision');

        return Inertia::render('Supervision/StartSupervision', [
            'teacher' => $teacher->toArray(),
            'performanceItem' => config('performance_items.15'),
            'performanceItemNumber' => 15,
        ]);
    }

    public function save(Request $request, Teacher $teacher)
    {
        Gate::authorize('do-supervision');

        $evaluations = $request->all();
        $evaluationsArray = [];
        foreach ($evaluations as $key => $evaluation) {
            $keySplit = explode('_', $key);
            $performanceItemNumber = $keySplit[0];
            $indicatorNumber = $keySplit[1];
            $indicatorItemNumber = $keySplit[2];

            if (!isset($evaluationsArray[$performanceItemNumber])) {
                $evaluationsArray[$performanceItemNumber] = [];
            }

            if (!isset($evaluationsArray[$performanceItemNumber][$indicatorNumber])) {
                $evaluationsArray[$performanceItemNumber][$indicatorNumber] = [];
            }

            $evaluationsArray[$performanceItemNumber][$indicatorNumber][$indicatorItemNumber] = $evaluation;
        }

        if ($teacher->supervision) {
            $teacher->supervision->delete();
        }

        $teacher->supervision()->updateOrCreate([
            'item_number' => 15,
            'checked_indicators' => json_encode($evaluationsArray),
            'supervised_at' => now('Asia/Jakarta'),
        ]);

        $request->session()->flash('success', 'Berhasil menyimpan hasil supervisi.');

        return to_route('supervision.index');
    }

    public function check(Teacher $teacher)
    {
        Gate::authorize('view-supervision');

        return Inertia::render('Supervision/CheckSupervision', [
            'teacher' => $teacher->loadMissing(['supervision'])->toArray(),
            'performanceItem' => config('performance_items.15'),
            'performanceItemNumber' => 15,
        ]);
    }

    public function selfCheck()
    {
        $user = Auth::user();
        $teacher = Teacher::where('email', $user->email)->firstOrFail();
        Gate::authorize('view-supervision');

        return Inertia::render('Supervision/CheckSupervision', [
            'teacher' => $teacher->loadMissing(['supervision'])->toArray(),
            'performanceItem' => config('performance_items.15'),
            'performanceItemNumber' => 15,
        ]);
    }
}
